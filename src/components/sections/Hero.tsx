"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Img } from "@/content/images";
import { Arrow } from "@/components/ui/Arrow";
import { SplitText } from "@/components/ui/SplitText";
import { track } from "@/lib/analytics";
import { Blueprint } from "./Blueprint";

type Props = {
  image: Img;
  eyebrow: string;
  lines: string[];
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  scroll: string;
  meta: { k: string; v: string }[];
};

const EASE = [0.76, 0, 0.24, 1] as const;

/** Hero: одна сильная фотография, mask reveal, построчный заголовок, мягкий уход при скролле */
export function Hero({ image, eyebrow, lines, sub, primary, secondary, scroll, meta }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} data-hero-dark className="relative h-[100svh] min-h-[640px] overflow-hidden bg-graphite text-warm">
      {/* 1) Чертёж прорисовывается (0–1.4 с) */}
      <div className="absolute inset-0 text-warm/80">
        <Blueprint className="absolute inset-0 h-full w-full" />
      </div>

      {/* 2) Рендер проявляется световой шторкой слева направо (1.2–2.6 с), scale 1.05 → 1 */}
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, delay: 1.2, ease: EASE }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 2.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" quality={85} className="object-cover" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" />
      </motion.div>
      {/* световая кромка шторки */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent mix-blend-screen"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.4, delay: 1.2, ease: EASE, opacity: { duration: 1.4, delay: 1.2, times: [0, 0.1, 0.85, 1] } }}
        />
      )}
      {/* линии чертежа остаются тонким слоем поверх фото и гаснут */}
      {!reduce && (
        <motion.div className="pointer-events-none absolute inset-0 text-warm" initial={{ opacity: 0.55 }} animate={{ opacity: 0 }} transition={{ delay: 2.2, duration: 1.4 }}>
          <Blueprint className="absolute inset-0 h-full w-full" />
        </motion.div>
      )}

      <motion.div style={{ y, opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <motion.p
          className="meta mb-8 flex items-center gap-3 text-warm/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <span className="h-px w-8 bg-warm/60" />
          {eyebrow}
        </motion.p>

        <SplitText as="h1" lines={lines} onMount delay={1.8} className="h-display max-w-[12ch]" />

        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-md text-lg leading-snug text-warm/85 md:col-span-5 md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.4 }}
          >
            {sub}
          </motion.p>
          <motion.ul
            className="hidden gap-8 md:col-span-4 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 2.6 }}
          >
            {meta.map((m) => (
              <li key={m.k}>
                <p className="meta text-warm/55">— {m.k}</p>
                <p className="mt-1 font-display text-lg font-medium">{m.v}</p>
              </li>
            ))}
          </motion.ul>
          <motion.div
            className="flex flex-wrap items-center gap-5 md:col-span-3 md:justify-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.5 }}
          >
            <Link href={primary.href} onClick={() => track("cta_click", { position: "hero" })} className="btn btn-light">
              {primary.label} <Arrow />
            </Link>
          </motion.div>
        </div>
        <div className="mt-8 flex items-center justify-between text-warm/60">
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
