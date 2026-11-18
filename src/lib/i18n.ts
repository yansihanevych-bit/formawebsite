export const locales = ["it", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

/** Двуязычная строка контента. Структура совместима с будущей миграцией в Sanity (поля it/en). */
export type L = { it: string; en: string; ru: string };
export const t = (v: L, locale: Locale) => v[locale] ?? v.en ?? v.it;

export const localeNames: Record<Locale, string> = { it: "Italiano", en: "English", ru: "Русский" };
export const ogLocale: Record<Locale, string> = { it: "it_IT", en: "en_GB", ru: "ru_RU" };
