import Link from "next/link";

import { siteContent } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__copy">
        {siteContent.name} is preparing a sharper public reveal.
      </p>
      <nav aria-label="Footer">
        <ul className="site-footer__nav">
          {siteContent.navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
