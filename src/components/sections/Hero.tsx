"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { Img } from "@/content/images";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";

type Props = {
  slides: Img[];
  eyebrow: string;
  lines: string[];
  sub: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  scroll: string;
  towns: string[];
};

export function Hero({ slides, eyebrow, lines, sub, primary, secondary, scroll, towns }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-paper">
      {slides.map((s, k) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1800ms] ease-out"
          style={{ opacity: k === i ? 1 : 0 }}
          aria-hidden={k !== i}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={k === 0}
            sizes="100vw"
            quality={75}
            className="object-cover"
            style={{ animation: k === i ? "kenburns 9s ease-out forwards" : undefined }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />

      <div className="container-x relative flex h-full flex-col justify-end pb-14 md:pb-20">
        <motion.p
          className="eyebrow mb-6 text-paper/80"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {eyebrow}
        </motion.p>
        <h1 className="h-display max-w-[16ch]">
          {lines.map((l, k) => (
            <span key={k} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3 + k * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {k === lines.length - 1 ? <em className="font-light not-italic text-paper/70">{l}</em> : l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-12 md:items-end"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          <p className="max-w-xl text-base text-paper/85 md:col-span-6 md:text-lg">{sub}</p>
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Link href={primary.href} onClick={() => track("cta_click", { position: "hero" })} className="btn btn-light">
              {primary.label} <Arrow />
            </Link>
            <Link href={secondary.href} className="btn border-paper/50 hover:bg-paper hover:text-ink">
              {secondary.label}
            </Link>
          </div>
        </motion.div>
        <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-5 text-paper/70">
          <span className="eyebrow text-[0.62rem]">{towns.join(" · ")}</span>
          <span className="eyebrow hidden items-center gap-3 text-[0.62rem] sm:flex">
            {scroll}
            <span className="relative block h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-0 bg-paper" style={{ animation: "scrollcue 2.4s ease-in-out infinite" }} />
            </span>
          </span>
          <span className="eyebrow text-[0.62rem] tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
