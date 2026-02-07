"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export const Navbar = () => {
    const { user, loading, signOut } = useAuth()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 transition-transform group-hover:scale-110">
                        <Image
                            src="/NailIt_logo.png"
                            alt="NailIt Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">
                        Nail-<span className="text-blue-500">It</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Pricing", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action Button */}
                <div className="flex items-center gap-4">
                    {!loading && (
                        <>
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:flex items-center gap-2 group cursor-pointer">
                                        {user.user_metadata.avatar_url && (
                                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
                                                <Image
                                                    src={user.user_metadata.avatar_url}
                                                    alt="User Avatar"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-zinc-300 truncate max-w-[100px]">
                                            {user.user_metadata.full_name || "Creator"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-full transition-all active:scale-95"
                                    >
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/auth" className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                                        Log in
                                    </Link>
                                    <Link href="/auth" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
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
