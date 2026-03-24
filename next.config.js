/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for catching potential issues early
  reactStrictMode: true,

  // Image optimisation — add domains here if you use external image URLs
  images: {
    remotePatterns: [
      // Example: add your GitHub avatar domain if you use it
      // { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;