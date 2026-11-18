import type { Metadata } from "next";
import { locales, ogLocale, type Locale } from "./i18n";
import { site } from "@/content/misc";

/** canonical + hreflang для пути без префикса языка, напр. "/projects" */
export function alternates(lang: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  locales.forEach((l) => (languages[l] = `${site.url}/${l}${path}`));
  languages["x-default"] = `${site.url}/it${path}`;
  return { canonical: `${site.url}/${lang}${path}`, languages };
}

export function pageMeta(lang: Locale, path: string, title: string, description: string, image?: string): Metadata {
  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title,
      description,
      url: `${site.url}/${lang}${path}`,
      siteName: "FORMA BURO",
      locale: ogLocale[lang],
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
  };
}

/** Для <img> вне next/image (меню, OG): уменьшенная копия через оптимизатор Next.js (w — из стандартного набора: 640…3840) */
export const sized = (src: string, w: 640 | 750 | 828 | 1080 | 1200 | 1920 = 1200) => (src.startsWith("/") ? `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75` : src);
