import type { Metadata } from "next";

import { Footer } from "@/components/footer";
import { siteContent } from "@/content/site";
import {
  createOrganizationStructuredData,
  createPageMetadata,
  createWebsiteStructuredData,
} from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.siteUrl),
  applicationName: siteContent.name,
  ...createPageMetadata({
    title: siteContent.founderName,
    description: siteContent.description,
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    createOrganizationStructuredData(),
    createWebsiteStructuredData(),
  ];

  return (
    <html lang="en">
      <body className="site-shell">
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
