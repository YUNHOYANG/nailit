"use client"

import React from "react"
import { motion } from "motion/react"
import { AlertCircleIcon, XIcon, RefreshCwIcon } from "lucide-react"

interface ErrorCardProps {
    message?: string
    onRetry?: () => void
    onClose?: () => void
}

export const ErrorCard = ({ message = "Failed to generate image", onRetry, onClose }: ErrorCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-red-500/5 border border-red-500/20 shadow-2xl flex flex-col items-center justify-center gap-4 z-20"
        >
            <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                <div className="relative h-14 w-14 rounded-full bg-zinc-900 border-2 border-red-500/30 flex items-center justify-center text-red-500 shadow-inner">
                    <XIcon className="h-8 w-8 stroke-[2.5]" />
                </div>
            </div>

            <div className="flex flex-col items-center gap-2 px-6 text-center">
                <p className="text-white font-semibold text-base">
                    Something went wrong
                </p>
                <p className="text-zinc-400 text-xs line-clamp-2 max-w-[280px]">
                    {message}
                </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-all"
                    >
                        <RefreshCwIcon className="h-3.5 w-3.5" />
                        Try again
                    </button>
                )}
                <button
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 text-xs font-medium transition-all"
                >
                    Dismiss
                </button>
            </div>
        </motion.div>
    )
}
