import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.GITHUB_PAGES === "true";
const repoName = "Franklin-Reed";
const basePath = isGithubPages ? `/${repoName}` : "";

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
