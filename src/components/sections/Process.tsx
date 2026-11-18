"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { processSteps } from "@/content/misc";
import { t, type Locale } from "@/lib/i18n";
import { SplitText } from "@/components/ui/SplitText";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Шкала-линейка вдоль линии таймлайна */
const RULER = "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 24px)";

/**
 * Five steps — графичная горизонтальная timeline.
 * Десктоп: секция закрепляется, прокрутка «прочерчивает» линию, этапы загораются по очереди.
 * Мобильный и планшет: вертикальная линия, которая рисуется при прокрутке.
 */
export function Process({ lang, eyebrow, title, tone = "sand" }: { lang: Locale; eyebrow: string; title: string; tone?: string }) {
  const n = processSteps.length;
  const reduce = useReducedMotion();

  // десктоп: закреплённая сцена
  const pin = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32 });
  const lineX = useTransform(p, [0.05, 0.9], [0, 1]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(((v - 0.05) / 0.85) * (n - 1) + 0.35)))));

  // мобильный: вертикальная линия
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress: mp } = useScroll({ target: list, offset: ["start 70%", "end 60%"] });
  const lineY = useSpring(mp, { stiffness: 120, damping: 30 });

  const head = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="meta mb-5 flex items-center gap-3 text-muted">
          <span className="text-accent">+</span> {eyebrow}
        </p>
        <SplitText lines={[title]} className="h-section max-w-[18ch]" />
      </div>
      <p className="h-numeral hidden text-[clamp(3rem,6vw,6rem)] leading-none tabular-nums lg:block" aria-hidden>
        0{active + 1}
        <span className="text-outline [--outline:var(--color-muted)]">/0{n}</span>
      </p>
    </div>
  );

  return (
    <section data-tone={tone}>
      {/* ДЕСКТОП: pinned timeline */}
      <div ref={pin} className="relative hidden lg:block" style={{ height: reduce ? "auto" : "280vh" }}>
        <div className={`${reduce ? "" : "sticky top-0 h-screen"} container-x flex flex-col justify-center gap-10 py-24`}>
          {head}

          <div className="relative">
            {/* кадры над линией */}
            <div className="grid grid-cols-5 gap-6">
              {processSteps.map((s, k) => (
                <div key={k} className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <motion.div
                    className="absolute inset-0"
                    initial={false}
                    animate={{ clipPath: k <= active || reduce ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image src={s.image.src} alt={s.image.alt} fill sizes="18vw" className={`object-cover transition-[filter] duration-700 ${k === active ? "" : "grayscale"}`} />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* линия + линейка + узлы */}
            <div className="relative my-8 h-6">
              <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-full text-ink/25" style={{ backgroundImage: RULER }} aria-hidden />
              <div className="absolute inset-x-0 top-1/2 h-px bg-line" />
              <motion.div className="absolute inset-x-0 top-1/2 h-[2px] origin-left bg-accent" style={{ scaleX: reduce ? 1 : lineX }} />
              <div className="absolute inset-0 grid grid-cols-5 gap-6">
                {processSteps.map((_, k) => (
                  <span key={k} className="relative">
                    <span
                      className={`absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border transition-all duration-500 ${
                        k <= active || reduce ? "scale-100 border-accent bg-accent" : "scale-75 border-ink/40 bg-paper"
                      }`}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* подписи этапов */}
            <ol className="grid grid-cols-5 gap-6">
              {processSteps.map((s, k) => {
                const on = k <= active || !!reduce;
                return (
                  <li key={k} className={`min-w-0 transition-opacity duration-500 ${on ? "opacity-100" : "opacity-35"}`}>
                    <p className="flex items-baseline justify-between gap-2">
                      <span className={`h-numeral text-5xl leading-none transition-colors duration-500 xl:text-6xl ${k === active ? "text-accent" : "text-outline [--outline:var(--color-ink)]"}`}>
                        0{k + 1}
                      </span>
                      <span className="meta text-right text-muted">{t(s.time, lang)}</span>
                    </p>
                    <h3 className="mt-5 font-display text-lg uppercase leading-tight xl:text-xl">{t(s.title, lang)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{t(s.text, lang)}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНЫЙ / ПЛАНШЕТ: вертикальная линия */}
      <div className="container-x py-24 md:py-32 lg:hidden">
        {head}
        <ol ref={list} className="relative mt-14 pl-10">
          <span className="absolute bottom-0 left-[7px] top-0 w-px bg-line" aria-hidden />
          <motion.span className="absolute bottom-0 left-[7px] top-0 w-[2px] origin-top bg-accent" style={{ scaleY: reduce ? 1 : lineY }} aria-hidden />
          {processSteps.map((s, k) => (
            <motion.li
              key={k}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative pb-14 last:pb-0"
            >
              <span className="absolute -left-10 top-2 h-4 w-4 rotate-45 border border-accent bg-accent" aria-hidden />
              <p className="flex items-baseline gap-4">
                <span className="h-numeral text-outline text-5xl leading-none [--outline:var(--color-accent)]">0{k + 1}</span>
                <span className="meta text-muted">{t(s.time, lang)}</span>
              </p>
              <h3 className="mt-4 font-display text-2xl uppercase leading-tight">{t(s.title, lang)}</h3>
              <p className="mt-3 max-w-md text-muted">{t(s.text, lang)}</p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-paper-2">
                <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 768px) 80vw, 100vw" className="object-cover" />
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
