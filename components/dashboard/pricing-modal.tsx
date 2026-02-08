"use client"

import React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon, ZapIcon, CrownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/ui/border-beam"
import { useAuth } from "@/hooks/use-auth"

const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                className
            )}
            {...props}
        >
            <div className="relative bg-[#181818] rounded-[32px] overflow-hidden shadow-2xl p-8 border border-white/5">
                <BorderBeam
                    duration={8}
                    size={400}
                    className="from-transparent via-blue-500 to-transparent"
                />
                {children}
                <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-all">
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
            </div>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-sm text-zinc-500", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

interface PricingModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
    const { plan, hasPolarId } = useAuth()
    const [isLoading, setIsLoading] = React.useState<string | null>(null)

    const handleCheckout = async (targetPlan: string) => {
        // 이미 해당 플랜인 경우 무시
        if (plan === targetPlan) return

        // 이미 유료 구독 중인 경우 (hasPolarId가 true) 업그레이드/다운그레이드는 포탈에서 처리해야 proration이 적용됩니다.
        if (hasPolarId && plan !== "free") {
            window.open("/api/polar/portal", "_blank")
            onOpenChange(false)
            return
        }

        const productId = targetPlan === "pro"
            ? process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID
            : process.env.NEXT_PUBLIC_POLAR_ULTRA_PRODUCT_ID

        if (!productId) {
            alert("Product ID not configured. Please check your environment variables.")
            return
        }

        setIsLoading(productId)
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId }),
            })

            const data = await response.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                throw new Error(data.error || "Failed to create checkout session")
            }
        } catch (error: any) {
            console.error("Checkout error:", error)
            alert(error.message || "Something went wrong. Please try again.")
        } finally {
            setIsLoading(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="flex flex-col gap-8">
                    <div className="space-y-2">
                        <DialogTitle className="text-2xl font-bold text-white tracking-tight">Upgrade Studio</DialogTitle>
                        <DialogDescription className="text-zinc-500 text-sm">Select a plan to boost your thumbnail generation.</DialogDescription>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Pro Plan */}
                        <button
                            disabled={!!isLoading}
                            onClick={() => handleCheckout("pro")}
                            className={cn(
                                "group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/50 border transition-all text-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                                plan === "pro" ? "border-blue-500 bg-blue-500/10 cursor-default" : "border-white/10 hover:border-blue-500/50 hover:bg-zinc-800/80"
                            )}
                        >
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                {isLoading === process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID ? (
                                    <div className="h-5 w-5 border-2 border-blue-400 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <ZapIcon className="h-6 w-6 fill-current" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Pro</h3>
                                <div className="text-2xl font-black text-white">$20</div>
                                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">
                                    {plan === "pro" ? "Current Plan" : "100 Credits"}
                                </div>
                            </div>
                        </button>

                        {/* Ultra Plan */}
                        <button
                            disabled={!!isLoading}
                            onClick={() => handleCheckout("ultra")}
                            className={cn(
                                "group relative flex flex-col items-center justify-center p-6 rounded-2xl bg-zinc-900/50 border transition-all text-center gap-4 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                                plan === "ultra" ? "border-purple-500 bg-purple-500/10 cursor-default" : "border-white/10 hover:border-purple-500/50 hover:bg-zinc-800/80"
                            )}
                        >
                            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                {isLoading === process.env.NEXT_PUBLIC_POLAR_ULTRA_PRODUCT_ID ? (
                                    <div className="h-5 w-5 border-2 border-purple-400 border-t-transparent animate-spin rounded-full" />
                                ) : (
                                    <CrownIcon className="h-6 w-6 fill-current" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tighter text-purple-400">Ultra</h3>
                                <div className="text-2xl font-black text-white">$45</div>
                                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">
                                    {plan === "ultra" ? "Current Plan" : "300 Credits"}
                                </div>
                            </div>
                        </button>
                    </div>
                    {hasPolarId && plan !== "free" && (
                        <p className="text-center text-[10px] text-zinc-500">
                            Changing plans will redirect you to the billing portal to calculate your prorated total.
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
