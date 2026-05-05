import { render, screen } from "@testing-library/react";

import AboutPage from "@/app/about/page";

describe("about page", () => {
  it("renders a placeholder page with clear brand context", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /about franklin reed/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/this page is intentionally early/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Franklin Reed" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
