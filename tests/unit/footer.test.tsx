import { render, screen } from "@testing-library/react";

import { Footer } from "@/components/footer";

describe("footer", () => {
  it("renders the copyright and contact email", () => {
    render(<Footer />);

    expect(screen.getByText("Copyright Franklin Reed, 2026")).toBeVisible();
    expect(screen.getByRole("link", { name: "info@franklinreed.com" })).toHaveAttribute(
      "href",
      "mailto:info@franklinreed.com",
    );
  });
});
