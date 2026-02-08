"use client"

import React from "react"
import { cn } from "@/lib/utils"
import {
    ZapIcon,
    SparklesIcon,
    LayersIcon,
    FlameIcon,
    ShieldCheckIcon,
    MousePointerClickIcon,
    ArrowUpRightIcon,
    TrendingUpIcon,
    ClockIcon
} from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"

const features = [
    {
        title: "AI-Powered Visual Engine",
        description: "Powered by the latest Gemini models to generate high-fidelity thumbnails.",
        icon: SparklesIcon,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        colSpan: "lg:col-span-2",
        ui: (
            <div className="absolute inset-0 top-1/2 left-4 right-4 bg-zinc-950/80 rounded-t-xl border-x border-t border-white/10 p-4 transition-transform group-hover:-translate-y-2 duration-500">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="ml-2 h-2 w-24 bg-white/10 rounded-full" />
                </div>
                <div className="space-y-3">
                    <div className="h-2 w-full bg-white/5 rounded-full" />
                    <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                    <div className="h-32 w-full rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center">
                        <SparklesIcon className="w-8 h-8 text-blue-500/40 animate-pulse" />
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "Reference System",
        description: "Maintain your brand identity with visual logic.",
        icon: LayersIcon,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        colSpan: "lg:col-span-1",
        ui: (
            <div className="absolute bottom-[-20%] left-[-10%] right-[-10%] aspect-square bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl group-hover:opacity-100 opacity-50 transition-opacity" />
        )
    },
    {
        title: "CTR Optimization",
        description: "Engineered specifically for viral social feeds.",
        icon: MousePointerClickIcon,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        colSpan: "lg:col-span-1",
        ui: (
            <div className="absolute bottom-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md transition-transform group-hover:scale-110 duration-500">
                <div className="flex items-end gap-1 h-12">
                    <div className="w-2 h-4 bg-orange-500/20 rounded-t-sm" />
                    <div className="w-2 h-8 bg-orange-500/40 rounded-t-sm" />
                    <div className="w-2 h-6 bg-orange-500/20 rounded-t-sm" />
                    <div className="w-2 h-10 bg-orange-500 rounded-t-sm animate-bounce" />
                </div>
                <div className="mt-2 text-[10px] font-black text-orange-400 uppercase tracking-tighter">CTR +240%</div>
            </div>
        )
    },
    {
        title: "Viral Heat Synthesis",
        description: "Analyze and merge trending visual elements.",
        icon: FlameIcon,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        colSpan: "lg:col-span-1",
        ui: (
            <div className="absolute top-1/2 left-0 right-0 py-8 px-4 flex flex-col gap-2 pointer-events-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                <div className="text-[8px] text-center font-bold text-red-500/40 uppercase tracking-[0.5em] animate-pulse">Scanning Trends</div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </div>
        )
    },
    {
        title: "Instant Genesis",
        description: "Idea to masterpiece in under 30 seconds flat.",
        icon: ClockIcon,
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        colSpan: "lg:col-span-1",
        ui: (
            <div className="absolute top-8 right-8 animate-spin-slow">
                <div className="w-16 h-16 rounded-full border border-dashed border-yellow-500/20 border-t-yellow-500" />
            </div>
        )
    }
]

export const Features = () => {
    return (
        <section id="features" className="relative py-32 bg-black overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/[0.03] rounded-full blur-[180px] -z-10" />
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02]" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-6">
                            Capabilities
                        </div>
                        <h3 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            The Studio for the <br />
                            <span className="text-zinc-600">Next-Gen Creator</span>
                        </h3>
                    </div>
                    <p className="text-zinc-500 text-lg md:text-right max-w-[300px] italic leading-tight">
                        Built for those who demand precision and speed in equal measure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "relative group rounded-[32px] bg-zinc-900/40 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:bg-zinc-800/60 hover:border-white/20 min-h-[360px]",
                                feature.colSpan
                            )}
                        >
                            <BorderBeam
                                size={400}
                                duration={12}
                                delay={idx * 1.5}
                                className={cn("from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
                                    feature.color === "text-blue-400" ? "via-blue-500" :
                                        feature.color === "text-purple-400" ? "via-purple-500" : "via-orange-500")}
                            />

                            <div className="relative z-20 p-10 h-full flex flex-col">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                                    feature.bgColor
                                )}>
                                    <feature.icon className={cn("w-6 h-6", feature.color)} />
                                </div>

                                <div className="mt-auto">
                                    <h4 className="text-2xl font-bold text-white mb-3 tracking-tighter flex items-center gap-2">
                                        {feature.title}
                                        <ArrowUpRightIcon className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-600" />
                                    </h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* UI Snippets */}
                            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                                {feature.ui}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
