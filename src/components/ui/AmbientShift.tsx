"use client";
import { useEffect } from "react";

/**
 * Ambient Scroll Shift: фон страницы очень мягко «теплеет» по мере прокрутки —
 * от холодного архитектурного серого (чертежи) к тёплому средиземноморскому кремовому (рендеры, CTA).
 * Интерполирует CSS-переменную --paper; учитывает текущую тему.
 */
const PALETTE = {
  light: { from: [239, 240, 237], to: [244, 236, 223] }, // #eff0ed → #f4ecdf
  dark: { from: [16, 19, 20], to: [22, 18, 14] }, // #101314 → #16120e
};

export function AmbientShift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      const e = p * p * (3 - 2 * p); // smoothstep
      const pal = root.dataset.theme === "dark" ? PALETTE.dark : PALETTE.light;
      const c = pal.from.map((v, i) => Math.round(v + (pal.to[i] - v) * e));
      root.style.setProperty("--paper", `rgb(${c[0]} ${c[1]} ${c[2]})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // смена темы → пересчитать
    const mo = new MutationObserver(apply);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      cancelAnimationFrame(raf);
      root.style.removeProperty("--paper");
    };
  }, []);
  return null;
}
