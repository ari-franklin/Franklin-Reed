import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />
      <section className="about-page__hero">
        <p className="section-heading__eyebrow">{siteContent.founderName}</p>
        <h1>{siteContent.about.title}</h1>
        <p className="about-page__body">{siteContent.about.body}</p>
        <p className="about-page__detail">{siteContent.about.detail}</p>
      </section>
    </main>
  );
}
