"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import type { Img } from "@/content/images";

/**
 * Before / After: drag мышью и пальцем (pointer events, вертикальный скролл не блокируется),
 * клавиатура через скрытый range, одноразовая демонстрация движения при первом появлении.
 * Важно: before и after должны совпадать по ракурсу и масштабу.
 */
export function BeforeAfter({ before, after, labels }: { before: Img; after: Img; labels: { before: string; after: string; drag: string } }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    // одна «подсказка»: 50 → 32 → 68 → 50
    const ctrl = animate(0, 1, {
      duration: 2.4,
      ease: "easeInOut",
      onUpdate: (p) => !touched.current && setPos(50 - 18 * Math.sin(p * Math.PI * 2)),
    });
    return () => ctrl.stop();
  }, [inView, reduce]);

  const move = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    touched.current = true;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-paper-2 md:aspect-[16/8]"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => (e.buttons === 1 || e.pointerType === "touch") && (e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId) && move(e.clientX)}
    >
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 768px) 92vw, 100vw" className="pointer-events-none object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 768px) 92vw, 100vw" className="pointer-events-none object-cover grayscale" />
      </div>
      <span className="meta absolute left-4 top-4 bg-paper px-3 py-2 text-ink md:left-6 md:top-6">{labels.before}</span>
      <span className="meta absolute bottom-4 right-4 bg-ink px-3 py-2 text-paper md:bottom-6 md:right-6">{labels.after}</span>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-[2px] bg-paper" />
        <div className="absolute left-0 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border border-white/60 bg-paper/20 text-paper backdrop-blur-md">
          <svg viewBox="0 0 8 12" className="h-3 w-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M7 1L2 6l5 5" /></svg>
          <svg viewBox="0 0 8 12" className="h-3 w-2" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden><path d="M1 1l5 5-5 5" /></svg>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        aria-label={`${labels.before} / ${labels.after} — ${labels.drag}`}
        className="sr-only"
      />
    </div>
  );
}
