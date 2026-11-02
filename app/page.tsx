import { HeroSection } from "@/components/home/hero-section";
import { SiteHeader } from "@/components/site-header";
import { SignupModal } from "@/components/signup/signup-modal";

export default function HomePage() {
  return (
    <>
      <main className="landing-page">
        <SiteHeader />
        <HeroSection />
      </main>
      <SignupModal />
    </>
  );
}
