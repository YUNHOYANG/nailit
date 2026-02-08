"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ZapIcon, CrownIcon, CheckCircle2 } from "lucide-react"
import { BorderBeam } from "@/components/ui/border-beam"
import Link from "next/link"

const plans = [
    {
        name: "Pro",
        price: "$20",
        credits: "100 Credits",
        description: "Perfect for budding content creators seeking that professional edge.",
        icon: ZapIcon,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        glowColor: "bg-blue-500/10",
        features: [
            "100 Generation Credits",
            "Advanced Gemini Engine",
            "History Storage",
            "Reference Asset Support",
            "Standard Support"
        ]
    },
    {
        name: "Ultra",
        price: "$45",
        credits: "300 Credits",
        description: "The ultimate arsenal for professional studios and viral hitmakers.",
        icon: CrownIcon,
        color: "text-purple-400",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        glowColor: "bg-purple-500/10",
        features: [
            "300 Generation Credits",
            "Highest Priority Encoding",
            "Permanent History Storage",
            "Recursive Reference Logic",
            "24/7 Priority Support",
            "Early Access to Features"
        ]
    }
]

export const Pricing = () => {
    return (
        <section id="pricing" className="relative py-24 bg-black overflow-hidden">
            {/* Ambient Background Glarus */}
            <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">
                        Straightforward Pricing
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                        Fuel Your Viral Growth
                    </h3>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto italic font-sans font-medium">
                        Powerful credits for powerful results. Choose the plan that fits your production scale.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "relative flex flex-col p-8 rounded-[40px] bg-zinc-900/40 border backdrop-blur-md transition-all duration-500 group overflow-hidden",
                                plan.borderColor,
                                "hover:scale-[1.02] hover:bg-zinc-800/50 hover:border-white/20"
                            )}
                        >
                            {/* Inner Glow */}
                            <div className={cn("absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 rounded-full", plan.glowColor)} />

                            <BorderBeam
                                size={400}
                                duration={15}
                                delay={idx * 5}
                                className={cn("from-transparent via-blue-500/20 to-transparent")}
                            />

                            <div className="flex items-center justify-between mb-8">
                                <div className={cn("p-4 rounded-[24px] shadow-2xl", plan.bgColor)}>
                                    <plan.icon className={cn("w-8 h-8", plan.color)} />
                                </div>
                                <div className="text-right">
                                    <div className="text-4xl font-black text-white tracking-tighter">
                                        {plan.price}
                                    </div>
                                    <div className={cn("text-[10px] font-black uppercase tracking-widest mt-1", plan.color)}>
                                        One-time / Monthly
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className={cn("text-2xl font-black tracking-tight mb-2 uppercase", plan.color)}>
                                    {plan.name} Plan
                                </h4>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                                    <span className="text-sm font-bold text-white tracking-tight">{plan.credits} Pack</span>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-1">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <CheckCircle2 className={cn("w-4 h-4 shrink-0", plan.color)} />
                                        <span className="text-sm text-zinc-300 font-medium tracking-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/auth"
                                className={cn(
                                    "w-full py-5 rounded-[20px] font-black text-center text-sm uppercase tracking-widest transition-all active:scale-95 shadow-2xl",
                                    plan.name === "Ultra"
                                        ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20"
                                        : "bg-white text-black hover:bg-zinc-200"
                                )}
                            >
                                Get Started with {plan.name}
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="mt-12 text-center text-zinc-600 text-[11px] font-bold uppercase tracking-[0.3em]">
                    Enterprise options available. <a href="mailto:treadmall@gmail.com" className="text-blue-500/60 hover:text-blue-500 transition-colors">Contact us</a>
                </p>
            </div>
        </section>
    )
}
