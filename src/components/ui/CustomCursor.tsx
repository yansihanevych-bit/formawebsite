"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useFinePointer } from "@/lib/useFinePointer";

/**
 * Архитектурный курсор-перекрестие с меткой и координатами.
 * Включается над элементами с data-cursor="<метка>". Только мышь/трекпад; на тач-устройствах — нет.
 */
export function CustomCursor() {
  const fine = useFinePointer();
  const pathname = usePathname();
  const [label, setLabel] = useState<string | null>(null);
  const last = useRef({ x: -100, y: -100 });

  // смена страницы: метку прячем; при прокрутке — пересчитываем элемент под курсором
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- сброс при навигации
    setLabel(null);
  }, [pathname]);
  useEffect(() => {
    if (!fine) return;
    const onScroll = () => {
      const el = document.elementFromPoint(last.current.x, last.current.y)?.closest<HTMLElement>("[data-cursor]");
      setLabel(el ? el.dataset.cursor || "" : null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [fine]);
  const [coords, setCoords] = useState("X 0000 · Y 0000");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("custom-cursor");
    let target: HTMLElement | null = null;
    const onMove = (e: PointerEvent) => {
      last.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (el !== target) {
        target = el;
        setLabel(el ? el.dataset.cursor || "" : null);
      }
      if (el) {
        const r = el.getBoundingClientRect();
        const px = String(Math.round(e.clientX - r.left)).padStart(4, "0");
        const py = String(Math.round(e.clientY - r.top)).padStart(4, "0");
        setCoords(`X ${px} · Y ${py}`);
      }
    };
    const onLeave = () => setLabel(null);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <motion.div className="pointer-events-none fixed left-0 top-0 z-[90] text-warm mix-blend-difference" style={{ x: sx, y: sy }} aria-hidden>
      <AnimatePresence>
        {label !== null && (
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
            {/* перекрестие */}
            <span className="absolute -left-10 top-0 h-px w-20 bg-current" />
            <span className="absolute -top-10 left-0 h-20 w-px bg-current" />
            <span className="absolute -left-[5px] -top-[5px] h-[11px] w-[11px] rounded-full border border-current" />
            <span className="meta absolute left-4 top-3 whitespace-nowrap text-[0.62rem]">[ {label} ]</span>
            <span className="meta absolute left-4 top-8 whitespace-nowrap text-[0.55rem] tabular-nums opacity-70">{coords}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
