import {
  canShowSignup,
  dismissSignup,
  markSubscribed,
} from "@/lib/signup-preferences";

describe("signup preferences", () => {
  const now = Date.UTC(2026, 9, 29);
  beforeEach(() => localStorage.clear());
  it("shows for a new visitor", () =>
    expect(canShowSignup(localStorage, now)).toBe(true));
  it("remembers dismissal for exactly 30 days", () => {
    dismissSignup(localStorage, now);
    expect(canShowSignup(localStorage, now + 30 * 86400000 - 1)).toBe(false);
    expect(canShowSignup(localStorage, now + 30 * 86400000)).toBe(true);
  });
  it("suppresses a subscribed browser", () => {
    markSubscribed(localStorage);
    expect(canShowSignup(localStorage, now)).toBe(false);
  });
  it.each([
    "broken",
    "{}",
    '{"dismissedAt":"bad"}',
    '{"dismissedAt":-1}',
    '{"dismissedAt":9999999999999}',
  ])("recovers from invalid state: %s", (value) => {
    localStorage.setItem("fr-signup-v1", value);
    expect(canShowSignup(localStorage, now)).toBe(true);
  });
  it("tolerates unavailable storage", () => {
    const storage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };
    expect(canShowSignup(storage, now)).toBe(true);
    expect(() => dismissSignup(storage, now)).not.toThrow();
    expect(() => markSubscribed(storage)).not.toThrow();
  });
});
