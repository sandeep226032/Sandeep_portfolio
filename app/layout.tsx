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
  metadataBase: new URL("https://www.sandeepnandi.dev"),
  title: "Sandeep Nandi - Backend & AI Engineer",
  description:
    "Backend and AI engineer building scalable APIs, RAG systems, authentication workflows, and production-grade applications.",
  keywords: [
    "Sandeep Nandi",
    "Backend Developer",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Node.js",
    "Express.js",
    "FastAPI",
    "REST API",
    "LangChain",
    "RAG",
    "Vector Databases",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "MERN Stack",
    "Portfolio",
  ],
  authors: [{ name: "Sandeep Nandi" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Sandeep Nandi - Backend & AI Engineer",
    description:
      "Backend and AI engineer building scalable APIs, RAG systems, authentication workflows, and production-grade applications.",
    siteName: "Sandeep Nandi Portfolio",
    url: "https://www.sandeepnandi.dev/",
    images: "/Sandeep_opengraph.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandeep Nandi - Backend & AI Engineer",
    description: "Backend Developer building APIs, AI systems, and production-ready applications.",
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
                document.documentElement.dataset.theme = "dark";
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
