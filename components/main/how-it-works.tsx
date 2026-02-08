"use client"

import React from "react"
import { cn } from "@/lib/utils"
import {
    SendHorizontalIcon,
    ImagePlusIcon,
    CpuIcon,
    DownloadIcon,
    ArrowRightIcon
} from "lucide-react"

const steps = [
    {
        title: "Input Your Vision",
        description: "Describe your video topic or central theme in natural language. Our AI understands context and creators' intent.",
        icon: SendHorizontalIcon,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
    },
    {
        title: "Reference Your Best",
        description: "Optionally upload previous successful thumbnails or styles you love. We'll use them as a visual foundation.",
        icon: ImagePlusIcon,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
    },
    {
        title: "Neural Synthesis",
        description: "Our advanced models analyze CTR patterns and visual hierarchy to composite a high-impact design.",
        icon: CpuIcon,
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10",
    },
    {
        title: "Dominate the Feed",
        description: "Download your bespoke, conversion-optimized masterpiece and start winning the attention war.",
        icon: DownloadIcon,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
    }
]

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="relative py-24 bg-black overflow-hidden">
            {/* Background Decorative Lines */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`, backgroundSize: '80px 80px' }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24 transition-all duration-700">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-blue-500 uppercase mb-4">
                        The Workflow
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        Concept to Click in Seconds
                    </h3>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        We've engineered the perfect pipeline. No complex editing tools, no design fatigue.
                        Just pure, AI-driven output.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                    {/* Connecting line for desktop */}
                    <div className="hidden lg:block absolute top-[60px] left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent -z-10" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="group flex flex-col items-center text-center">
                            <div className={cn(
                                "w-28 h-28 rounded-full flex items-center justify-center mb-8 relative transition-all duration-500 group-hover:scale-110",
                                step.bgColor,
                                "border border-white/5 shadow-2xl"
                            )}>
                                {/* Step Number Badge */}
                                <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-black text-white">
                                    0{idx + 1}
                                </div>

                                <step.icon className={cn("w-10 h-10 transition-transform duration-500 group-hover:rotate-12", step.color)} />

                                {/* Glow effect */}
                                <div className={cn("absolute inset-0 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40", step.bgColor)} />
                            </div>

                            <h4 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-400 transition-colors">
                                {step.title}
                            </h4>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                                {step.description}
                            </p>

                            {/* Arrow for small/medium screens */}
                            {idx !== steps.length - 1 && (
                                <ArrowRightIcon className="mt-8 w-5 h-5 text-zinc-800 lg:hidden" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Call to Action area within section */}
                <div className="mt-32 p-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent">
                    <div className="h-px bg-white/5" />
                </div>
            </div>
        </section>
    )
}
