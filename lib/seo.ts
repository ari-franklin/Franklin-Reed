import type { Metadata } from "next";

import { siteContent } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

const stripTrailingSlash = (value: string) => value.replace(/\/$/, "");
const siteUrl = stripTrailingSlash(siteContent.siteUrl);

export const resolveCanonicalUrl = (path = "/") => {
  const normalizedPath = path === "/" ? "" : path;

  return `${siteUrl}${normalizedPath}`;
};

export const createPageMetadata = ({
  title,
  description,
  path = "/",
}: PageMetadataInput): Metadata => {
  const canonical = resolveCanonicalUrl(path);
  const fullTitle = `${title} | ${siteContent.name}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: siteContent.name,
      locale: siteContent.locale,
      type: "website",
      images: [
        {
          url: siteContent.socialImage,
          alt: siteContent.teaser.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteContent.socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const createOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteContent.name,
  url: siteContent.siteUrl,
  founder: {
    "@type": "Person",
    name: siteContent.founderName,
  },
  description: siteContent.description,
});

export const createWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteContent.name,
  url: siteContent.siteUrl,
  description: siteContent.description,
  inLanguage: "en-US",
});
