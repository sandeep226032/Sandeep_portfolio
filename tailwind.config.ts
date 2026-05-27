import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        head: ["var(--font-head)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface2)",
        accent: "var(--accent)",
        gold: "var(--gold)",
        sage: "var(--sage)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite alternate",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        drift: {
          from: { transform: "translate(0, 0) scale(1)" },
          to: { transform: "translate(-30px, 40px) scale(1.05)" },
        },
        scrollPulse: {
          "0%,100%": { opacity: "0.3", transform: "scaleY(1)" },
          "50%": { opacity: "1", transform: "scaleY(0.6) translateY(20px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
