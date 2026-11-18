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
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["12%", "-18%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["30%", "-30%"]);

  return (
    <section ref={ref} data-tone="milk" className="relative overflow-hidden py-24 md:py-40">
      <div className="container-x relative">
        <SplitText lines={[lineA]} className="h-display" />
        <div className="relative">
          <SplitText lines={[lineB]} delay={0.12} className="h-display relative z-10 text-accent md:pl-[14vw]" />
          {/* вертикальный кадр поверх заголовка — своя скорость прокрутки */}
          <motion.div style={{ y: y1 }} className="pointer-events-none absolute right-[4%] top-[35%] z-0 hidden w-[17vw] max-w-[300px] md:block">
            <MaskImage img={image} sizes="22vw" className="aspect-[4/5]" />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-12 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="flex items-center gap-3 text-accent">
              <span className="text-2xl leading-none">+</span>
            </p>
            <h3 className="mt-4 font-display text-2xl uppercase leading-none md:text-3xl">{manifestoTitle}</h3>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg leading-relaxed">{manifesto}</p>
              <p className="mt-5 max-w-sm text-sm text-muted">{intro}</p>
              <Link href={more.href} className="meta link-u mt-8 inline-flex items-center gap-2">
                {more.label} →
              </Link>
            </Reveal>
          </div>
          {/* второй кадр — смещён относительно сетки */}
          <motion.div style={{ y: y2 }} className="relative md:col-span-3 md:col-start-6 md:-mt-10">
            <MaskImage img={image2} sizes="(min-width: 768px) 24vw, 100vw" className="aspect-[3/4]" delay={0.15} />
            <p className="meta mt-3 text-muted">( {image2.alt.replace("Render — ", "")} )</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 self-end md:col-span-3 md:col-start-10">
            {numbers.map((n, k) => (
              <Reveal key={k} delay={k * 0.08}>
                <CountUp value={n.v} className="h-numeral block text-5xl md:text-6xl" />
                <p className="meta mt-3 text-muted">{n.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      {/* фоновые «плавающие» метки чертежа */}
      <span aria-hidden className="pointer-events-none absolute left-[46%] top-24 hidden text-3xl text-accent/40 md:block">+</span>
      <span aria-hidden className="pointer-events-none absolute bottom-28 left-[8%] hidden text-3xl text-accent/40 md:block">+</span>
    </section>
  );
}
