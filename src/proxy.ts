import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

function pickLocale(req: NextRequest) {
  const saved = req.cookies.get("fb_locale")?.value;
  if (saved && (locales as readonly string[]).includes(saved)) return saved;
  // первый язык браузера, который у нас есть; иначе — английский (основная версия)
  const langs = (req.headers.get("accept-language") || "")
    .toLowerCase()
    .split(",")
    .map((x) => x.split(";")[0].trim().slice(0, 2));
  for (const l of langs) {
    if ((locales as readonly string[]).includes(l)) return l;
    if (l === "be" || l === "kk") return "ru";
  }
  return defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const has = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (has) return;
  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|brand|favicon|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
