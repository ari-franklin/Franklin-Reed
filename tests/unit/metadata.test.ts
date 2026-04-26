import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("allows crawling and includes the about page in the sitemap", async () => {
    const robotsConfig = robots();
    const sitemapEntries = await sitemap();

    expect(robotsConfig.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
    });
    expect(sitemapEntries.some((entry) => entry.url.endsWith("/about"))).toBe(
      true,
    );
  });
});
