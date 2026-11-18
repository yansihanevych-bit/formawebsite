"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Img } from "@/content/images";
import { SplitText } from "@/components/ui/SplitText";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { MaskImage } from "@/components/ui/MaskImage";

type Props = {
  lineA: string;
  lineB: string;
  manifestoTitle: string;
  manifesto: string;
  intro: string;
  numbers: { v: string; l: string }[];
  image: Img;
  image2: Img;
  more: { label: string; href: string };
};

/** Editorial-блок о студии: oversized-типографика, перекрывающиеся изображения с разной скоростью, счётчики */
export function Manifesto({ lineA, lineB, manifestoTitle, manifesto, intro, numbers, image, image2, more }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-4%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["22%", "-22%"]);

  return (
    <section ref={ref} data-tone="milk" className="relative overflow-hidden py-24 md:py-40">
      <div className="container-x relative">
        <SplitText lines={[lineA]} className="h-display !text-[clamp(2.2rem,7.6vw,8.5rem)] !leading-[0.9]" />
        <SplitText lines={[lineB]} delay={0.12} className="h-display relative z-10 !text-[clamp(2.2rem,7.6vw,8.5rem)] !leading-[0.9] text-accent md:pl-[14vw]" />

        {/* крупный кадр на 2/3 ширины + вертикальный кадр, наезжающий сверху */}
        <div className="relative mt-14 grid gap-6 md:mt-24 md:grid-cols-12">
          <motion.div style={{ y: y1 }} className="md:col-span-8">
            <MaskImage img={image} sizes="(min-width: 768px) 66vw, 100vw" quality={85} className="aspect-[16/11]" />
            <p className="meta mt-3 flex justify-between text-muted">
              <span>( {image.alt.replace("Render — ", "")} )</span>
              <span>FORMA BURO · Liguria</span>
            </p>
          </motion.div>
          <motion.div style={{ y: y2 }} className="hidden md:col-span-4 md:-mt-40 md:block">
            <MaskImage img={image2} sizes="30vw" className="aspect-[3/4]" delay={0.15} />
          </motion.div>
        </div>

        {/* манифест крупным текстом + подводка */}
        <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="meta flex items-center gap-3 text-muted">
              <span className="text-accent">+</span> {manifestoTitle}
            </p>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <p className="font-display text-[clamp(1.35rem,2.7vw,2.6rem)] leading-[1.18] tracking-[-0.01em]">{manifesto}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-muted">{intro}</p>
                <Link href={more.href} className="btn btn-ghost self-start md:justify-self-end">
                  {more.label} <span aria-hidden className="arr">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* цифры — типографская полоса */}
        <div className="mt-20 grid grid-cols-2 border-y border-ink md:mt-28 md:grid-cols-4">
          {numbers.map((n, k) => (
            <Reveal key={k} delay={k * 0.08} className={`py-8 md:py-10 ${k % 2 ? "border-l border-line pl-5 md:pl-8" : k ? "md:border-l md:border-line md:pl-8" : ""}`}>
              <CountUp value={n.v} className="h-numeral block text-[clamp(2.8rem,6vw,6rem)] leading-none" />
              <p className="meta mt-4 text-muted">{n.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
