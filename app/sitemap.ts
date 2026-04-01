import { MetadataRoute } from "next";

/**
 * Auto-generated sitemap.xml
 * Update `baseUrl` after deploying.
 * Access at: https://yourdomain.com/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sandeep-nandi.vercel.app"; // ← replace with your domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
