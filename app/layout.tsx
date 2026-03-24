import type { Metadata } from "next";
import { Syne, DM_Mono, Figtree } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
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
    <html lang="en" className={`${syne.variable} ${dmMono.variable} ${figtree.variable}`}>
      <body className="bg-bg text-text font-body antialiased">{children}</body>
    </html>
  );
}
