"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/content/projects";
import { t, type Locale } from "@/lib/i18n";
import { Corners } from "@/components/ui/Corners";

/** Схематичная карта Западной Ривьеры в стиле чертежа (без внешних тайлов и ключей API) */
const W = 1000;
const H = 508;
const LON0 = 7.38;
const LON1 = 8.12;
const LAT0 = 43.7;
const LAT1 = 43.97;
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W;
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H;

const COAST: [number, number][] = [
  [7.4, 43.728], [7.42, 43.735], [7.48, 43.75], [7.51, 43.775], [7.56, 43.785], [7.61, 43.789], [7.645, 43.781], [7.672, 43.773],
  [7.7, 43.79], [7.725, 43.8], [7.75, 43.8], [7.78, 43.813], [7.83, 43.82], [7.86, 43.83], [7.9, 43.838], [7.96, 43.855], [8.03, 43.876], [8.09, 43.91], [8.12, 43.925],
];
const TOWNS: { n: string; c: [number, number]; main?: boolean }[] = [
  { n: "Monaco", c: [7.42, 43.738] },
  { n: "Menton", c: [7.505, 43.776] },
  { n: "Ventimiglia", c: [7.605, 43.791], main: true },
  { n: "Bordighera", c: [7.665, 43.777], main: true },
  { n: "Ospedaletti", c: [7.718, 43.801], main: true },
  { n: "Sanremo", c: [7.777, 43.816], main: true },
  { n: "Taggia", c: [7.855, 43.846] },
  { n: "Imperia", c: [8.03, 43.882] },
];

export function ProjectsMap({ items, lang, labels }: { items: Project[]; lang: Locale; labels: { completed: string; inProgress: string; open: string } }) {
  const [active, setActive] = useState<string | null>(items[0]?.slug ?? null);
  const land = `M0 0 H${W} V${py(COAST[COAST.length - 1][1])} ` + [...COAST].reverse().map(([lo, la]) => `L${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" ") + ` L0 ${py(COAST[0][1])} Z`;
  const coast = COAST.map(([lo, la], i) => `${i ? "L" : "M"}${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" ");
  const cur = items.find((p) => p.slug === active);

  return (
    <div className="group relative grid gap-6 lg:grid-cols-12">
      <div className="relative overflow-hidden border border-line lg:col-span-8">
        <Corners />
        <div className="overflow-x-auto" data-lenis-prevent-touch>
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[760px] md:min-w-0" role="img" aria-label="Map — Western Riviera">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="currentColor" strokeOpacity="0.06" />
            </pattern>
            <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <path d="M0 0V6" stroke="currentColor" strokeOpacity="0.08" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#grid)" />
          <path d={land} fill="url(#hatch)" />
          <motion.path d={coast} fill="none" stroke="currentColor" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }} />
          {/* граница IT / FR */}
          <path d={`M${px(7.53)} ${py(43.785)} L${px(7.55)} ${py(43.9)} L${px(7.6)} ${py(43.97)}`} stroke="currentColor" strokeOpacity="0.35" strokeDasharray="4 6" fill="none" />
          <text x={px(7.47)} y={py(43.93)} className="fill-current" fontSize="11" letterSpacing="3" opacity="0.4">FRANCE</text>
          <text x={px(7.7)} y={py(43.95)} className="fill-current" fontSize="11" letterSpacing="3" opacity="0.4">ITALIA · LIGURIA</text>
          <text x={px(7.62)} y={py(43.73)} className="fill-current" fontSize="11" letterSpacing="3" opacity="0.4">MAR LIGURE</text>
          {TOWNS.map((tw) => (
            <g key={tw.n}>
              <circle cx={px(tw.c[0])} cy={py(tw.c[1])} r={tw.main ? 2.5 : 1.8} className="fill-current" opacity={tw.main ? 0.8 : 0.45} />
              <text x={px(tw.c[0])} y={py(tw.c[1]) - 26} textAnchor="middle" className="fill-current" fontSize={tw.main ? 12 : 10} letterSpacing="1.5" opacity={tw.main ? 0.85 : 0.5}>
                {tw.n.toUpperCase()}
              </text>
            </g>
          ))}
          {/* масштаб */}
          <g transform={`translate(${W - 150} ${H - 30})`} className="text-current">
            <path d="M0 0H90M0 -4V4M45 -3V3M90 -4V4" stroke="currentColor" strokeOpacity="0.6" />
            <text x="96" y="4" fontSize="10" className="fill-current" opacity="0.6">5 km</text>
          </g>
          {items.map((p) => {
            const on = p.slug === active;
            return (
              <g key={p.slug} transform={`translate(${px(p.coords[0])} ${py(p.coords[1])})`} className="cursor-pointer" onMouseEnter={() => setActive(p.slug)} onClick={() => setActive(p.slug)}>
                <circle r="14" fill="transparent" />
                <circle r={on ? 9 : 6} fill="none" stroke="var(--color-accent)" strokeWidth="1.2" className="transition-all duration-300" />
                <circle r="3" fill={p.status === "completed" ? "var(--color-accent)" : "var(--color-paper)"} stroke="var(--color-accent)" />
                {on && <path d="M-18 0H-11M11 0H18M0 -18V-11M0 11V18" stroke="var(--color-accent)" strokeWidth="1" />}
              </g>
            );
          })}
        </svg>
        </div>
        <div className="meta flex gap-5 border-t border-line px-4 py-3 text-muted md:absolute md:bottom-3 md:left-4 md:border-0 md:p-0">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent" /> {labels.completed}</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full border border-accent" /> {labels.inProgress}</span>
        </div>
      </div>
      <div className="lg:col-span-4">
        <AnimatePresence mode="wait">
          {cur && (
            <motion.div key={cur.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              <Link href={`/${lang}/projects/${cur.slug}`} className="group/card block">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image src={cur.cover.src} alt={cur.cover.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover/card:scale-[1.03]" />
                </div>
                <p className="meta mt-4 text-accent">— {cur.location} · {cur.status === "completed" ? labels.completed : labels.inProgress}</p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tight">{t(cur.title, lang)}</h3>
                <p className="mt-2 text-sm text-muted">{t(cur.intro, lang)}</p>
                <span className="meta mt-4 inline-flex items-center gap-2 border-b border-ink pb-1">{labels.open} →</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
