"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Preloader: архитектурные линии строят рамку → проявляется логотип FORMA → шторка уходит вверх.
 * Показывается один раз за сессию и длится ≤ 1.6 с (не блокирует контент надолго).
 * Повторные визиты: класс html.preloaded выставляет init-скрипт до отрисовки — заставки нет вовсе.
 */

const LINES = [
  { d: "M0 30 H100", delay: 0 },
  { d: "M0 70 H100", delay: 0.08 },
  { d: "M22 0 V100", delay: 0.04 },
  { d: "M78 0 V100", delay: 0.12 },
];

export function Preloader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (document.documentElement.classList.contains("preloaded") || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- заставка уже была в этой сессии
      setShow(false);
      return;
    }
    const t0 = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1100);
      setN(Math.round(p * 100));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    const done = setTimeout(() => {
      try {
        sessionStorage.setItem("fb_pre", "1");
      } catch {}
      document.documentElement.classList.add("preloaded");
      window.dispatchEvent(new Event("fb:intro"));
      setShow(false);
    }, 1350);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(done);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="preloader fixed inset-0 z-[200] flex items-center justify-center bg-graphite text-warm"
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-warm/25">
            {LINES.map((l) => (
              <motion.path
                key={l.d}
                d={l.d}
                stroke="currentColor"
                strokeWidth="0.15"
                vectorEffect="non-scaling-stroke"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, delay: l.delay, ease: [0.65, 0, 0.35, 1] }}
              />
            ))}
          </svg>
          <motion.div
            className="relative w-[min(56vw,420px)]"
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/wordmark-white.svg" alt="" className="w-full" />
          </motion.div>
          <span className="meta absolute bottom-6 left-6 text-warm/60">Liguria · 43°49′N 7°46′E</span>
          <span className="absolute bottom-5 right-6 font-display text-4xl tabular-nums">{String(n).padStart(3, "0")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
