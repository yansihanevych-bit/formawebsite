"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Img } from "@/content/images";

/** Изображение с mask reveal при входе в зону видимости (clip-path снизу вверх + лёгкий zoom-out) */
export function MaskImage({
  img,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  priority,
  quality = 75,
  delay = 0,
}: {
  img: Img;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  quality?: 60 | 75 | 85;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`${/\b(absolute|fixed)\b/.test(className) ? "" : "relative"} overflow-hidden bg-paper-2 ${className}`}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} quality={quality} className={`object-cover ${imgClassName}`} />
      </motion.div>
    </motion.div>
  );
}
