"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Img } from "@/content/images";
import { Magnetic } from "@/components/ui/Magnetic";
import { useIntro } from "@/lib/useIntro";
import { track } from "@/lib/analytics";

type Props = {
  images: Img[];
  eyebrow: string;
  lines: string[];
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  scroll: string;
  meta: { k: string; v: string }[];
  captions: string[]; // подписи к кадрам (название проекта · город)
};

const EASE = [0.76, 0, 0.24, 1] as const;
const SLIDE_MS = 6500;

/**
 * Hero: полноэкранная смена кадров через маску, огромный заголовок со смещённой второй строкой,
 * подписи по углам, магнитная круглая CTA. Старт — после прелоадера (useIntro).
 */
export function Hero({ images, eyebrow, lines, sub, primary, secondary, scroll, meta, captions }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const ready = useIntro();
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const fade = useTransform(scrollYProgress, [0.35, 0.8], [1, reduce ? 1 : 0]);

  useEffect(() => {
    if (!ready || reduce || images.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % images.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [ready, reduce, images.length]);

  const show = ready || !!reduce;
  const n = images.length;

  return (
    <section ref={ref} data-hero-dark data-tone="walnut" className="relative h-[100svh] min-h-[640px] overflow-hidden bg-graphite text-warm">
      {/* кадры: каждый следующий открывается маской снизу вверх поверх предыдущего */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(14% 10% 14% 10%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <motion.div className="absolute inset-[-6%_0_-6%_0]" style={{ y: imgY }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 1, transition: { duration: 1.3 } }}
              transition={{ duration: 1.3, ease: EASE }}
            >
              <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: SLIDE_MS / 1000 + 1, ease: "linear" }}>
                <Image src={images[i].src} alt={images[i].alt} fill priority={i === 0} sizes="100vw" quality={85} className="object-cover" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/45" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative flex h-full flex-col pb-8 pt-36 md:pb-10 md:pt-40">
        {/* верхняя строка подписей */}
        <motion.div
          className="meta flex items-start justify-between gap-6 text-warm/75"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <span className="flex items-center gap-3">
            <span className="text-stone">+</span> {eyebrow}
          </span>
          <span className="hidden text-right md:block">
            43°49′N 7°46′E
            <br />
            Sanremo · Bordighera · Ospedaletti
          </span>
        </motion.div>

        {/* заголовок: строки выезжают из-под маски, вторая смещена вправо */}
        <h1 className="h-display mt-auto" aria-label={lines.join(" ")}>
          {lines.map((l, k) => (
            <span key={k} className={`block overflow-hidden pb-[0.06em] ${k === 1 ? "pl-[8vw] md:pl-[22vw]" : ""}`} aria-hidden>
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={show ? { y: "0%" } : undefined}
                transition={{ duration: 1.2, delay: 0.55 + k * 0.14, ease: [0.16, 1, 0.3, 1] }}
              >
                {k === 1 ? (
                  <>
                    <span className="meta mr-4 inline-block -translate-y-[1.4em] align-middle text-[0.6rem] tracking-[0.12em] text-stone md:mr-6 md:text-[0.7rem]">( 0{i + 1} )</span>
                    {l}
                  </>
                ) : (
                  l
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* нижняя полоса: подзаголовок · показатели · кадр · CTA */}
        <motion.div
          className="mt-8 grid items-end gap-6 border-t border-white/20 pt-6 md:mt-10 md:grid-cols-12"
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 1.25 }}
        >
          <p className="max-w-sm text-base leading-snug text-warm/85 md:col-span-4 md:text-lg">{sub}</p>
          <ul className="hidden gap-8 md:col-span-3 md:flex">
            {meta.map((m) => (
              <li key={m.k}>
                <p className="meta text-warm/55">{m.k}</p>
                <p className="mt-1 font-display text-lg">{m.v}</p>
              </li>
            ))}
          </ul>
          {/* индикатор кадров */}
          <div className="hidden md:col-span-3 md:block">
            <p className="meta mb-2 flex justify-between text-warm/60">
              <span>{captions[i]}</span>
              <span className="tabular-nums">
                0{i + 1} / 0{n}
              </span>
            </p>
            <div className="flex gap-1">
              {images.map((_, k) => (
                <button key={k} type="button" aria-label={`${k + 1} / ${n}`} onClick={() => setI(k)} className="relative h-[2px] flex-1 overflow-hidden bg-white/20">
                  {k === i && !reduce && <motion.span key={`${i}-p`} className="absolute inset-0 origin-left bg-warm" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: SLIDE_MS / 1000, ease: "linear" }} />}
                  {(k < i || (reduce && k === i)) && <span className="absolute inset-0 bg-warm/70" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 md:col-span-2 md:justify-end">
            <Link href={secondary.href} className="meta link-u text-warm/75 md:hidden">
              {secondary.label}
            </Link>
            <Magnetic>
              <Link
                href={primary.href}
                onClick={() => track("cta_click", { position: "hero" })}
                className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-rosso p-4 text-center text-warm transition-transform duration-500 hover:scale-105 md:h-36 md:w-36"
              >
                <span className="meta leading-tight">{primary.label}</span>
                <svg viewBox="0 0 12 12" className="absolute right-6 top-6 h-2.5 w-2.5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:right-8 md:top-8" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d="M1 11L11 1M3 1h8v8" />
                </svg>
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        <div className="mt-6 hidden items-center justify-between text-warm/55 md:flex">
          <Link href={secondary.href} className="meta link-u">
            {secondary.label}
          </Link>
          <span className="meta flex items-center gap-3">
            {scroll}
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-0 bg-warm" style={{ animation: "scrollcue 2.4s ease-in-out infinite" }} />
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
