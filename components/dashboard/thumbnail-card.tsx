"use client"

import React from "react"
import { motion } from "motion/react"
import { DownloadIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ThumbnailCardProps {
    thumbnail: {
        id: string
        image_url: string
        prompt: string
        created_at?: string
    }
    onDelete?: (id: string) => void
}

export const ThumbnailCard = ({ thumbnail, onDelete }: ThumbnailCardProps) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, [thumbnail.image_url]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl flex items-center justify-center cursor-default"
        >
            {!isLoaded && (
                <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin" />
                    <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Syncing</span>
                </div>
            )}

            <Image
                src={thumbnail.image_url}
                alt={thumbnail.prompt}
                fill
                onLoadingComplete={() => setIsLoaded(true)}
                className={cn(
                    "object-cover transition-all duration-700 group-hover:scale-105",
                    isLoaded ? "opacity-100 grayscale-0" : "opacity-0 grayscale"
                )}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white text-sm line-clamp-2 mb-4 font-medium">
                    {thumbnail.prompt}
                </p>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.open(thumbnail.image_url, '_blank')}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="View Full Size"
                    >
                        <ExternalLinkIcon className="h-4 w-4" />
                    </button>

                    <a
                        href={thumbnail.image_url}
                        download={`thumbnail-${thumbnail.id}.png`}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Download"
                    >
                        <DownloadIcon className="h-4 w-4" />
                    </a>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(thumbnail.id)}
                            className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors ml-auto"
                            title="Delete"
                        >
                            <Trash2Icon className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
