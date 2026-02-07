"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import Floating, { FloatingElement } from "@/components/main/hero/floating"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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

export default function AuthPage() {
    const { signInWithGoogle, user, loading } = useAuth()
    const router = useRouter()

    // 이미 로그인된 경우 대시보드로 리다이렉트
    React.useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard")
        }
    }, [user, loading, router])

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    return (
        <main className="relative min-h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-black text-white">

            {/* Left Side: Video & Brand (3/5) */}
            <div className="relative w-full lg:w-[60%] h-[50vh] lg:h-screen flex flex-col p-8 lg:p-16 overflow-hidden bg-zinc-950">
                {/* Visual Background - Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 z-10" />

                {/* Floating elements for left side */}
                <Floating sensitivity={1.5} className="absolute inset-0 z-0 opacity-40">
                    <FloatingElement depth={0.5} className="top-[10%] left-[10%]">
                        <div className="w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
                    </FloatingElement>
                    <FloatingElement depth={0.8} className="bottom-[20%] right-[10%]">
                        <div className="w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px]" />
                    </FloatingElement>
                </Floating>

                {/* Top Section: Video Player */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-20 flex-1 flex flex-col"
                >
                    <div className="w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 backdrop-blur-sm group">
                        <iframe
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
                            title="Nail-It Background Video"
                            allow="autoplay; encrypted-media"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                </motion.div>

                {/* Bottom Section: Oversized Font */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-20 mt-auto"
                >
                    <h1 className="text-[12vw] lg:text-[14vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none opacity-90">
                        NAILIT
                    </h1>
                </motion.div>
            </div>

            {/* Right Side: Login Card (2/5) */}
            <div className="relative w-full lg:w-[40%] h-[50vh] lg:h-screen flex items-center justify-center p-8 lg:p-12 overflow-hidden bg-black">
                {/* Right side floating background blobs */}
                <Floating sensitivity={2} className="absolute inset-0">
                    <FloatingElement depth={1} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
                    </FloatingElement>
                </Floating>

                <div className="relative z-10 w-full max-w-sm">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center mb-10"
                    >
                        <Link href="/" className="flex items-center gap-2 group mb-6">
                            <div className="relative w-10 h-10 transition-transform group-hover:scale-110">
                                <Image
                                    src="/NailIt_logo.png"
                                    alt="NailIt Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="text-2xl font-bold tracking-tighter text-white">
                                Nail-<span className="text-blue-500">It</span>
                            </span>
                        </Link>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium mb-3 backdrop-blur-md">
                            <SparkleIcon className="w-3 h-3 text-blue-500" />
                            <span>Engineered for the next generation of creators</span>
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                            Enter the Studio
                        </h2>
                    </motion.div>

                    {/* Auth Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative flex flex-col items-center p-8 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-3xl shadow-2xl">
                            <button
                                disabled={loading}
                                onClick={handleGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-xl font-bold transition-all hover:bg-zinc-200 active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <GoogleIcon className="w-5 h-5" />
                                {loading ? "Connecting..." : "Continue with Google"}
                            </button>

                            <p className="mt-8 text-[10px] text-zinc-500 text-center leading-relaxed">
                                By continuing, you agree to Nail-It's<br />
                                <Link href="#" className="underline hover:text-white transition-colors">Terms of Service</Link> and <Link href="#" className="underline hover:text-white transition-colors">Privacy Policy</Link>.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-center"
                    >
                        <Link href="/" className="mt-10 inline-block text-xs text-zinc-500 hover:text-white transition-colors">
                            ← Back to home
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
