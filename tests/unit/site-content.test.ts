import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";
import { siteContent } from "@/content/site";

describe("site content", () => {
  it("defines the core brand and teaser copy", () => {
    expect(siteContent.name).toBe("IGB");
    expect(siteContent.hero.headlineLead).toBe("Face It:");
    expect(siteContent.hero.headlineTailTop).toBe("Something Handsome");
    expect(siteContent.hero.headlineTailBottom).toBe("Is Coming.");
    expect(siteContent.teaser.alt).toContain("Face It");
    expect(siteContent.navigation.some((item) => item.href === "/about")).toBe(
      true,
    );
  });

  it("builds page metadata from shared defaults", () => {
    const metadata = createPageMetadata({
      title: "About",
      description: "Learn more about IGB.",
      path: "/about",
    });

    expect(metadata.title).toBe("About | IGB");
    expect(metadata.description).toBe("Learn more about IGB.");
    expect(metadata.alternates).toMatchObject({
      canonical: "https://igb.example/about",
    });

    const openGraph = metadata.openGraph as Metadata["openGraph"];
    expect(openGraph?.title).toBe("About | IGB");
  });
});
