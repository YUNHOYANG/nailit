"use client"

import React from "react"
import { motion } from "motion/react"
import { BorderBeam } from "@/components/ui/border-beam"
import { SparklesIcon } from "lucide-react"

export const LoadingCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-800/80 border border-white/10 shadow-2xl flex flex-col items-center justify-center gap-4 z-20"
        >
            <BorderBeam
                duration={3}
                size={250}
                className="from-blue-400 via-cyan-400 to-transparent"
                borderWidth={2}
            />

            <div className="relative">
                <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full animate-pulse" />
                <div className="relative h-14 w-14 rounded-full bg-zinc-900 border-2 border-white/20 flex items-center justify-center text-blue-400 shadow-inner">
                    <SparklesIcon className="h-7 w-7 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-[10px] font-bold text-blue-400 uppercase tracking-tighter animate-pulse">
                    Processing
                </div>
                <p className="text-white font-semibold text-base">
                    Nailing your masterpiece...
                </p>
                <p className="text-zinc-400 text-xs px-8 text-center line-clamp-2 max-w-[280px]">
                    Gemini Nano Banana Pro is weaving its magic to create your viral thumbnail.
                </p>
            </div>
        </motion.div>
    )
}
