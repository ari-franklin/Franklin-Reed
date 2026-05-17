import { siteContent } from "@/content/site";

export function HeroSection() {
  const { headlineLead, headlineTailTop, headlineTailBottom } = siteContent.hero;

  return (
    <section className="hero-section">
      <div className="hero-section__copy">
        <h1>
          {headlineLead ? (
            <span className="hero-section__headline-lead">{headlineLead}</span>
          ) : null}
          {headlineLead ? (
            <span aria-hidden="true" className="hero-section__paint-stripe" />
          ) : null}
          <span className="hero-section__headline-tail">
            {headlineTailTop ? (
              <span className="hero-section__headline-tail-line">
                {headlineTailTop}
              </span>
            ) : null}
            {headlineTailBottom ? (
              <span className="hero-section__headline-tail-line">
                {headlineTailBottom}
              </span>
            ) : null}
          </span>
        </h1>
      </div>
    </section>
  );
}
