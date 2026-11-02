import { readFileSync } from "node:fs";

describe("Brevo native embed", () => {
  function document() {
    return new DOMParser().parseFromString(
      readFileSync("public/signup/brevo.html", "utf8"),
      "text/html",
    );
  }
  it("retains Brevo submission, CAPTCHA and spam-check fields", () => {
    const doc = document();
    expect(doc.querySelector("form")?.getAttribute("action")).toMatch(
      /^https:\/\/7ed29092\.sibforms\.com\/serve\//,
    );
    expect(doc.querySelector('input[name="EMAIL"]')?.getAttribute("type")).toBe(
      "email",
    );
    expect(
      doc.querySelector('input[name="email_address_check"]'),
    ).not.toBeNull();
    expect(
      doc.querySelector(".g-recaptcha-v3")?.getAttribute("data-sitekey"),
    ).toBe("6Ld0Cg0uAAAAAK_TGmy8o-LNBsJu6B2qw8rKVM3e");
    expect(
      doc.querySelector(
        'script[src="https://sibforms.com/forms/end-form/build/main.js"]',
      ),
    ).not.toBeNull();
    expect(
      Array.from(doc.querySelectorAll("script")).map((script) =>
        script.getAttribute("src"),
      ),
    ).toContain(
      "https://www.google.com/recaptcha/api.js?render=6Ld0Cg0uAAAAAK_TGmy8o-LNBsJu6B2qw8rKVM3e&hl=en",
    );
  });
  it("removes the obsolete checkbox integration", () => {
    const doc = document();
    expect(doc.querySelector("#sib-captcha")).toBeNull();
    expect(doc.querySelector(".sib-visible-recaptcha")).toBeNull();
  });
  it("keeps truthful confirmation messaging and accessible branding", () => {
    const doc = document();
    expect(doc.querySelector("#success-message")?.textContent).toContain(
      "Check your inbox!",
    );
    expect(doc.querySelector('button[type="submit"]')?.textContent).toContain(
      "Count Us In",
    );
    expect(doc.querySelector('label[for="EMAIL"]')?.textContent).toContain(
      "Your email address",
    );
    expect(doc.title).toContain("Franklin Reed");
    expect(
      doc.querySelector('input[name="locale"]')?.getAttribute("value"),
    ).toBe("en");
  });
});
