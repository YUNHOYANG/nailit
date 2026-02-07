"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

export const Navbar = () => {
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
                        Nail<span className="text-red-600">It</span>
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
                    <button className="hidden sm:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Log in
                    </button>
                    <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-full transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}
