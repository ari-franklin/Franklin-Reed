"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  canShowSignup,
  dismissSignup,
  markSubscribed,
} from "@/lib/signup-preferences";
import { brevoFormUrl } from "@/content/brevo";
import { siteContent } from "@/content/site";
import styles from "./signup-modal.module.css";

export function SignupModal() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(300);
  const basePath = new URL(siteContent.siteUrl).pathname.replace(/\/$/, "");
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    function schedule() {
      clearTimeout(timer);
      if (document.visibilityState !== "visible") return;
      timer = setTimeout(() => {
        let eligible = true;
        try {
          eligible = canShowSignup(window.localStorage);
        } catch {
          /* Storage can be unavailable. */
        }
        if (eligible) setOpen(true);
      }, 2000);
    }
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    headingRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (
        previousFocus instanceof HTMLElement &&
        previousFocus !== document.body
      ) {
        previousFocus.focus();
      } else {
        const main = document.querySelector("main");
        if (main) {
          const oldTabIndex = main.getAttribute("tabindex");
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          if (oldTabIndex === null) main.removeAttribute("tabindex");
          else main.setAttribute("tabindex", oldTabIndex);
        }
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function receive(event: MessageEvent) {
      if (
        event.origin !== window.location.origin ||
        !frameRef.current?.contentWindow ||
        event.source !== frameRef.current.contentWindow
      )
        return;
      const data: unknown = event.data;
      if (
        !data ||
        typeof data !== "object" ||
        !("type" in data) ||
        data.type !== "fr-brevo" ||
        !("event" in data)
      )
        return;
      if (
        data.event === "resize" &&
        "height" in data &&
        typeof data.height === "number" &&
        Number.isFinite(data.height)
      ) {
        setFrameHeight(Math.min(720, Math.max(260, Math.ceil(data.height))));
      }
      if (data.event === "confirmation-requested") {
        try {
          markSubscribed(window.localStorage);
        } catch {
          /* Preferences are optional. */
        }
      }
      if (data.event === "escape") {
        try {
          dismissSignup(window.localStorage);
        } catch {
          /* Closing works without storage. */
        }
        setOpen(false);
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [open]);

  function dismiss() {
    try {
      dismissSignup(window.localStorage);
    } catch {
      /* Dismissal still works without storage. */
    }
    setOpen(false);
  }

  if (!open) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="signup-heading"
      aria-describedby="signup-description"
      onCancel={(event) => {
        event.preventDefault();
        dismiss();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dismiss();
      }}
    >
      <div className={styles.panel}>
        <button
          className={styles.close}
          type="button"
          aria-label="Close signup"
          onClick={dismiss}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <path
              d="M2 2 24 24M24 2 2 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <p className={styles.brand}>Franklin Reed</p>
        <h2
          id="signup-heading"
          className={styles.headline}
          ref={headingRef}
          tabIndex={-1}
        >
          Confidence
          <br /> is coming.
        </h2>
        <p id="signup-description" className={styles.description}>
          Look Good. Feel Good.
          <br /> Do Good Things.
        </p>
        <iframe
          ref={frameRef}
          className={styles.brevoFrame}
          src={`${basePath}/signup/brevo.html`}
          title="Franklin Reed email signup"
          style={{ height: frameHeight }}
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <p className={styles.expectation}>
          Sign up for Franklin Reed launch news and updates.
        </p>
        <p className={styles.fallback}>
          Form not loading?{" "}
          <a href={brevoFormUrl} target="_blank" rel="noopener noreferrer">
            Open the signup form
          </a>
          .
        </p>
      </div>
    </dialog>,
    document.body,
  );
}
