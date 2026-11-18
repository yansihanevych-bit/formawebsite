import { bcp47, type Locale } from "./i18n";

export const fmtDate = (iso: string, lang: Locale) =>
  new Date(iso).toLocaleDateString(bcp47[lang], { day: "2-digit", month: "short", year: "numeric" });
