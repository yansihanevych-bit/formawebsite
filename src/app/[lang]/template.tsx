"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Page transitions: новая страница проявляется (template пересоздаётся при каждой навигации).
 *  Только opacity — transform на обёртке сломал бы fixed-элементы внутри страниц. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
