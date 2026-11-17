import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";
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
      locale: lang === "it" ? "it_IT" : "en_GB",
      type: "website",
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
  };
}

/** Удобно для <img> вне next/image (меню, OG): ресайз через параметры Unsplash */
export const sized = (src: string, w = 1200) => (src.includes("unsplash") ? `${src}?w=${w}&q=70&auto=format&fit=crop` : src);
