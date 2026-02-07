"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(({ className, align = "end", sideOffset = 8, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
                "z-50 w-56 rounded-2xl bg-zinc-900/90 border border-white/10 p-2 text-white shadow-2xl outline-none backdrop-blur-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2",
                className
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export const DashboardNavbar = () => {
    const { user, signOut } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
            <div className="max-w-[100vw] mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo: Airborne Button Style */}
                <Link
                    href="/dashboard"
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

                        <PopoverContent>
                            <div className="flex flex-col gap-1">
                                <div className="px-3 py-2 border-b border-white/5 mb-1">
                                    <p className="text-xs font-bold text-zinc-300">Logged in as</p>
                                    <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                                </div>

                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign out
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
    )
}
