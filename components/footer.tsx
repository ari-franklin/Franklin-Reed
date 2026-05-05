import Link from "next/link";

import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__copy">© Franklin Reed, 2026</p>
      <a
        className="site-footer__contact"
        href={`mailto:${siteContent.contactEmail}`}
      >
        {siteContent.contactEmail}
      </a>
      {siteContent.navigation.length > 0 ? (
        <nav aria-label="Footer">
          <ul className="site-footer__nav">
            {siteContent.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </footer>
  );
}
