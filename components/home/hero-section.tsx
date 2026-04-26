import { siteContent } from "@/content/site";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <h1>
          <span className="hero-section__headline-lead">
            {siteContent.hero.headlineLead}
          </span>
          <span className="hero-section__headline-tail">
            <span className="hero-section__headline-tail-line">
              {siteContent.hero.headlineTailTop}
            </span>
            <span className="hero-section__headline-tail-line">
              {siteContent.hero.headlineTailBottom}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
