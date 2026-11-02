import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { SignupModal } from "@/components/signup/signup-modal";
import { canShowSignup, dismissSignup } from "@/lib/signup-preferences";

describe("Brevo signup modal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
    };
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });
  function open() {
    render(<SignupModal />);
    act(() => vi.advanceTimersByTime(2000));
    return screen.getByRole("dialog");
  }
  function message(
    event: string,
    source: Window | null,
    origin = window.location.origin,
    height = 320,
  ) {
    fireEvent(
      window,
      new MessageEvent("message", {
        source,
        origin,
        data: { type: "fr-brevo", event, height },
      }),
    );
  }
  it("opens after two seconds with the native Brevo form", () => {
    render(<SignupModal />);
    act(() => vi.advanceTimersByTime(1999));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(
      screen.getByRole("dialog", { name: /confidence is coming/i }),
    ).toBeInTheDocument();
    expect(screen.getByTitle("Franklin Reed email signup")).toHaveAttribute(
      "src",
      "/signup/brevo.html",
    );
    expect(screen.queryByText(/preview only/i)).not.toBeInTheDocument();
  });
  it("remembers close-button dismissal", () => {
    open();
    fireEvent.click(screen.getByRole("button", { name: "Close signup" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(canShowSignup(localStorage)).toBe(false);
  });
  it("handles Escape cancellation and backdrop", () => {
    const dialog = open();
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("does not close on panel clicks", () => {
    const dialog = open();
    fireEvent.click(screen.getByText("Franklin Reed"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(dialog);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("does not open for recently dismissed visitors", () => {
    dismissSignup(localStorage);
    render(<SignupModal />);
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("waits until a hidden tab is visible", () => {
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    render(<SignupModal />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    fireEvent(document, new Event("visibilitychange"));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
  it("accepts acknowledgement only from its own same-origin frame", () => {
    open();
    const frame = screen.getByTitle(
      "Franklin Reed email signup",
    ) as HTMLIFrameElement;
    message("confirmation-requested", window);
    message(
      "confirmation-requested",
      frame.contentWindow,
      "https://attacker.example",
    );
    expect(canShowSignup(localStorage)).toBe(true);
    message("confirmation-requested", frame.contentWindow);
    expect(canShowSignup(localStorage)).toBe(false);
  });
  it("resizes within limits and ignores malformed sizes", () => {
    open();
    const frame = screen.getByTitle(
      "Franklin Reed email signup",
    ) as HTMLIFrameElement;
    message("resize", frame.contentWindow, window.location.origin, 420);
    expect(frame).toHaveStyle({ height: "420px" });
    message("resize", frame.contentWindow, window.location.origin, 9999);
    expect(frame).toHaveStyle({ height: "720px" });
    message("resize", frame.contentWindow, window.location.origin, Number.NaN);
    expect(frame).toHaveStyle({ height: "720px" });
  });
  it("accepts Escape from inside the embedded form", () => {
    open();
    const frame = screen.getByTitle(
      "Franklin Reed email signup",
    ) as HTMLIFrameElement;
    message("escape", frame.contentWindow);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
