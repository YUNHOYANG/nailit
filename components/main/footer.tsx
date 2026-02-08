import React from "react"
import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="w-full bg-black border-t border-white/5 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand Section */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <Link href="/" className="flex items-center gap-2">
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
                    <p className="text-zinc-500 text-xs max-w-[200px] text-center md:text-left">
                        Elevate your content with the power of strategic AI thumbnail design.
                    </p>
                </div>

                {/* Links Section */}
                <div className="flex items-center gap-8 text-xs font-medium text-zinc-400">
                    <Link href="/privacy" className="hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-white transition-colors">
                        Terms of Service
                    </Link>
                    <a href="mailto:treadmall@gmail.com" className="hover:text-white transition-colors">
                        Support
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-zinc-600 text-[10px] uppercase tracking-widest">
                    &copy; 2026 Nail It Studio
                </div>
            </div>
        </footer>
    )
}
