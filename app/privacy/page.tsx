import React from "react"
import Link from "next/link"
import { Footer } from "@/components/main/footer"

export const metadata = {
    title: "Privacy Policy | Nail It",
    description: "Our commitment to protecting your privacy and data.",
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            {/* Ambient Background Lights */}
            <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] -z-10" />
            <div className="fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[200px] -z-10" />

            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mb-4 inline-block"
                    >
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        Privacy Policy
                    </h1>
                    <p className="text-zinc-500 text-sm">Last updated: February 08, 2026</p>
                </div>

                <div className="space-y-12 text-zinc-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Introduction</h2>
                        <p>
                            Welcome to Nail It ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share information when you use our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">We collect information that you provide directly to us:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> When you sign up using Google OAuth, we receive your email address, name, and profile picture.</li>
                            <li><strong>Content Generation:</strong> We store the prompts and images you upload/generate through our service to provide you with a history of your masterpieces.</li>
                            <li><strong>Payment Data:</strong> Payment processing is handled by Polar.sh. We do not store your credit card details on our servers; we only receive transaction status and plan information via webhooks.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We use your information for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our Service.</li>
                            <li>To manage your account and credits.</li>
                            <li>To process payments and subscriptions via Polar.sh.</li>
                            <li>To generate AI thumbnails based on your prompts.</li>
                            <li>To communicate with you regarding updates or support.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Data Storage and Security</h2>
                        <p>
                            Your data is stored securely using Supabase (PostgreSQL) and Supabase Storage. We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">5. Third-Party Services</h2>
                        <p className="mb-4">We rely on several trusted third-party services to operate:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Google OAuth:</strong> For secure authentication.</li>
                            <li><strong>Supabase:</strong> For database and cloud storage.</li>
                            <li><strong>Gemini AI (Google):</strong> For generating AI images and content.</li>
                            <li><strong>Polar.sh:</strong> For handling payments and infrastructure for creators.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">6. Cookies</h2>
                        <p>
                            We use essential cookies to maintain your session and authentication state. You can control cookie settings through your browser, but disabling them may prevent you from using the Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at treadmall@gmail.com.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-white/10 text-center">
                    <p className="text-zinc-500 text-xs">
                        &copy; 2026 Nail It. All rights reserved.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    )
}
