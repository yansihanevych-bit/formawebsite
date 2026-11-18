import uk from "@/dictionaries/tr/uk.json";
import pl from "@/dictionaries/tr/pl.json";
import de from "@/dictionaries/tr/de.json";

/** Порядок = порядок в переключателе. Английская версия — основная для дизайна и контента. */
export const locales = ["en", "it", "ru", "uk", "pl", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

/** Строка контента: it/en/ru пишутся в исходниках, uk/pl/de — через словари переводов по английскому тексту. */
export type L = { it: string; en: string; ru: string };

/** Переводы с английского для языков без собственных полей в контенте */
export const TR: Partial<Record<Locale, Record<string, string>>> = { uk, pl, de };

/** Перевод английской строки на язык; если перевода нет — английский */
export const tr = (en: string, locale: Locale) => TR[locale]?.[en] ?? en;

export const t = (v: L, locale: Locale) => (locale === "it" || locale === "en" || locale === "ru" ? v[locale] : tr(v.en, locale));

/** Выбор строки в коде: x(it, en, ru) с автопереводом английского для uk/pl/de */
export const pick = (locale: Locale, it: string, en: string, ru: string) => t({ it, en, ru }, locale);

export const localeNames: Record<Locale, string> = { en: "English", it: "Italiano", ru: "Русский", uk: "Українська", pl: "Polski", de: "Deutsch" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", it: "it_IT", ru: "ru_RU", uk: "uk_UA", pl: "pl_PL", de: "de_DE" };
export const bcp47: Record<Locale, string> = { en: "en-GB", it: "it-IT", ru: "ru-RU", uk: "uk-UA", pl: "pl-PL", de: "de-DE" };
