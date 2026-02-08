import { polar } from "@/lib/polar"
import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { productId } = await request.json()

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const checkout = await polar.checkouts.create({
            products: [productId],
            successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout_success=true`,
            customerEmail: user.email || undefined,
            externalCustomerId: user.id, // Linking to our user ID
            metadata: {
                userId: user.id
            }
        })

        return NextResponse.json({ url: checkout.url })
    } catch (error: any) {
        console.error("Checkout error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
