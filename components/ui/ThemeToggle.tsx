"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio_theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      className={`w-9 h-9 rounded-[2px] border inline-flex items-center justify-center transition-all duration-200 ${className}`}
      style={{
        color: "var(--text-muted)",
        borderColor: "var(--border)",
        background: "var(--surface)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--gold)";
        el.style.borderColor = "var(--gold-mid)";
        el.style.background = "var(--gold-dim)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--text-muted)";
        el.style.borderColor = "var(--border)";
        el.style.background = "var(--surface)";
      }}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      {!mounted ? (
        <span className="block h-[15px] w-[15px]" aria-hidden="true" />
      ) : theme === "dark" ? (
        <Sun size={15} aria-hidden="true" />
      ) : (
        <Moon size={15} aria-hidden="true" />
      )}
    </button>
  );
}
