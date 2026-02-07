"use client"

import React from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { DashboardNavbar } from "@/components/dashboard/navbar"
import { PromptArea } from "@/components/dashboard/prompt-area"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && !user) {
            router.push("/auth")
        }
    }, [user, loading, router])

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#181818] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-[#181818] relative overflow-hidden flex items-center justify-center">
            {/* Tile Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                    `,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Ambient Light Glarus */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px] -z-10" />

            <DashboardNavbar />

            <div className="relative z-10 w-full px-6 flex flex-col items-center">
                <PromptArea />
            </div>
        </main>
    )
}
