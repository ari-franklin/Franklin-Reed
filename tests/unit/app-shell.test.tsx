import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("app shell", () => {
  it("renders the main landmark and primary heading", () => {
    render(<HomePage />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
