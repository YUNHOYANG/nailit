"use client"

import React from "react"
import Link from "next/link"
import Floating, { FloatingElement } from "./floating"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"

const YoutubeIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("fill-current", className)}
    >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
)

const SparkleIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={cn("fill-none stroke-current stroke-2", className)}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 3v3m0 12v3M5.636 5.636l2.122 2.122m8.484 8.484l2.122 2.122M3 12h3m12 0h3M5.636 18.364l2.122-2.122m8.484-8.484l2.122-2.122" />
    </svg>
)

const CursorIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        className={cn("fill-current", className)}
    >
        <path d="M5.653 3.123l14.417 11.533a1 1 0 0 1-.36 1.761l-5.32 1.331 4.256 7.094a1 1 0 0 1-1.712 1.028l-4.256-7.094-3.565 3.565a1 1 0 0 1-1.707-.707V4 a1 1 0 0 1 1.247-.977z" />
    </svg>
)

const ThumbnailSkeleton = ({ className }: { className?: string }) => (
    <div className={cn(
        "aspect-video rounded-lg border border-white/10 bg-white/5 overflow-hidden p-2",
        className
    )}>
        <div className="w-full h-full rounded border border-white/5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
                <YoutubeIcon className="w-8 h-8 text-white/40" />
            </div>
            <div className="absolute bottom-2 left-2 right-2 h-2 bg-white/20 rounded-full" />
        </div>
    </div>
)

export const Hero = () => {
    const { user } = useAuth()
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
            {/* Background Parallax Elements */}
            <Floating sensitivity={2} className="h-full w-full">
                {/* Floating Thumbnails */}
                <FloatingElement depth={0.5} className="top-[15%] left-[10%] opacity-20">
                    <ThumbnailSkeleton className="w-64 -rotate-12 blur-[1px]" />
                </FloatingElement>
                <FloatingElement depth={1.2} className="top-[25%] right-[15%] opacity-30">
                    <ThumbnailSkeleton className="w-48 rotate-[15deg] blur-[2px]" />
                </FloatingElement>
                <FloatingElement depth={0.8} className="bottom-[20%] left-[20%] opacity-25">
                    <ThumbnailSkeleton className="w-56 rotate-[5deg] blur-[1px]" />
                </FloatingElement>
                <FloatingElement depth={1.5} className="bottom-[30%] right-[10%] opacity-20">
                    <YoutubeIcon className="w-16 h-16 text-blue-500/40 blur-[2px]" />
                </FloatingElement>

                {/* Abstract Blobs */}
                <FloatingElement depth={0.4} className="top-[20%] left-1/2 -ml-[300px] -z-10">
                    <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
                </FloatingElement>
                <FloatingElement depth={0.6} className="bottom-[10%] right-[20%] -z-10">
                    <div className="w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px]" />
                </FloatingElement>
            </Floating>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-8 animate-fade-in backdrop-blur-md">
                    <SparkleIcon className="w-4 h-4 text-blue-500" />
                    <span>The Ultimate AI Arsenal for Modern Creators</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent leading-[1.1]">
                    Dominate the Feed <br />
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">with AI Precision</span>
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Stop guessing, start winning. Nail-It leverages advanced neural networks and
                    CTR-driven patterns to transform your ideas into high-performance thumbnails that demand the click.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={user ? "/dashboard" : "/auth"} className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold overflow-hidden transition-all hover:bg-blue-700 active:scale-95">
                        <span className="relative z-10">{user ? "Go to Dashboard" : "Start for Free"}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </Link>
                    <Link href="#how-it-works" className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-sm text-center">
                        How it works
                    </Link>
                </div>
            </div>

            {/* Foreground Parallax Elements */}
            <Floating sensitivity={4} className="h-full w-full pointer-events-none">
                <FloatingElement depth={2} className="top-[40%] left-[25%] opacity-40">
                    <CursorIcon className="w-8 h-8 text-white rotate-[15deg] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]" />
                </FloatingElement>
                <FloatingElement depth={2.5} className="bottom-[45%] right-[25%] opacity-40">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl -rotate-10 shadow-2xl">
                        <YoutubeIcon className="w-8 h-8 text-blue-500" />
                        <div className="mt-2 space-y-1">
                            <div className="w-20 h-2 bg-white/20 rounded-full" />
                            <div className="w-12 h-2 bg-white/10 rounded-full" />
                        </div>
                    </div>
                </FloatingElement>
            </Floating>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 via-white/20 to-transparent" />
                <span className="text-[10px] uppercase tracking-widest font-medium">Scroll to explore</span>
            </div>
        </section>
    )
}
