import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true, // 404 для несуществующих адресов: src/app/global-not-found.tsx
  },
  images: {
    qualities: [60, 75, 85],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Временные тематические заглушки (Unsplash). Удалить после замены на реальные фото / Sanity CDN.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**", search: "" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
