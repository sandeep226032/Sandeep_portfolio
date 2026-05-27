
"use client";

import { useState, useEffect } from "react";

const COOKIE_KEY = "cookie_consent_analytics";

export default function CookieConsent({ onConsent }: { onConsent?: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "granted");
    setVisible(false);
    if (onConsent) onConsent();
  };

  if (!visible) return null;

  return (
    <div
      className="fixed left-4 right-4 bottom-4 z-[1000] mx-auto max-w-[720px] rounded-[4px] border px-5 py-4 text-center shadow-2xl sm:flex sm:items-center sm:justify-between sm:gap-5 sm:text-left"
      style={{
        background: "var(--surface)",
        color: "var(--text-muted)",
        borderColor: "var(--border-hover)",
      }}
    >
      <span className="text-[0.86rem] leading-[1.6]">
        This site uses cookies for analytics. By continuing, you consent to
        tracking as described in our privacy policy.
      </span>
      <button
        onClick={handleAccept}
        className="mt-4 w-full rounded-[2px] px-5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] transition-opacity hover:opacity-90 sm:mt-0 sm:w-auto"
        style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
      >
        Accept
      </button>
    </div>
  );
}
