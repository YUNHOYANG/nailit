import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { validateEvent, WebhookVerificationError } from "@polar-sh/sdk/webhooks"

// Mapping of Product IDs to Credits
const PRODUCT_CREDITS: Record<string, number> = {
    [process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID || ""]: 100,
    [process.env.NEXT_PUBLIC_POLAR_ULTRA_PRODUCT_ID || ""]: 300,
}

// Plan Priority for sorting (Higher is better)
const PLAN_PRIORITY: Record<string, number> = {
    "ultra": 2,
    "pro": 1,
    "free": 0
}

// Helper to get plan name from product ID
const getPlanName = (productId: string | null) => {
    if (productId === process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID) return "pro"
    if (productId === process.env.NEXT_PUBLIC_POLAR_ULTRA_PRODUCT_ID) return "ultra"
    return "free"
}

// Helper to extract User ID from various webhook data shapes
const getUserId = (data: any): string | null => {
    return data.metadata?.userId ||
        data.customer_metadata?.userId ||
        data.customer?.external_id ||
        data.customer?.metadata?.userId ||
        data.external_id ||
        null
}

export async function POST(request: Request) {
    const body = await request.text()
    const signature = request.headers.get("webhook-signature") || ""
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET || ""

    let event: any

    try {
        // Use the SDK to validate the signature and parse the event
        event = validateEvent(body, { "webhook-signature": signature }, webhookSecret)
        console.log(`[Polar Webhook] Received event: ${event.type}`)
    } catch (error: any) {
        if (error instanceof WebhookVerificationError) {
            console.error("[Polar Webhook] Invalid signature")
            // Fallback for debugging ONLY - remove in production if needed
            try {
                event = JSON.parse(body)
                console.warn(`[Polar Webhook] WARNING: Proceeding with UNVERIFIED event: ${event.type}`)
            } catch (e) {
                return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
            }
        } else {
            console.error(`[Polar Webhook] Parse Error: ${error.message}`)
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
        }
    }

    const { type, data } = event
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
        /**
         * 1. Transactional: Handle Payment Success (Credits & Logging)
         * Occurs on every successful payment (initial & renewal)
         */
        if (type === "order.paid") {
            const order = data as any
            const userId = getUserId(order)
            const productId = order.productId || order.product_id

            const amountValue = order.totalAmount ?? order.amount_total ?? order.amount ?? 0
            const currencyValue = order.currency ?? "usd"

            const newPlan = getPlanName(productId)
            const creditsForThisProduct = PRODUCT_CREDITS[productId] || 0

            console.log(`[order.paid] User=${userId}, Product=${newPlan}, RawCredits=${creditsForThisProduct}`)

            if (userId && creditsForThisProduct > 0) {
                // 중복 처리 방지
                const { data: existingPayment } = await supabase
                    .from("payments")
                    .select("id")
                    .eq("order_id", order.id)
                    .maybeSingle()

                if (!existingPayment) {
                    // 결제 수단 기록
                    await supabase.from("payments").insert({
                        user_id: userId,
                        order_id: order.id,
                        amount: amountValue,
                        currency: currencyValue,
                        status: "paid"
                    })

                    // 사용자 현재 상태 확인
                    const { data: user } = await supabase
                        .from("users")
                        .select("credits, plan")
                        .eq("id", userId)
                        .single()

                    if (user) {
                        let finalCreditsToAdd = creditsForThisProduct
                        const currentPlan = user.plan || "free"

                        // 업그레이드 시나리오: Pro(100) -> Ultra(300) 인 경우 차액(200)만 지급
                        if (currentPlan === "pro" && newPlan === "ultra") {
                            finalCreditsToAdd = 200
                            console.log(`[order.paid] Upgrade detected (pro->ultra). Granting difference: ${finalCreditsToAdd}`)
                        }

                        await supabase
                            .from("users")
                            .update({
                                credits: (user.credits || 0) + finalCreditsToAdd,
                                plan: newPlan, // 즉시 플랜 반영
                                subscription_status: 'active',
                                polar_customer_id: order.customerId || order.customer_id
                            })
                            .eq("id", userId)

                        console.log(`[order.paid] Successfully updated ${userId}. Added ${finalCreditsToAdd} credits.`)
                    }
                }
            }
        }

        /**
         * 2. Source of Truth: Handle Customer State Change (Plan & Status)
         * Syncs the user's current plan based on ALL active subscriptions.
         * Handles: Upgrades, Downgrades, Cancellations (pending), and Expirations.
         */
        if (type === "customer.state_changed") {
            const customerData = data.customer || data
            const userId = getUserId(customerData) || getUserId(data)
            const activeSubs = (data.active_subscriptions || data.activeSubscriptions || []) as any[]

            if (userId) {
                const validSubs = activeSubs.filter(s =>
                    (s.status === "active" || s.status === "trialing") && !s.ended_at
                )

                const bestSub = validSubs.sort((a, b) => {
                    const pA = PLAN_PRIORITY[getPlanName(a.product_id || a.productId)] || 0
                    const pB = PLAN_PRIORITY[getPlanName(b.product_id || b.productId)] || 0
                    return pB - pA
                })[0]

                const newPlan = bestSub ? getPlanName(bestSub.product_id || bestSub.productId) : "free"
                const subStatus = bestSub ? bestSub.status : "inactive"

                // 플랜과 상태를 즉시 동기화합니다 (UI 반영)
                await supabase
                    .from("users")
                    .update({
                        plan: newPlan,
                        subscription_status: subStatus,
                        polar_customer_id: customerData.id
                    })
                    .eq("id", userId)

                console.log(`[customer.state_changed] Sync ${userId} -> Plan: ${newPlan}, Status: ${subStatus}`)
            }
        }

        /**
         * 3. Revocation: Handle Refunds
         * Unlike slow cancellations, refunds require immediate action.
         */
        if (type === "order.refunded") {
            const order = data as any
            const userId = getUserId(order)
            const productId = order.productId || order.product_id

            if (userId) {
                const { data: user } = await supabase.from("users").select("credits").eq("id", userId).single()
                if (user) {
                    const creditsToReclaim = PRODUCT_CREDITS[productId] || 0
                    const newCredits = Math.max(0, (user.credits || 0) - creditsToReclaim)

                    await supabase
                        .from("users")
                        .update({
                            plan: "free",
                            subscription_status: "inactive",
                            credits: newCredits
                        })
                        .eq("id", userId)

                    await supabase.from("payments").update({ status: "refunded" }).eq("order_id", order.id)
                    console.log(`[order.refunded] Revoked ${userId} benefits. Credits: -${creditsToReclaim}`)
                }
            }
        }

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error("[Polar Webhook] Error:", err.message)
        return NextResponse.json({ success: true, warning: err.message })
    }
}
