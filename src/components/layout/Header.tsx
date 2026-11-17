"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export type NavItem = { n: string; label: string; href: string; img?: string };
type Props = {
  lang: Locale;
  t: { start: string; menu: string; close: string; forWhom: string; studio: string; skip: string };
  forWhom: NavItem[];
  studio: NavItem[];
  contact: { email: string; phone: string; whatsapp: string; area: string };
};

export function Header({ lang, t, forWhom, studio, contact }: Props) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | undefined>(forWhom[0]?.img);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/set-state-in-effect -- закрыть меню при смене страницы
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const swap = (l: Locale) => {
    const parts = pathname.split("/");
    parts[1] = l;
    return parts.join("/") || `/${l}`;
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2">
        {t.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-white mix-blend-difference transition-[padding] duration-500 ${scrolled ? "py-4" : "py-6 md:py-8"}`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href={`/${lang}`} aria-label="FORMA BURO — home" className="block shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/wordmark-white.svg" alt="FORMA BURO" className={`h-auto transition-[width] duration-500 ${scrolled ? "w-28 md:w-32" : "w-32 md:w-40"}`} />
          </Link>
          <div className="flex items-center gap-5 md:gap-8">
            <nav aria-label="Language" className="eyebrow flex gap-3 text-[0.68rem]">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={swap(l)}
                  hrefLang={l}
                  onClick={() => (document.cookie = `fb_locale=${l}; Path=/; Max-Age=31536000; SameSite=Lax`)}
                  className={l === lang ? "opacity-100" : "opacity-45 hover:opacity-100"}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </nav>
            <Link
              href={`/${lang}/start`}
              onClick={() => track("cta_click", { position: "header" })}
              className="eyebrow hidden border border-white/70 px-4 py-2.5 text-[0.68rem] transition hover:bg-white hover:text-black md:inline-block"
            >
              {t.start}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="eyebrow group flex items-center gap-3 text-[0.68rem]"
            >
              <span className="hidden sm:inline">{t.menu}</span>
              <span className="flex w-7 flex-col gap-[6px]" aria-hidden>
                <span className="h-px w-full bg-current transition-all group-hover:w-4/5" />
                <span className="h-px w-3/5 bg-current transition-all group-hover:w-full" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex min-h-full flex-col py-6 md:py-8">
              <div className="flex items-center justify-between">
                <Link href={`/${lang}`} aria-label="FORMA BURO — home">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/brand/wordmark-white.svg" alt="FORMA BURO" className="w-32 md:w-40" />
                </Link>
                <button type="button" onClick={() => setOpen(false)} className="eyebrow flex items-center gap-3 text-[0.68rem]">
                  {t.close}
                  <span className="relative block h-5 w-5" aria-hidden>
                    <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <div className="grid flex-1 gap-12 py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-7 lg:col-span-6">
                  <p className="eyebrow mb-6 text-stone">{t.forWhom}</p>
                  <ul className="space-y-1">
                    {forWhom.map((it, i) => (
                      <motion.li
                        key={it.href}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={it.href}
                          onMouseEnter={() => setHover(it.img)}
                          onFocus={() => setHover(it.img)}
                          className="group flex items-baseline gap-5 py-1"
                        >
                          <span className="eyebrow w-8 text-[0.65rem] text-stone">{it.n}</span>
                          <span className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-light leading-[1.1] transition-colors group-hover:text-ochre">
                            {it.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="eyebrow mb-5 mt-12 text-stone">{t.studio}</p>
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {studio.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="link-u font-display text-xl font-light md:text-2xl">
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative hidden md:col-span-5 md:block lg:col-span-6">
                  <AnimatePresence mode="popLayout">
                    {hover && (
                      <motion.div
                        key={hover}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={hover} alt="" className="h-full w-full object-cover" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6 text-sm text-paper/70">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <a href={`mailto:${contact.email}`} className="link-u">{contact.email}</a>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="link-u">{contact.phone}</a>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener" className="link-u">WhatsApp</a>
                </div>
                <span className="eyebrow text-[0.65rem]">{contact.area}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
