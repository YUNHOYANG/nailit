"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

import { CreditCardIcon, LogOutIcon, ZapIcon, CheckCircle2, SettingsIcon } from "lucide-react"
import { PricingModal } from "./pricing-modal"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(({ className, align = "end", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-56 rounded-2xl bg-zinc-900/90 border border-white/10 p-2 text-white shadow-2xl outline-none backdrop-blur-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
                "before:absolute before:-top-2 before:left-0 before:right-0 before:h-2", // Invisible bridge
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export const DashboardNavbar = () => {
    const { user, credits, plan, hasPolarId, signOut } = useAuth()
    const searchParams = useSearchParams()
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)
    const [isPricingOpen, setIsPricingOpen] = React.useState(false)
    const [showSuccess, setShowSuccess] = React.useState(false)

    useEffect(() => {
        if (searchParams.get("checkout_success") === "true") {
            setShowSuccess(true)
            const timer = setTimeout(() => setShowSuccess(false), 5000)
            return () => clearTimeout(timer)
        }
    }, [searchParams])

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
            {/* Success Notification */}
            {showSuccess && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 pointer-events-auto border border-blue-400/50 backdrop-blur-md">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-bold text-sm">Payment successful! Your credits have been updated.</span>
                </div>
            )}
            <div className="max-w-[100vw] mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo: Airborne Button Style */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:bg-zinc-800/80 hover:border-white/20 active:scale-95 pointer-events-auto"
                >
                    <div className="relative w-6 h-6">
                        <Image
                            src="/NailIt_logo.png"
                            alt="NailIt Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-sm font-bold tracking-tighter text-white">
                        Nail-<span className="text-blue-500">It</span>
                    </span>
                </Link>

                {/* Profile: Airborne Button Style */}
                <div
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className="pointer-events-auto"
                >
                    <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                        <PopoverTrigger asChild>
                            <button className="flex items-center gap-2 pr-2 pl-1 py-1 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:bg-zinc-800/80 hover:border-white/20 active:scale-95 group focus:outline-none">
                                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
                                    {user?.user_metadata.avatar_url ? (
                                        <Image
                                            src={user.user_metadata.avatar_url}
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                            {user?.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <svg className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-60">
                            <div className="flex flex-col gap-1">
                                <div className="px-3 py-2 pb-3">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center">Account</p>
                                    <p className="text-sm font-medium text-white truncate text-center mt-1">{user?.email}</p>
                                    <div className="flex flex-col items-center gap-1.5 mt-2 bg-blue-500/10 py-2 px-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-1.5">
                                            <CreditCardIcon className="h-3 w-3 text-blue-400" />
                                            <span className="text-[11px] font-bold text-blue-400">{credits} Credits</span>
                                        </div>
                                        <div className="text-[9px] font-black text-blue-400/70 border border-blue-500/30 px-2 py-0.5 rounded uppercase tracking-tighter">
                                            Plan: {plan}
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-white/10 mb-2" />

                                <button
                                    onClick={() => {
                                        setIsPricingOpen(true)
                                        setIsProfileOpen(false)
                                    }}
                                    className="w-full py-2 bg-white/80 hover:bg-white text-zinc-900 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl mb-1"
                                >
                                    <ZapIcon className="h-4 w-4 fill-current" />
                                    Upgrade
                                </button>

                                {hasPolarId && plan !== "free" && (
                                    <Link
                                        href="/api/polar/portal"
                                        target="_blank"
                                        className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 active:scale-95 border border-white/5 mb-1"
                                    >
                                        <SettingsIcon className="h-4 w-4" />
                                        Manage Subscription
                                    </Link>
                                )}

                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                                >
                                    <LogOutIcon className="h-3.5 w-3.5" />
                                    Sign out
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <PricingModal open={isPricingOpen} onOpenChange={setIsPricingOpen} />
        </nav>
    )
}
