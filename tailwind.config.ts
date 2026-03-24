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
        head: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        body: ["var(--font-figtree)", "sans-serif"],
      },
      colors: {
        bg: "#080808",
        surface: "#111111",
        surface2: "#191919",
        gold: "#E8B84B",
        sage: "#5A8F7B",
        text: {
          DEFAULT: "#F0EBE0",
          muted: "#7A7570",
          dim: "#4A4740",
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
