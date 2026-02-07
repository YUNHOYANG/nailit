"use client"

import React from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { DashboardNavbar } from "@/components/dashboard/navbar"
import { PromptArea } from "@/components/dashboard/prompt-area"
import { ThumbnailCard } from "@/components/dashboard/thumbnail-card"
import { LoadingCard } from "@/components/dashboard/loading-card"
import { ErrorCard } from "@/components/dashboard/error-card"
import { Sidebar } from "@/components/dashboard/sidebar"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface Thumbnail {
    id: string
    image_url: string
    prompt: string
    created_at: string
}

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const [thumbnails, setThumbnails] = React.useState<Thumbnail[]>([])
    const [isInitialLoading, setIsInitialLoading] = React.useState(true)
    const [isGenerating, setIsGenerating] = React.useState(false)
    const [generationError, setGenerationError] = React.useState<string | null>(null)
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

    React.useEffect(() => {
        if (!loading && !user) {
            router.push("/auth")
            return
        }

        if (user) {
            fetchThumbnails()
        }
    }, [user, loading, router])

    const fetchThumbnails = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("thumbnails")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) {
            console.error("Error fetching thumbnails:", error)
        } else if (data) {
            setThumbnails(data)
        }
        setIsInitialLoading(false)
    }

    React.useEffect(() => {
        const handleNewThumbnail = (event: any) => {
            const newThumbnail = event.detail
            setThumbnails(prev => [newThumbnail, ...prev])
            setIsGenerating(false) // Just in case
        }

        const handleGeneratingStarted = () => {
            setIsGenerating(true)
            setGenerationError(null)
        }
        const handleGeneratingFinished = () => setIsGenerating(false)
        const handleGeneratingError = (event: any) => {
            setGenerationError(event.detail.message)
            setIsGenerating(false)
        }

        window.addEventListener('thumbnailGenerated', handleNewThumbnail)
        window.addEventListener('generatingStarted', handleGeneratingStarted)
        window.addEventListener('generatingFinished', handleGeneratingFinished)
        window.addEventListener('generatingError', handleGeneratingError)

        return () => {
            window.removeEventListener('thumbnailGenerated', handleNewThumbnail)
            window.removeEventListener('generatingStarted', handleGeneratingStarted)
            window.removeEventListener('generatingFinished', handleGeneratingFinished)
            window.removeEventListener('generatingError', handleGeneratingError)
        }
    }, [])

    const handleDelete = async (id: string) => {
        const supabase = createClient()
        const { error } = await supabase
            .from("thumbnails")
            .delete()
            .match({ id })

        if (error) {
            alert("Failed to delete thumbnail")
        } else {
            setThumbnails(prev => prev.filter(t => t.id !== id))
        }
    }

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

            <Sidebar
                thumbnails={thumbnails}
                onDelete={handleDelete}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            <div className="relative z-10 w-full px-6 flex flex-col items-center max-w-6xl mx-auto py-32">
                <PromptArea />

                {/* Results Section */}
                <div className="w-full mt-16">
                    {isInitialLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                        </div>
                    ) : (thumbnails.length > 0 || isGenerating) ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-medium text-white/90">Generated Masterpieces</h2>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isGenerating && <LoadingCard />}
                                {generationError && (
                                    <ErrorCard
                                        message={generationError}
                                        onClose={() => setGenerationError(null)}
                                    />
                                )}
                                {thumbnails.map((thumbnail) => (
                                    <ThumbnailCard
                                        key={thumbnail.id}
                                        thumbnail={thumbnail}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    )
}
