"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Img } from "@/content/images";
import { SplitText } from "@/components/ui/SplitText";

type Item = { id: string; n: string; title: string; short: string; body: string; includes: string[]; timing: string; image: Img };

/** WHAT WE DO: заголовок + меняющееся фото слева, интерактивный список-аккордеон справа */
export function ServicesList({ items, eyebrow, title, lead, deliverables }: { items: Item[]; eyebrow: string; title: string; lead: string; deliverables: string }) {
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const active = open ?? hover;

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-10">
      <div className="min-w-0 md:col-span-5">
        <div className="md:sticky md:top-28">
          <p className="meta mb-6 text-muted">— {eyebrow}</p>
          <SplitText lines={[title]} className="h-section uppercase" />
          <p className="mt-6 max-w-sm text-muted">{lead}</p>
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden bg-paper-2 md:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image src={items[active].image.src} alt={items[active].image.alt} fill sizes="40vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="meta absolute bottom-4 left-4 z-10 bg-warm px-2.5 py-1.5 text-graphite">{items[active].n} / 0{items.length}</span>
          </div>
        </div>
      </div>

      <ul className="min-w-0 border-t border-ink md:col-span-7 md:col-start-6">
        {items.map((s, k) => {
          const isOpen = open === k;
          return (
            <li key={s.id} className="border-b border-line" onMouseEnter={() => setHover(k)}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : k)}
                aria-expanded={isOpen}
                aria-controls={`svc-${s.id}`}
                className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-3 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-4 py-7 text-left md:py-9"
              >
                <span className="meta text-muted">{s.n}</span>
                <span className={`min-w-0 break-words font-display text-[clamp(1.05rem,2.4vw,2.25rem)] uppercase leading-none transition-all duration-500 ${active === k ? "translate-x-2" : "opacity-60 group-hover:opacity-100"}`}>
                  {s.title}
                </span>
                <span className="relative mt-2 h-3.5 w-3.5 shrink-0" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-500 ${isOpen ? "rotate-90 scale-y-0" : ""}`} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`svc-${s.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-10 pl-0 sm:pl-16 md:grid-cols-2">
                      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 md:hidden">
                        <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-display text-lg font-medium">{s.short}</p>
                        <p className="mt-3 text-muted">{s.body}</p>
                      </div>
                      <div>
                        <p className="meta mb-3 text-muted">— {deliverables}</p>
                        <ul className="space-y-2 text-sm">
                          {s.includes.map((x) => (
                            <li key={x} className="flex gap-3 border-b border-line pb-2">
                              <span className="text-accent">+</span>
                              {x}
                            </li>
                          ))}
                        </ul>
                        <p className="meta mt-5 text-accent">{s.timing}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
