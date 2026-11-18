"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Plan } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { DrawLine } from "@/components/ui/DrawLine";
import { Magnetic } from "@/components/ui/Magnetic";

/**
 * Прайс-лист: строки вместо SaaS-карточек. Название — широким гротеском, цена — главный элемент.
 * Ключевой пакет — полоса цвета мрамора с открытым составом. Остальные раскрываются по hover / tap.
 */
export function PricingCards({ items, lang, cta, popular }: { items: Plan[]; lang: Locale; cta: string; popular: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
      <DrawLine strong />
      {items.map((p, k) => {
        const hi = !!p.highlight;
        const isOpen = hi || open === p.id;
        return (
          <div
            key={p.id}
            onMouseEnter={() => !hi && setOpen(p.id)}
            onMouseLeave={() => !hi && setOpen(null)}
            className={`group relative border-b transition-colors duration-500 ${
              hi ? "-mx-[clamp(1.25rem,4vw,4rem)] border-transparent bg-rosso px-[clamp(1.25rem,4vw,4rem)] text-warm" : "border-line hover:bg-paper-2/60"
            }`}
          >
            <button
              type="button"
              onClick={() => !hi && setOpen(isOpen ? null : p.id)}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-3 py-8 text-left lg:grid-cols-[4rem_1.4fr_1fr_auto] md:py-10"
            >
              <span className={`meta ${hi ? "text-warm/70" : "text-muted"}`}>{String(k + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-display text-2xl uppercase leading-none md:text-4xl">{t(p.name, lang)}</span>
                {hi && <span className="meta mt-3 inline-block border border-warm/50 px-2 py-1 text-warm">★ {popular}</span>}
              </span>
              <span className={`col-start-2 text-sm lg:col-start-auto ${hi ? "text-warm/75" : "text-muted"}`}>{t(p.note, lang)}</span>
              <span className="col-start-2 font-display text-4xl leading-none tracking-tight md:text-5xl lg:col-start-auto xl:text-6xl">{t(p.price, lang)}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="grid gap-6 pb-10 lg:grid-cols-[4rem_1.4fr_1fr_auto] lg:gap-x-4">
                    <span className="hidden lg:block" />
                    <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:col-span-2">
                      {p.features.map((f, i) => (
                        <li key={i} className={`flex gap-3 border-t pt-2 ${hi ? "border-warm/25" : "border-line"}`}>
                          <span className={hi ? "text-warm/70" : "text-accent"}>+</span>
                          {t(f, lang)}
                        </li>
                      ))}
                    </ul>
                    <Magnetic className="lg:justify-self-end">
                      <Link href={`/${lang}/start?plan=${p.id}`} className={`btn ${hi ? "btn-light" : "btn-solid"}`}>
                        {cta} →
                      </Link>
                    </Magnetic>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
