"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { processSteps } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/**
 * How it works.
 * Десктоп: sticky-секция, горизонтальная линия, активный этап подсвечивается по скроллу, фото меняется.
 * Мобильный: вертикальный timeline.
 */
export function Process({ lang, eyebrow, title }: { lang: Locale; eyebrow: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = processSteps.length;
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n * 0.999))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Desktop */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 55}vh` }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center">
          <div className="container-x">
            <div className="mb-12 flex items-end justify-between gap-10">
              <div>
                <p className="meta mb-5 text-muted">— {eyebrow}</p>
                <h2 className="h-section uppercase">{title}</h2>
              </div>
              <p className="meta tabular-nums text-muted">
                0{active + 1} / 0{n}
              </p>
            </div>

            <div className="grid grid-cols-12 items-center gap-10">
              <div className="relative col-span-7 aspect-[16/10] overflow-hidden bg-paper-2">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.4 } }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={processSteps[active].image.src} alt={processSteps[active].image.alt} fill sizes="58vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="col-span-4 col-start-9">
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                    <p className="meta text-accent">{t(processSteps[active].time, lang)}</p>
                    <h3 className="mt-4 font-display text-5xl font-medium tracking-tight">{t(processSteps[active].title, lang)}</h3>
                    <p className="mt-5 text-lg text-muted">{t(processSteps[active].text, lang)}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* линия этапов */}
            <div className="relative mt-14">
              <div className="absolute left-0 right-0 top-[5px] h-px bg-line" />
              <motion.div className="absolute left-0 top-[5px] h-px bg-ink" style={{ width: bar }} />
              <ol className="relative grid grid-cols-5">
                {processSteps.map((s, k) => (
                  <li key={k} className={`transition-opacity duration-500 ${k <= active ? "opacity-100" : "opacity-40"}`}>
                    <span className={`block h-[11px] w-[11px] rounded-full border border-ink transition-colors duration-500 ${k <= active ? "bg-ink" : "bg-paper"}`} />
                    <p className="meta mt-4">
                      0{k + 1} — {t(s.title, lang)}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="container-x py-24 lg:hidden">
        <p className="meta mb-5 text-muted">— {eyebrow}</p>
        <h2 className="h-section mb-12 uppercase">{title}</h2>
        <ol className="relative border-l border-line pl-8">
          {processSteps.map((s, k) => (
            <Reveal as="li" key={k} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[38px] top-1 h-[11px] w-[11px] rounded-full border border-ink bg-ink" />
              <p className="meta text-accent">
                0{k + 1} · {t(s.time, lang)}
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium tracking-tight">{t(s.title, lang)}</h3>
              <p className="mt-3 text-muted">{t(s.text, lang)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </>
  );
}
