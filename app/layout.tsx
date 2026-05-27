import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-head",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandeep Nandi — Backend Developer",
  description:
    "Backend Developer building production-grade systems. Node.js, REST APIs, database architecture, and third-party integrations. Currently interning at MatchBest Group.",
  keywords: [
    "Sandeep Nandi",
    "Backend Developer",
    "Node.js",
    "REST API",
    "MongoDB",
    "MERN Stack",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sandeep Nandi" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Sandeep Nandi — Backend Developer",
    description:
      "Backend Developer building production-grade systems. Node.js, REST APIs, database architecture, and third-party integrations.",
    siteName: "Sandeep Nandi Portfolio",
    url:"https://sandeep-portfolio-beryl-phi.vercel.app/",
    images:"/Sandeep_opengraph.png"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Nandi — Backend Developer",
    description: "Backend Developer. Node.js | REST APIs | MongoDB | Express.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = localStorage.getItem("portfolio_theme");
                  var system = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
                  document.documentElement.dataset.theme = stored || system;
                } catch (_) {
                  document.documentElement.dataset.theme = "dark";
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
