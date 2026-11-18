"use client";
import { motion, useReducedMotion } from "motion/react";

/** Финал сайта: логотип FORMA на всю ширину, проявляется маской снизу вверх */
export function BigWordmark() {
  const reduce = useReducedMotion();
  return (
    <div className="container-x pb-4 pt-2" aria-hidden>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", y: 40 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/wordmark-white.svg" alt="" className="w-full opacity-90" loading="lazy" />
      </motion.div>
    </div>
  );
}
