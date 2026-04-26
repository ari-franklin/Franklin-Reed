import { siteContent } from "@/content/site";

export function BrandPromiseSection() {
  return (
    <section
      className="brand-promise"
      aria-labelledby="preview-heading"
      id="preview"
    >
      <div className="section-heading">
        <p className="section-heading__eyebrow">Preview</p>
        <h2 id="preview-heading">{siteContent.promise.title}</h2>
      </div>
      <p className="brand-promise__body">{siteContent.promise.body}</p>
      <ul className="brand-promise__highlights">
        {siteContent.promise.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </section>
  );
}
