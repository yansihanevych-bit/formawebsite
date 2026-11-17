"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Img } from "@/content/images";
import { Arrow } from "@/components/ui/Arrow";
import { SplitText } from "@/components/ui/SplitText";
import { track } from "@/lib/analytics";

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
    <section ref={ref} data-hero-dark className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: "inset(12% 8% 12% 8%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" quality={85} className="object-cover" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/35" />
      </motion.div>

      <motion.div style={{ y, opacity: fade }} className="container-x relative flex h-full flex-col justify-end pb-10 md:pb-14">
        <motion.p
          className="meta mb-8 flex items-center gap-3 text-paper/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <span className="h-px w-8 bg-paper/60" />
          {eyebrow}
        </motion.p>

        <SplitText as="h1" lines={lines} onMount delay={0.9} className="h-display max-w-[12ch]" />

        <div className="mt-10 grid gap-8 border-t border-white/20 pt-8 md:grid-cols-12 md:items-end">
          <motion.p
            className="max-w-md text-lg leading-snug text-paper/85 md:col-span-5 md:text-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 }}
          >
            {sub}
          </motion.p>
          <motion.ul
            className="hidden gap-8 md:col-span-4 md:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.7 }}
          >
            {meta.map((m) => (
              <li key={m.k}>
                <p className="meta text-paper/55">— {m.k}</p>
                <p className="mt-1 font-display text-lg font-medium">{m.v}</p>
              </li>
            ))}
          </motion.ul>
          <motion.div
            className="flex flex-wrap items-center gap-5 md:col-span-3 md:justify-end"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.6 }}
          >
            <Link href={primary.href} onClick={() => track("cta_click", { position: "hero" })} className="btn btn-light">
              {primary.label} <Arrow />
            </Link>
          </motion.div>
        </div>
        <div className="mt-8 flex items-center justify-between text-paper/60">
          <Link href={secondary.href} className="meta link-u">
            {secondary.label}
          </Link>
          <span className="meta flex items-center gap-3">
            {scroll}
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-0 bg-paper" style={{ animation: "scrollcue 2.4s ease-in-out infinite" }} />
            </span>
          </span>
        </div>
      </motion.div>
    </section>
  );
}
