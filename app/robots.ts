import { MetadataRoute } from "next";

/**
 * Auto-generated robots.txt
 * Access at: https://yourdomain.com/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sandeep-nandi.vercel.app"; // ← replace with your domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
