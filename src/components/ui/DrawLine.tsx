"use client";
import { motion, useReducedMotion } from "motion/react";

/** Тонкая линия, которая прорисовывается при появлении в зоне видимости (горизонтальная или вертикальная) */
export function DrawLine({ className = "", vertical = false, delay = 0, strong = false }: { className?: string; vertical?: boolean; delay?: number; strong?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className={`block ${vertical ? "w-px origin-top" : "h-px w-full origin-left"} ${strong ? "bg-ink" : "bg-line"} ${className}`}
      initial={reduce ? false : vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}
