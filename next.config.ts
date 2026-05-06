import type { NextConfig } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.franklinreed.com";
const sitePathname = new URL(siteUrl).pathname.replace(/\/$/, "");
const basePath = sitePathname === "/" ? "" : sitePathname;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
