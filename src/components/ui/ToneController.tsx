"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Color Transitions: секции помечаются data-tone="milk|sand|walnut|rosso|olive".
 * Когда секция пересекает середину экрана, её тон становится тоном всей страницы (html[data-tone]);
 * цвета перетекают за счёт @property-переменных (см. globals.css).
 */
export function ToneController() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (!sections.length) {
      root.dataset.tone = "milk";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) root.dataset.tone = (e.target as HTMLElement).dataset.tone || "milk";
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    // начальное состояние — тон первой секции под серединой экрана
    const mid = window.innerHeight / 2;
    const cur = sections.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= mid && r.bottom >= mid;
    });
    root.dataset.tone = cur?.dataset.tone || "milk";
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
