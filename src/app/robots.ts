import type { MetadataRoute } from "next";
import { site } from "@/content/misc";

export default function robots(): MetadataRoute.Robots {
  // На preview-деплоях Vercel не индексируем
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return isProd
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/*/thank-you"] }], sitemap: `${site.url}/sitemap.xml` }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
