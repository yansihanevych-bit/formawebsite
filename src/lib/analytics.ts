"use client";

type DL = Record<string, unknown>;
declare global {
  interface Window {
    dataLayer?: DL[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Пуш события в dataLayer (GTM). Сам GTM грузится только после согласия (Consent Mode v2). */
export function track(event: string, params: DL = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
