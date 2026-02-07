"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"
import { ImageIcon, LayoutGridIcon, HistoryIcon, ChevronLeftIcon, ChevronRightIcon, Trash2Icon, DownloadIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface Thumbnail {
    id: string
    image_url: string
    prompt: string
    created_at: string
}

interface SidebarProps {
    thumbnails: Thumbnail[]
    onDelete: (id: string) => void
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

export const Sidebar = ({ thumbnails, onDelete, isOpen, setIsOpen }: SidebarProps) => {
    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed top-1/2 -translate-y-1/2 z-50 flex h-14 w-6 items-center justify-center bg-[#202020] border border-white/10 rounded-r-xl text-zinc-400 transition-all hover:text-white hover:bg-[#252525] hover:w-8 shadow-2xl",
                    isOpen ? "left-[344px]" : "left-0"
                )}
            >
                {isOpen ? <ChevronLeftIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: -360, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -360, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed left-6 top-[88px] bottom-6 w-[320px] z-40 bg-[#202020]/80 backdrop-blur-2xl border border-white/10 flex flex-col shadow-2xl rounded-[32px] overflow-hidden"
                        style={{
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                        }}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <HistoryIcon className="h-4 w-4 text-blue-400" />
                                    </div>
                                    <h2 className="text-md font-bold text-white tracking-tight">Recent Studio Work</h2>
                                </div>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-zinc-400 font-bold uppercase">
                                    {thumbnails.length}
                                </span>
                            </div>
                        </div>

                        {/* Liquid Glass Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <div className="grid grid-cols-1 gap-4">
                                {thumbnails.map((thumbnail) => (
                                    <motion.div
                                        key={thumbnail.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/5 transition-all hover:border-blue-500/50 shadow-lg"
                                    >
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={thumbnail.image_url}
                                                alt={thumbnail.prompt}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Overlay Controls */}
                                        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-[-10px] group-hover:translate-y-0">
                                            <button
                                                onClick={() => onDelete(thumbnail.id)}
                                                className="h-8 w-8 rounded-full bg-black/60 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center backdrop-blur-md transition-colors"
                                            >
                                                <Trash2Icon className="h-3.5 w-3.5" />
                                            </button>
                                            <a
                                                href={thumbnail.image_url}
                                                download={`nailit-${thumbnail.id}.png`}
                                                className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors"
                                            >
                                                <DownloadIcon className="h-3.5 w-3.5" />
                                            </a>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-[9px] text-white line-clamp-2 leading-tight opacity-80">
                                                {thumbnail.prompt}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {thumbnails.length === 0 && (
                                    <div className="col-span-2 py-20 flex flex-col items-center justify-center text-zinc-600 gap-3">
                                        <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                                            <ImageIcon className="h-6 w-6" />
                                        </div>
                                        <p className="text-sm font-medium">No creations yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-white/5 backdrop-blur-md border-t border-white/5">
                            <button className="w-full py-2.5 rounded-xl bg-blue-600/10 text-blue-400 text-xs font-semibold hover:bg-blue-600/20 transition-all border border-blue-500/20 flex items-center justify-center gap-2">
                                <LayoutGridIcon className="h-3.5 w-3.5" />
                                View Full Storage
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </>
    )
}
