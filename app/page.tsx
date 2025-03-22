import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { MetricsSection } from "@/components/metrics-section"
import { JudgingSection } from "@/components/judging-section"
import { TeamSection } from "@/components/team-section"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <DemoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <MetricsSection />
      <JudgingSection />
      <TeamSection />
    </div>
  )
}

