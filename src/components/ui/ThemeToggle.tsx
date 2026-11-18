"use client";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

type Theme = "light" | "dark";

export function ThemeToggle({ labels, className = "" }: { labels: { light: string; dark: string }; className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- тему уже выставил init-скрипт, синхронизируем состояние
    setTheme((document.documentElement.dataset.theme as Theme) || "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("fb_theme", next);
    } catch {}
    setTheme(next);
    track("theme_toggle", { theme: next });
  };

  const isDark = theme === "dark";
  const label = isDark ? labels.light : labels.dark;
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className={`group relative flex h-7 w-7 items-center justify-center ${className}`}>
      {/* полукруг: заливка поворачивается при смене темы */}
      <svg viewBox="0 0 20 20" className={`h-[15px] w-[15px] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${isDark ? "rotate-180" : ""}`} aria-hidden>
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 1.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
      </svg>
    </button>
  );
}
