import { render, screen } from "@testing-library/react";

import HomePage from "@/app/page";

describe("home page", () => {
  it("renders the centered landing hero without the teaser image", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "Franklin Reed" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Face It:")).toBeInTheDocument();
    expect(screen.getByText("Something Handsome")).toBeInTheDocument();
    expect(screen.getByText("Is Coming.")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /about the reveal/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/built to feel composed before it feels loud/i),
    ).not.toBeInTheDocument();
  });
});
