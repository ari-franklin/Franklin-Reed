import type { MetadataRoute } from "next";

import { siteContent } from "@/content/site";
import { resolveCanonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

const currentDate = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: resolveCanonicalUrl("/"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: resolveCanonicalUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
