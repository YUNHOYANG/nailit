import React from "react"
import Link from "next/link"
import { Footer } from "@/components/main/footer"

export const metadata = {
    title: "Terms of Service | Nail It",
    description: "Rules and guidelines for using the Nail It service.",
}

export default function TermsPage() {
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
                        Terms of Service
                    </h1>
                    <p className="text-zinc-500 text-sm">Last updated: February 08, 2026</p>
                </div>

                <div className="space-y-12 text-zinc-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using Nail It ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">2. Description of Service</h2>
                        <p>
                            Nail It is an AI-powered thumbnail generation platform. We provide tools to generate images and assets for content creators using advanced AI models.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">3. Accounts and Credits</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You must sign in with a valid Google account to use the Service.</li>
                            <li>Usage is based on a credit system. Credits are consumed upon starting an image generation task.</li>
                            <li>Credits are non-refundable except in cases of service failure as determined by our system.</li>
                            <li>You are responsible for maintaining the security of your account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">4. Acceptable Use</h2>
                        <p className="mb-4">You agree not to use the Service to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Generate illegal, harmful, threatening, abusive, or defamatory content.</li>
                            <li>Infringe upon the intellectual property rights of others.</li>
                            <li>Attempt to reverse engineer or disrupt the Service's infrastructure.</li>
                            <li>Bypass credit or payment systems.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Your Content:</strong> You retain rights to the prompts you provide. Ownership of AI-generated images is subject to the terms of the underlying AI provider (Google Gemini) and local laws.</li>
                            <li><strong>Our Content:</strong> The Nail It brand, logo, website design, and code are the property of Nail It and are protected by copyright laws.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">6. Payments and Refunds</h2>
                        <p>
                            All payments are processed through Polar.sh. Subscriptions and one-time purchases are subject to their specific terms. Refunds are handled on a case-by-case basis according to our refund policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                        <p>
                            Nail It is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service or any generated content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-4">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms at any time. We will notify users of any significant changes by posting the new Terms on this page.
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
