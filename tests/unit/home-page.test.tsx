import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

vi.mock("@/components/signup/signup-modal", () => ({
  SignupModal: () => <div data-testid="signup-modal" />,
}));

describe("home page", () => {
  it("includes the signup modal in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    try {
      render(<HomePage />);
      expect(screen.getByTestId("signup-modal")).toBeInTheDocument();
    } finally {
      vi.unstubAllEnvs();
    }
  });
  it("renders the centered landing hero without the teaser image", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(screen.getByRole("link", { name: "Franklin Reed" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(heading).toBeInTheDocument();
    expect(heading.closest(".hero-section")).toBeInTheDocument();
    expect(heading.parentElement).toHaveClass("hero-section__copy");
    expect(screen.getByText("Face It:")).toBeInTheDocument();
    expect(screen.getByText("Confidence")).toBeInTheDocument();
    expect(screen.getByText("Starts Here.")).toBeInTheDocument();
    expect(screen.queryByText("Something Handsome")).not.toBeInTheDocument();
    expect(screen.queryByText("Is Coming.")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /about the reveal/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/built to feel composed before it feels loud/i),
    ).not.toBeInTheDocument();
  });
});
