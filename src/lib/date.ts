import type { Locale } from "./i18n";

export const fmtDate = (iso: string, lang: Locale) =>
  new Date(iso).toLocaleDateString(lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "it-IT", { day: "2-digit", month: "short", year: "numeric" });
