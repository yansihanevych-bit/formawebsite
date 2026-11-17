"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { Img } from "@/content/images";

export function BeforeAfter({ before, after, labels }: { before: Img; after: Img; labels: { before: string; after: string; drag: string } }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const move = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden bg-paper-2 md:aspect-[16/8]"
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
    >
      <Image src={after.src} alt={after.alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="100vw" className="object-cover grayscale" />
      </div>
      <span className="eyebrow absolute left-4 top-4 bg-paper/90 px-3 py-2 text-[0.6rem]">{labels.before}</span>
      <span className="eyebrow absolute right-4 top-4 bg-ink/85 px-3 py-2 text-[0.6rem] text-paper">{labels.after}</span>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-paper" />
        <div className="absolute top-1/2 left-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-lg">
          <span className="eyebrow text-[0.55rem]">{labels.drag}</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${labels.before} / ${labels.after}`}
        className="sr-only"
      />
    </div>
  );
}
