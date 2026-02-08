import { Hero } from "@/components/main/hero"
import { Features } from "@/components/main/features"
import { HowItWorks } from "@/components/main/how-it-works"
import { Pricing } from "@/components/main/pricing"
import { Footer } from "@/components/main/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  )
}