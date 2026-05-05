type NavigationItem = {
  label: string;
  href: string;
};

const defaultSiteUrl = "https://ari-franklin.github.io/Franklin-Reed";

export const siteContent = {
  name: "IGB",
  founderName: "Franklin Reed",
  contactEmail: "info@franklinreed.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl,
  locale: "en_US",
  description:
    "A modern editorial landing page for IGB, built around the teaser reveal and a refined launch aesthetic.",
  navigation: [] as NavigationItem[],
  teaser: {
    src: "/images/ig-teaser.png",
    alt: "Face It teaser artwork announcing that something handsome is coming.",
  },
  socialImage: "/images/ig-teaser.png",
  hero: {
    headlineLead: "Face It:",
    headlineTailTop: "Something Handsome",
    headlineTailBottom: "Is Coming.",
    primaryLink: {
      label: "About the reveal",
      href: "/about",
    },
    secondaryLink: {
      label: "Preview the direction",
      href: "#preview",
    },
  },
  promise: {
    title: "Built to feel composed before it feels loud.",
    body: "The first release leans on sharp typography, disciplined spacing, and search-friendly structure so the visual identity arrives with clarity.",
    highlights: [
      "Editorial tone grounded in the teaser palette",
      "Semantic page structure ready for discovery",
      "A small, extensible surface for future subpages",
    ],
  },
  about: {
    title: "About Franklin Reed",
    body: "This page is intentionally early, but the direction is clear: Franklin Reed is taking shape as a sharply edited brand presence with a polished, understated point of view.",
    detail:
      "The launch site is starting small so each page can carry real meaning, strong metadata, and room for the full story to arrive later without filler.",
  },
} as const;

export type SiteContent = typeof siteContent;
