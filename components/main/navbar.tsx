"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"

export const Navbar = () => {
    const { user, loading, signOut } = useAuth()
    const pathname = usePathname()

    // 대시보드와 인증 페이지에서는 전용 네비바를 사용하거나 숨김 처리
    if (pathname?.startsWith("/dashboard")) return null
    if (pathname?.startsWith("/auth")) return null

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
            <div className="max-w-[100vw] mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo Section: Airborne Style */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:bg-zinc-800/80 hover:border-white/20 active:scale-95"
                >
                    <div className="relative w-6 h-6 transition-transform group-hover:scale-110">
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

                {/* Navigation Links: Optional, but let's keep it clean or airborne them too */}
                <div className="hidden md:flex items-center gap-2">
                    {["Features", "Pricing"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="px-4 py-2 rounded-full bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all font-sans"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action Button: Airborne Style */}
                <div className="flex items-center gap-3">
                    {!loading && (
                        <>
                            {user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all active:scale-95 shadow-lg border border-blue-500/50"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/auth"
                                        className="px-4 py-2 rounded-full bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/auth"
                                        className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all active:scale-95 shadow-lg border border-blue-500/50"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
