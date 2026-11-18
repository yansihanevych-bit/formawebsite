"use client";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import type { Img } from "@/content/images";
import { ProjectLink } from "@/components/ui/ProjectLink";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { SplitText } from "@/components/ui/SplitText";

export type RailItem = { slug: string; href: string; title: string; location: string; type: string; year: number; area: number; services: string; img: Img; imgAlt?: Img };

/** ширины панелей по очереди — разный ритм, как в журнале */
const WIDTHS = ["w-[62vw]", "w-[38vw]", "w-[48vw]", "w-[34vw]", "w-[56vw]", "w-[40vw]", "w-[50vw]", "w-[36vw]"];
const HEIGHTS = ["h-[64vh]", "h-[52vh]", "h-[70vh]", "h-[46vh]", "h-[60vh]", "h-[66vh]", "h-[54vh]", "h-[62vh]"];
const OFFSETS = ["self-end", "self-start", "self-center", "self-end", "self-start", "self-center", "self-end", "self-start"];

/**
 * Selected projects — горизонтальная прокрутка (десктоп): секция закреплена, лента едет по скроллу,
 * индикатор текущего проекта. На мобильных — вертикальная лента крупных карточек (P7-подача).
 */
export function PortfolioRail({ items, eyebrow, title, allLabel, allHref }: { items: RailItem[]; eyebrow: string; title: string; allLabel: string; allHref: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [cur, setCur] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -dist]);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCur(Math.min(items.length - 1, Math.floor(v * items.length * 0.999))));

  useLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section data-tone="walnut" className="relative">
      {/* Desktop: pinned horizontal scroll */}
      <div ref={wrap} className="relative hidden lg:block" style={{ height: `calc(100vh + ${dist}px)` }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pb-8 pt-28">
          <div className="container-x flex items-end justify-between gap-10">
            <div>
              <p className="meta mb-4 flex items-center gap-3 text-muted">
                <span className="text-accent">+</span> {eyebrow}
              </p>
              <SplitText lines={[title]} className="h-section max-w-[18ch]" />
            </div>
            <div className="w-64 shrink-0">
              <p className="meta mb-2 flex justify-between text-muted">
                <span className="truncate pr-4">{items[cur]?.title}</span>
                <span className="tabular-nums">
                  {String(cur + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </p>
              <div className="h-px bg-line">
                <motion.div className="h-px origin-left bg-accent" style={{ scaleX: smooth }} />
              </div>
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="mt-10 flex flex-1 items-stretch gap-[3vw] pl-[clamp(1.25rem,4vw,4rem)] pr-[8vw] will-change-transform">
            {items.map((p, k) => (
              <ProjectLink key={p.slug} href={p.href} className={`group relative flex shrink-0 flex-col ${WIDTHS[k % WIDTHS.length]} ${OFFSETS[k % OFFSETS.length]}`}>
                <span className="h-numeral text-outline mb-3 block text-[7vw] [--outline:var(--color-muted)] transition-colors duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:0]">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <div data-pt-img className={`relative overflow-hidden bg-paper-2 ${HEIGHTS[k % HEIGHTS.length]}`}>
                  <Image src={p.img.src} alt={p.img.alt} fill sizes="60vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
                  {p.imgAlt && (
                    <Image src={p.imgAlt.src} alt="" fill sizes="60vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-6 text-warm transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
                    <p className="meta text-warm/75">{p.services}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight transition-transform duration-500 group-hover:translate-x-2 xl:text-2xl">{p.title}</h3>
                    <p className="meta mt-2 text-muted">
                      {p.location} · {p.type} · {p.year}
                    </p>
                  </div>
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">↗</span>
                </div>
              </ProjectLink>
            ))}
            <Link href={allHref} className="group flex w-[26vw] shrink-0 flex-col items-start justify-center border-l border-line pl-[3vw]">
              <span className="h-section transition-colors group-hover:text-accent">{allLabel}</span>
              <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border border-ink text-2xl transition-all duration-500 group-hover:translate-x-3 group-hover:border-accent group-hover:bg-accent group-hover:text-paper">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet: вертикальная лента */}
      <div className="container-x py-24 lg:hidden">
        <p className="meta mb-4 flex items-center gap-3 text-muted">
          <span className="text-accent">+</span> {eyebrow}
        </p>
        <SplitText lines={[title]} className="h-section mb-12" />
        <div className="space-y-14">
          {items.map((p, k) => (
            <ProjectLink key={p.slug} href={p.href} className="group block">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="h-numeral text-outline text-6xl [--outline:var(--color-muted)]">{String(k + 1).padStart(2, "0")}</span>
                <ProjectIcon slug={p.slug} className="h-8 w-8 text-muted" />
              </div>
              <div data-pt-img className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                <Image src={p.img.src} alt={p.img.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <h3 className="mt-4 font-display text-2xl uppercase leading-tight">{p.title}</h3>
              <dl className="meta mt-3 grid grid-cols-2 gap-y-1 text-muted">
                <dd>{p.location}</dd>
                <dd>{p.area} m²</dd>
                <dd>{p.type}</dd>
                <dd>{p.year}</dd>
              </dl>
            </ProjectLink>
          ))}
        </div>
        <Link href={allHref} className="btn btn-ghost mt-12">
          {allLabel} →
        </Link>
      </div>
    </section>
  );
}
