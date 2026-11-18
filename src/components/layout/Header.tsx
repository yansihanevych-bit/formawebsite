"use client";
import Link from "next/link";
import { LangSwitch } from "./LangSwitch";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AnnounceBar } from "./AnnounceBar";
import { useIntro } from "@/lib/useIntro";

export type NavItem = { n: string; label: string; href: string; img?: string };
type Props = {
  lang: Locale;
  t: { start: string; menu: string; close: string; forWhom: string; studio: string; skip: string; light: string; dark: string };
  forWhom: NavItem[];
  studio: NavItem[];
  main: NavItem[];
  announce: string[];
  contact: { email: string; phone: string; whatsapp: string; area: string };
};

export function Header({ lang, t, forWhom, studio, main, announce, contact }: Props) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | undefined>(forWhom[0]?.img);
  const [scrolled, setScrolled] = useState(false);
  const [heroDark, setHeroDark] = useState(false);
  const [solid, setSolid] = useState(false);
  const ready = useIntro();
  const pathname = usePathname();

  // Тип шапки зависит от страницы: прозрачная светлая поверх тёмного Hero, тёмная — на светлых страницах
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- читаем разметку новой страницы после навигации
    setHeroDark(!!document.querySelector("[data-hero-dark]"));
    setSolid(!!document.querySelector("[data-header-solid]"));
  }, [pathname]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- закрыть меню при смене страницы
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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

  const panel = scrolled || solid;
  const light = heroDark && !panel;

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
      <motion.header className="fixed inset-x-0 top-0 z-50" initial={{ opacity: 0, y: -12 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
        <AnnounceBar items={announce} hidden={scrolled} />
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            panel ? "mx-2 mt-2 border border-line bg-paper/75 text-ink backdrop-blur-xl md:mx-4 md:mt-3" : light ? "border border-transparent text-white" : "border border-transparent text-ink"
          }`}
        >
          <div className={`container-x flex items-center justify-between gap-6 transition-[padding] duration-500 ${panel ? "py-3" : "py-6 md:py-7"}`}>
            <Link href={`/${lang}`} aria-label="FORMA BURO — home" className="block shrink-0">
              {/* логотип — маска цвета текста: подстраивается под тон секции и тему */}
              <span
                role="img"
                aria-label="FORMA BURO"
                className={`logo-mask block transition-[width] duration-500 ${panel ? "w-24 md:w-28" : "w-28 md:w-36"} ${light ? "text-white" : "text-ink"}`}
              />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
              {main.map((it) => {
                const active = pathname === it.href || (it.href !== `/${lang}` && pathname.startsWith(it.href));
                return it.href === "#menu" ? (
                  <button key={it.label} type="button" onClick={() => setOpen(true)} className="meta opacity-80 transition-opacity hover:opacity-100">
                    {it.label}
                  </button>
                ) : (
                  <Link key={it.href} href={it.href} aria-current={active ? "page" : undefined} className={`meta relative py-1 transition-opacity hover:opacity-100 ${active ? "opacity-100" : "opacity-80"}`}>
                    {it.label}
                    <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0"}`} />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <ThemeToggle labels={{ light: t.light, dark: t.dark }} />
              <LangSwitch lang={lang} href={swap} light={light} />
              <Link
                href={`/${lang}/start`}
                onClick={() => track("cta_click", { position: "header" })}
                className={`meta group hidden items-center gap-2.5 px-4 py-2.5 transition-colors md:inline-flex ${
                  light ? "bg-warm text-graphite hover:bg-white" : "bg-ink text-paper hover:bg-ink-2"
                }`}
              >
                {t.start}
                <svg viewBox="0 0 12 12" className="h-2 w-2 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M1 11L11 1M3 1h8v8" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="site-menu"
                className={`meta group flex items-center gap-2.5 border px-3 py-2 transition-colors ${light ? "border-white/40 hover:bg-white hover:text-black" : "border-current/30 hover:bg-ink hover:text-paper"}`}
              >
                <span className="h-2 w-2 bg-accent transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                {t.menu}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto bg-rosso text-warm"
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
                  <p className="eyebrow mb-6 text-warm/75">{t.forWhom}</p>
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
                          <span className="eyebrow w-8 text-[0.65rem] text-warm/75">{it.n}</span>
                          <span className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-normal leading-[1.1] transition-colors group-hover:text-sand">
                            {it.label}
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <p className="eyebrow mb-5 mt-12 text-warm/75">{t.studio}</p>
                  <ul className="flex flex-wrap gap-x-8 gap-y-3">
                    {studio.map((it) => (
                      <li key={it.href}>
                        <Link href={it.href} className="link-u font-display text-xl font-normal md:text-2xl">
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

              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6 text-sm text-warm/85">
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
