"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { SplitText } from "@/components/ui/SplitText";

/**
 * Five steps — один блок для всех экранов.
 * Десктоп: слева закреплены визуал и вертикальная линия прогресса, справа прокручиваются этапы
 * (активный — opacity 1, остальные — 0.35). Мобильный: тот же список, у каждого этапа своё фото.
 */
export function Process({ lang, eyebrow, title, tone = "sand" }: { lang: Locale; eyebrow: string; title: string; tone?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const n = processSteps.length;
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section data-tone={tone} className="container-x py-24 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="meta mb-6 flex items-center gap-3 text-muted">
          <span className="text-accent">+</span> {eyebrow}
        </p>
        <SplitText lines={[title]} className="h-section max-w-[18ch]" />
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* слева: закреплённый визуал + линия прогресса (только десктоп) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-28 flex gap-8">
            <div className="relative w-px self-stretch bg-line" aria-hidden>
              <motion.div className="absolute inset-x-0 top-0 origin-top bg-accent" style={{ scaleY: progress, height: "100%" }} />
              {processSteps.map((_, k) => (
                <span
                  key={k}
                  className={`absolute -left-[5px] h-[11px] w-[11px] rounded-full border transition-colors duration-500 ${k <= active ? "border-accent bg-accent" : "border-ink/30 bg-paper"}`}
                  style={{ top: `calc(${(k / (n - 1)) * 100}% - 5px)` }}
                />
              ))}
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.4 } }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={processSteps[active].image.src} alt={processSteps[active].image.alt} fill sizes="45vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <span className="meta absolute left-4 top-4 z-10 bg-warm px-2.5 py-1.5 tabular-nums text-graphite">
                  0{active + 1} / 0{n}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* справа: этапы */}
        <ol ref={listRef} className="lg:col-span-5 lg:col-start-8">
          {processSteps.map((s, k) => (
            <li
              key={k}
              ref={(el) => {
                stepRefs.current[k] = el;
              }}
              data-i={k}
              className={`border-t border-line py-10 transition-opacity duration-500 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-0 ${k === active ? "opacity-100" : "lg:opacity-35"}`}
            >
              <div className="relative mb-6 aspect-[16/10] overflow-hidden bg-paper-2 lg:hidden">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <p className="meta text-accent">
                0{k + 1} · {t(s.time, lang)}
              </p>
              <h3 className="mt-4 font-display text-3xl uppercase leading-none md:text-5xl">{t(s.title, lang)}</h3>
              <p className="mt-4 max-w-md text-lg text-muted">{t(s.text, lang)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
