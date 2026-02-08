"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

export const Navbar = () => {
    const { user, loading } = useAuth()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    // 대시보드와 인증 페이지에서는 전용 네비바를 사용하거나 숨김 처리
    if (pathname?.startsWith("/dashboard")) return null
    if (pathname?.startsWith("/auth")) return null

    const navItems = ["Features", "How it works", "Pricing", "Contact"]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
            <div className="max-w-[100vw] mx-auto flex items-center justify-between pointer-events-auto relative">
                {/* Logo Section: Airborne Style */}
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md shadow-lg transition-all hover:bg-zinc-800/80 hover:border-white/20 active:scale-95 z-[60]"
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

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex items-center justify-center p-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md text-white z-[60] ml-auto transition-all active:scale-95"
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item}
                            href={item === "Contact" ? "mailto:treadmall@gmail.com" : `#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="px-2 py-1 text-sm font-bold tracking-tight text-zinc-400 hover:text-white transition-all duration-300"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Action Button: Desktop */}
                <div className="hidden md:flex items-center gap-3">
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
                                        className="px-4 py-2 rounded-full bg-zinc-900/40 border border-white/5 backdrop-blur-sm text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all font-bold"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/auth"
                                        className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold transition-all active:scale-95 shadow-lg shadow-white/5 border border-white/10"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 right-0 left-0 mt-16 p-6 md:hidden z-50 pointer-events-auto"
                        >
                            <div className="bg-zinc-950/90 border border-white/10 backdrop-blur-2xl rounded-[32px] p-8 flex flex-col gap-6 shadow-2xl">
                                <div className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item}
                                            href={item === "Contact" ? "mailto:treadmall@gmail.com" : `#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl font-black tracking-tighter text-zinc-400 hover:text-white transition-all"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                                <div className="h-px bg-white/5 my-2" />
                                <div className="flex flex-col gap-3">
                                    {user ? (
                                        <Link
                                            href="/dashboard"
                                            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-center text-sm uppercase tracking-widest"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/auth"
                                                className="w-full py-4 rounded-2xl bg-zinc-900 text-white font-black text-center text-sm uppercase tracking-widest border border-white/5"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href="/auth"
                                                className="w-full py-4 rounded-2xl bg-white text-black font-black text-center text-sm uppercase tracking-widest"
                                            >
                                                Get Started
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}
