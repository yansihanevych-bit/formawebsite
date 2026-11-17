"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Staggered reveal заголовка: слова поднимаются из-под маски.
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
  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } };
  const word: Variants = {
    hidden: { y: reduce ? "0%" : "110%" },
    show: { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
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
      {clean.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block" aria-hidden>
            {words.map((w, wi) => (
              <span key={wi} className="inline-block overflow-hidden pb-[0.1em] align-top">
                <motion.span className="inline-block" variants={word}>
                  {w}
                  {wi < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
    </M>
  );
}
