import { Geist, Geist_Mono, Indie_Flower } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const indieFlower = Indie_Flower({
  weight: "400",
  variable: "--font-indie-flower",
  subsets: ["latin"],
})

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nail It",
  description: "Thumbnail Generator",
}

import { Navbar } from "@/components/main/navbar"
import { AuthProvider } from "@/hooks/use-auth"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${indieFlower.variable} antialiased font-sans`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
