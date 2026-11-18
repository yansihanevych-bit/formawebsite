"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

/** Компактный переключатель шести языков: текущий код + выпадающий список */
export function LangSwitch({ lang, href, light }: { lang: Locale; href: (l: Locale) => string; light: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${localeNames[lang]}`}
        className="meta flex items-center gap-1.5 py-2"
      >
        {lang.toUpperCase()}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute right-0 top-full z-50 mt-2 w-48 border py-2 shadow-xl ${light ? "border-white/20 bg-graphite text-warm" : "border-line bg-paper text-ink"}`}
          >
            {locales.map((l) => (
              <li key={l} role="option" aria-selected={l === lang}>
                <Link
                  href={href(l)}
                  hrefLang={l}
                  onClick={() => {
                    document.cookie = `fb_locale=${l}; Path=/; Max-Age=31536000; SameSite=Lax`;
                    setOpen(false);
                  }}
                  className={`flex items-baseline justify-between px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-white ${l === lang ? "text-accent" : ""}`}
                >
                  <span>{localeNames[l]}</span>
                  <span className="meta opacity-60">{l.toUpperCase()}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
