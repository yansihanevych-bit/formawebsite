"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import type { Img } from "@/content/images";
import { Arrow } from "@/components/ui/Arrow";
import { rememberSegment } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { useFinePointer } from "@/lib/useFinePointer";

type Item = { id: string; n: string; who: string; title: string; href: string; img: Img };

/**
 * Choose your path: на десктопе превью роли плывёт за курсором с инерцией,
 * строка сдвигается на 12px, номер подсвечивается. На тач-устройствах — обычный список.
 */
export function SegmentList({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  const fine = useFinePointer();
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div ref={box} className="relative" onMouseMove={fine ? onMove : undefined} onMouseLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {items.map((it, k) => {
          const on = active === k;
          return (
            <li key={it.id} className="relative border-b border-line">
              <span aria-hidden className={`absolute -bottom-px left-0 h-px w-full origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "scale-x-100" : "scale-x-0"}`} />
              <Link
                href={it.href}
                data-cursor="Explore"
                onMouseEnter={() => setActive(k)}
                onFocus={() => setActive(k)}
                onClick={() => {
                  rememberSegment(it.id);
                  track("segment_select", { client_type: it.id, position: "home_list" });
                }}
                className={`group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-7 transition-opacity duration-500 md:grid-cols-[4rem_1fr_1fr_auto] md:py-9 ${
                  active !== null && !on ? "md:opacity-40" : ""
                }`}
              >
                <span className={`meta transition-colors duration-300 ${on ? "text-accent" : "text-muted"}`}>{it.n}</span>
                <span className={`block font-display text-[clamp(1.2rem,2.6vw,2.6rem)] uppercase leading-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "translate-x-3" : ""}`}>
                  {it.who}
                </span>
                <span className="col-start-2 text-sm text-muted md:col-start-3 md:pl-8">{it.title}</span>
                <Arrow className={`col-start-3 row-start-1 transition-all duration-500 md:col-start-4 ${on ? "-translate-y-0.5 translate-x-0.5 text-accent" : ""}`} />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* превью за курсором */}
      {fine && (
        <motion.div className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                className="absolute -left-[150px] -top-[190px] h-[380px] w-[300px] overflow-hidden bg-paper-2 shadow-2xl"
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(10% 10% 10% 10%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div className="absolute inset-0" initial={{ scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                  <Image src={items[active].img.src} alt="" fill sizes="300px" className="object-cover" />
                </motion.div>
                <span className="meta absolute bottom-3 left-3 bg-warm px-2 py-1 text-graphite">{items[active].n}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
