"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Img } from "@/content/images";
import { SWATCH } from "@/lib/swatch";

type Item = { id: string; n: string; title: string; short: string; body: string; includes: string[]; timing: string; image: Img };

const EASE = [0.16, 1, 0.3, 1] as const;

function Details({ it, deliverables, line }: { it: Item; deliverables: string; line: string }) {
  return (
    <>
      <p className="font-display text-lg uppercase leading-tight md:text-xl">{it.short}</p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-80 md:text-base">{it.body}</p>
      <p className="meta mt-8 opacity-60">{deliverables}</p>
      <ul className={`mt-3 border-t ${line}`}>
        {it.includes.map((x) => (
          <li key={x} className={`flex items-baseline gap-3 border-b ${line} py-2.5 text-sm`}>
            <span aria-hidden>+</span>
            {x}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * «Что мы делаем» цветными композициями.
 * Десктоп: пять вертикальных панелей, активная раскрывается по ширине (hover / фокус / клик).
 * Мобильный: цветные блоки-аккордеон.
 */
export function ServicesBlocks({ items, deliverables }: { items: Item[]; deliverables: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <>
      {/* десктоп */}
      <div className="hidden h-[min(82vh,760px)] min-h-[600px] gap-2 lg:flex">
        {items.map((it, k) => {
          const on = k === active;
          const s = SWATCH[k % SWATCH.length];
          return (
            <motion.div
              key={it.id}
              layout={!reduce}
              onMouseEnter={() => setActive(k)}
              onFocus={() => setActive(k)}
              onClick={() => setActive(k)}
              tabIndex={0}
              role="button"
              aria-expanded={on}
              data-cursor={on ? undefined : "Explore"}
              className={`relative min-w-0 cursor-pointer overflow-hidden outline-none ${s.bg} ${s.fg} focus-visible:ring-2 focus-visible:ring-accent`}
              style={{ flex: on ? 5.2 : 1 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {/* номер и время — всегда сверху */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
                <span className="h-numeral text-5xl leading-none">{it.n}</span>
                {on && <span className="meta opacity-70">{it.timing}</span>}
              </div>

              {/* свёрнутая панель: вертикальное название */}
              <AnimatePresence>
                {!on && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.35 } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-6 p-6"
                  >
                    <span className="font-display text-xl uppercase leading-none [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">{it.title}</span>
                    <span className="text-2xl leading-none" aria-hidden>+</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* раскрытая панель */}
              <AnimatePresence>
                {on && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6, ease: EASE } }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    className="absolute inset-0 grid grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-8 p-6 pt-24 xl:gap-12 xl:p-10 xl:pt-28"
                  >
                    <div className="flex min-w-0 flex-col">
                      <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.9rem)] uppercase leading-[0.95]">{it.title}</h3>
                      <div className="mt-auto">
                        <Details it={it} deliverables={deliverables} line={s.line} />
                      </div>
                    </div>
                    <motion.div
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)", transition: { delay: 0.35, duration: 1, ease: [0.76, 0, 0.24, 1] } }}
                      className="relative min-h-0 overflow-hidden"
                    >
                      <Image src={it.image.src} alt={it.image.alt} fill sizes="35vw" className="object-cover" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* мобильный и планшет */}
      <div className="grid gap-2 lg:hidden">
        {items.map((it, k) => {
          const on = open === k;
          const s = SWATCH[k % SWATCH.length];
          return (
            <div key={it.id} className={`${s.bg} ${s.fg}`}>
              <button
                type="button"
                onClick={() => setOpen(on ? null : k)}
                aria-expanded={on}
                aria-controls={`svcb-${it.id}`}
                className="grid w-full grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 p-5 text-left sm:p-6"
              >
                <span className="h-numeral text-3xl leading-none">{it.n}</span>
                <span className="min-w-0 font-display text-[clamp(1.05rem,4.6vw,1.6rem)] uppercase leading-tight">{it.title}</span>
                <span className={`text-2xl leading-none transition-transform duration-500 ${on ? "rotate-45" : ""}`} aria-hidden>+</span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    id={`svcb-${it.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-7 sm:px-6">
                      <div className="relative mb-6 aspect-[16/10] overflow-hidden">
                        <Image src={it.image.src} alt={it.image.alt} fill sizes="100vw" className="object-cover" />
                        <span className="meta absolute bottom-3 right-3 bg-graphite/80 px-2.5 py-1.5 text-warm">{it.timing}</span>
                      </div>
                      <Details it={it} deliverables={deliverables} line={s.line} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
