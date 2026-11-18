"use client";
import { motion, useReducedMotion } from "motion/react";

/**
 * Стилизованный архитектурный план виллы (SVG) — линии прорисовываются за ~1.4 с.
 * TODO: заменить на реальный чертёж проекта (тот же viewBox 1600×900, только stroke-линии).
 */
const WALLS = [
  "M260 210 H1140 V690 H260 Z", // внешний контур
  "M1140 300 H1340 V600 H1140", // крыло / веранда
  "M560 210 V470", "M560 560 V690", // перегородки
  "M820 210 V380", "M820 460 V690",
  "M260 470 H470", "M560 470 H820",
  "M820 380 H1140",
];
const DETAILS = [
  "M470 470 A90 90 0 0 1 560 560", // дверь
  "M820 460 A80 80 0 0 0 900 380",
  "M330 600 H500 V650 H330 Z", // диван
  "M900 520 H1060 V620 H900 Z", // остров
  "M640 260 H760 V400 H640 Z", // кровать
  "M380 760 H1220 V840 H380 Z", // бассейн
];
const DIMS = [
  "M260 150 H1140", "M260 140 V160", "M1140 140 V160", // размер сверху
  "M200 210 V690", "M190 210 H210", "M190 690 H210", // размер слева
  "M1400 300 V600", "M1390 300 H1410", "M1390 600 H1410",
];
const GRID = Array.from({ length: 17 }, (_, i) => `M${100 * i} 0 V900`).concat(Array.from({ length: 10 }, (_, i) => `M0 ${100 * i} H1600`));

export function Blueprint({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = (delay: number, dur = 1.1) =>
    reduce
      ? {}
      : { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { pathLength: { duration: dur, delay, ease: [0.65, 0, 0.35, 1] as const }, opacity: { duration: 0.2, delay } } };

  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeOpacity="0.08" strokeWidth="1">
        {GRID.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="square">
        {WALLS.map((d, i) => (
          <motion.path key={d} d={d} {...draw(i * 0.05)} />
        ))}
      </g>
      <g stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.4">
        {DETAILS.map((d, i) => (
          <motion.path key={d} d={d} {...draw(0.35 + i * 0.06, 0.9)} />
        ))}
      </g>
      <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1">
        {DIMS.map((d, i) => (
          <motion.path key={d} d={d} {...draw(0.6 + i * 0.03, 0.7)} />
        ))}
      </g>
      <motion.g
        fill="currentColor"
        fillOpacity="0.7"
        fontFamily="var(--font-display)"
        fontSize="18"
        letterSpacing="2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <text x="660" y="135">17.60 m</text>
        <text x="150" y="455" transform="rotate(-90 150 455)">9.60 m</text>
        <text x="1420" y="455">6.00</text>
        <text x="300" y="250">LIVING · 38 m²</text>
        <text x="860" y="250">MASTER</text>
        <text x="600" y="805">PISCINA 16.80 × 1.60</text>
      </motion.g>
    </svg>
  );
}
