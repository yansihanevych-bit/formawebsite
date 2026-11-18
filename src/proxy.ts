import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n";

function pickLocale(req: NextRequest) {
  const saved = req.cookies.get("fb_locale")?.value;
  if (saved && (locales as readonly string[]).includes(saved)) return saved;
  const al = (req.headers.get("accept-language") || "").toLowerCase();
  // Рынок — Италия: итальянский по умолчанию, английский только если браузер явно не итальянский
  const first = al.split(",")[0];
  if (al && !al.startsWith("it")) {
    if (/^(ru|uk|be|kk)/.test(first)) return "ru";
    if (first.startsWith("en")) return "en";
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
