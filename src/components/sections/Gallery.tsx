"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Img } from "@/content/images";

type L = { enlarge: string; close: string; prev: string; next: string };

/** Галерея кейса с лайтбоксом и счётчиком «1/N» (как на smeulders-ig.nl) */
export function Gallery({ images, labels }: { images: Img[]; labels: L }) {
  const [i, setI] = useState<number | null>(null);
  const n = images.length;
  const go = useCallback((dir: number) => setI((v) => (v === null ? v : (v + dir + n) % n)), [n]);

  useEffect(() => {
    if (i === null) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setI(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [i, go]);

  // раскладка по ориентации: горизонтальные — во всю ширину, вертикальные — рядами по 2 и по 3 (без обрезки)
  type Cell = { img: Img; k: number; cls: string; sizes: string };
  const cells: Cell[] = [];
  const buf: { img: Img; k: number }[] = [];
  let rowSize = 2;
  const flush = (force = false) => {
    while (buf.length >= rowSize || (force && buf.length)) {
      const take = buf.splice(0, Math.min(rowSize, buf.length));
      const span = take.length === 3 ? "md:col-span-4" : take.length === 2 ? "md:col-span-6" : "md:col-span-6 md:col-start-4";
      take.forEach((t) => cells.push({ ...t, cls: `${span} aspect-[4/5]`, sizes: take.length === 3 ? "(min-width: 768px) 31vw, 100vw" : "(min-width: 768px) 46vw, 100vw" }));
      rowSize = rowSize === 2 ? 3 : 2;
    }
  };
  images.forEach((img, k) => {
    if (img.w > img.h) {
      flush(true);
      cells.push({ img, k, cls: "md:col-span-12 aspect-[16/9]", sizes: "100vw" });
    } else {
      buf.push({ img, k });
      flush();
    }
  });
  flush(true);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-12 md:gap-6">
        {cells.map(({ img, k, cls, sizes }) => (
          <button
            key={img.src + k}
            type="button"
            onClick={() => setI(k)}
            aria-label={`${labels.enlarge} ${k + 1}/${n}`}
            className={`group relative block w-full overflow-hidden bg-paper-2 ${cls}`}
          >
            <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
            <span className="eyebrow absolute bottom-4 left-4 bg-warm/90 px-2.5 py-1.5 text-graphite text-[0.55rem] opacity-0 transition-opacity group-hover:opacity-100">
              {k + 1}/{n}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {i !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            data-lenis-prevent
            className="fixed inset-0 z-[80] flex flex-col bg-graphite/97 text-warm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container-x flex items-center justify-between py-6">
              <span className="eyebrow tabular-nums">
                {i + 1} / {n}
              </span>
              <button type="button" onClick={() => setI(null)} className="eyebrow">
                {labels.close} ✕
              </button>
            </div>
            <div
              className="relative flex-1"
              onTouchStart={(e) => ((e.currentTarget as HTMLElement).dataset.x = String(e.touches[0].clientX))}
              onTouchEnd={(e) => {
                const x0 = Number((e.currentTarget as HTMLElement).dataset.x);
                const dx = e.changedTouches[0].clientX - x0;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={i} className="absolute inset-0 mx-4 md:mx-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <Image src={images[i].src} alt={images[i].alt} fill sizes="100vw" quality={85} className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className="absolute left-0 top-0 hidden h-full w-1/4 cursor-w-resize md:block" />
              <button type="button" onClick={() => go(1)} aria-label={labels.next} className="absolute right-0 top-0 hidden h-full w-1/4 cursor-e-resize md:block" />
            </div>
            <div className="container-x flex justify-between py-6">
              <button type="button" onClick={() => go(-1)} className="eyebrow">← {labels.prev}</button>
              <button type="button" onClick={() => go(1)} className="eyebrow">{labels.next} →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
