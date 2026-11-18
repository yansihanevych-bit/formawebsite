import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { segments } from "@/content/segments";
import { projects } from "@/content/projects";
import { site } from "@/content/misc";
import { articles } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...segments.map((s) => `/${s.slug}`), "/projects", ...projects.map((p) => `/projects/${p.slug}`), "/studio", "/contact", "/journal", ...articles.map((a) => `/journal/${a.slug}`), "/films", "/pricing", "/calculator", "/faq", "/start", "/privacy", "/cookies"];
  return paths.map((p) => ({
    url: `${site.url}/it${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/start" ? 0.9 : 0.7,
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${p}`])) },
  }));
}
