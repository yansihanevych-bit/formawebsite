"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import type { Img } from "@/content/images";
import { Corners } from "@/components/ui/Corners";

/**
 * Before / After с инерционной шторкой (lerp) и техническими выносками на слое «до».
 * Мышь, палец (вертикальный скролл не блокируется), клавиатура через скрытый range.
 * Одна демонстрация движения при первом появлении. Ракурс и масштаб двух фото должны совпадать.
 */
const NOTES = [
  { x: 14, y: 30, w: 26, label: "6.40 m" },
  { x: 46, y: 62, w: 18, label: "4.20 m" },
  { x: 22, y: 78, w: 0, label: "h 2.90" },
  { x: 60, y: 22, w: 0, label: "↔ 120" },
];

export function BeforeAfter({ before, after, labels, scrub = false }: { before: Img; after: Img; labels: { before: string; after: string; drag: string }; scrub?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef(50);
  const current = useRef(50);
  const touched = useRef(false);
  const [pos, setPos] = useState(50);
  const [moving, setMoving] = useState(false);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inView = useInView(ref, { once: true, margin: "0px 0px -25% 0px" });
  const reduce = useReducedMotion();

  // lerp-цикл: показанная позиция догоняет целевую
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const d = target.current - current.current;
      if (Math.abs(d) > 0.05) {
        current.current += d * (reduce ? 1 : 0.14);
        setPos(current.current);
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  const nudge = useCallback((v: number) => {
    target.current = Math.min(100, Math.max(0, v));
    setMoving(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setMoving(false), 900);
  }, []);

  // scrub: пока пользователь не взял шторку, она «проявляет» рендер по мере прокрутки (чертёж → визуализация)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!scrub || touched.current || reduce) return;
    target.current = 92 - v * 84; // 92% → 8%
    setMoving(true);
    clearTimeout(idle.current);
    idle.current = setTimeout(() => setMoving(false), 700);
  });

  // демонстрация при первом появлении: 50 → 30 → 70 → 50 (если не scrub)
  useEffect(() => {
    if (!inView || reduce || scrub) return;
    const seq = [30, 70, 50];
    const timers = seq.map((v, i) => setTimeout(() => !touched.current && nudge(v), 300 + i * 650));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, nudge, scrub]);

  const fromPointer = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    touched.current = true;
    nudge(((clientX - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-paper-2 md:aspect-[16/8]"
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => (e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId) && fromPointer(e.clientX)}
    >
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 768px) 92vw, 100vw" className="pointer-events-none object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 768px) 92vw, 100vw" className="pointer-events-none object-cover grayscale" />
        {/* технические выноски: проявляются, пока шторка движется */}
        <svg className={`absolute inset-0 h-full w-full text-warm transition-opacity duration-500 ${moving ? "opacity-100" : "opacity-0"}`} aria-hidden>
          {NOTES.map((n, i) => (
            <g key={i}>
              {n.w > 0 ? (
                <>
                  <line x1={`${n.x}%`} y1={`${n.y}%`} x2={`${n.x + n.w}%`} y2={`${n.y}%`} stroke="currentColor" strokeWidth="1" />
                  <line x1={`${n.x}%`} y1={`${n.y - 1.5}%`} x2={`${n.x}%`} y2={`${n.y + 1.5}%`} stroke="currentColor" />
                  <line x1={`${n.x + n.w}%`} y1={`${n.y - 1.5}%`} x2={`${n.x + n.w}%`} y2={`${n.y + 1.5}%`} stroke="currentColor" />
                </>
              ) : (
                <circle cx={`${n.x}%`} cy={`${n.y}%`} r="4" fill="none" stroke="currentColor" />
              )}
              <text x={`${n.x + (n.w ? n.w / 2 : 1.2)}%`} y={`${n.y - 2}%`} fill="currentColor" fontSize="12" letterSpacing="1.5" textAnchor={n.w ? "middle" : "start"} fontFamily="var(--font-display)">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <Corners tone="warm" className="absolute inset-2 z-10" />
      <span className="meta absolute left-4 top-4 bg-warm px-3 py-2 text-graphite md:left-6 md:top-6">{labels.before}</span>
      <span className="meta absolute bottom-4 right-4 bg-graphite px-3 py-2 text-warm md:bottom-6 md:right-6">{labels.after}</span>
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-[2px] bg-warm" />
        <div className="absolute left-0 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border border-white/60 bg-warm/20 text-warm backdrop-blur-md">
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
          nudge(Number(e.target.value));
        }}
        aria-label={`${labels.before} / ${labels.after} — ${labels.drag}`}
        className="sr-only"
      />
    </div>
  );
}
