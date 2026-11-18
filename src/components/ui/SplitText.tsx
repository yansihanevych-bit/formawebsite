"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Появление заголовка: строки мягко проявляются снизу вверх (без пословной анимации).
 * Триггер видимости висит на самом заголовке (а не на словах, которые обрезаны overflow),
 * слова анимируются через variants.
 */
export function SplitText({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  onMount = false,
}: {
  lines: string[];
  as?: Tag;
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  // спокойное появление: строки целиком, лёгкий подъём + проявление, без «прыгающих» слов
  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } };
  const line: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };
  const clean = lines.filter(Boolean);
  return (
    <M
      className={className}
      aria-label={clean.join(" ")}
      variants={parent}
      initial={reduce ? "show" : "hidden"}
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
    >
      {clean.map((l, li) => (
        <motion.span key={li} className="block" aria-hidden variants={line}>
          {l}
        </motion.span>
      ))}
    </M>
  );
}
