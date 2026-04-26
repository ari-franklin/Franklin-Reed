import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main className="landing-page">
      <SiteHeader />
      <HeroSection />
    </main>
  );
}
