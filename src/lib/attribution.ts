"use client";

export type Touch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landing?: string;
  ts?: string;
};

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
const DAYS = 90;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${DAYS * 86400}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
}
export function getCookie(name: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}
function read(name: string): Touch | undefined {
  try {
    const v = getCookie(name);
    return v ? (JSON.parse(v) as Touch) : undefined;
  } catch {
    return undefined;
  }
}

/** first-touch + last-touch атрибуция (first-party cookie, 90 дней). Технический cookie для обработки заявки. */
export function captureAttribution() {
  const p = new URLSearchParams(location.search);
  const touch: Touch = {};
  KEYS.forEach((k) => {
    const v = p.get(k);
    if (v) touch[k] = v.slice(0, 200);
  });
  const ref = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : undefined;
  const hasSignal = Object.keys(touch).length > 0 || !!ref;
  touch.referrer = ref;
  touch.landing = location.pathname + location.search;
  touch.ts = new Date().toISOString();

  if (!read("fb_first")) setCookie("fb_first", JSON.stringify(touch));
  if (hasSignal || !read("fb_last")) setCookie("fb_last", JSON.stringify(touch));
}

export function getAttribution() {
  return { first: read("fb_first"), last: read("fb_last") };
}

export function rememberSegment(id: string) {
  setCookie("fb_segment", id);
}
export function getSegment() {
  return getCookie("fb_segment");
}
