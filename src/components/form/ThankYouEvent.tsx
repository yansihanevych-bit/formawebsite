"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Событие конверсии generate_lead: параметры кладёт форма в sessionStorage перед редиректом */
export function ThankYouEvent() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("fb_lead");
      if (!raw) return;
      sessionStorage.removeItem("fb_lead");
      track("generate_lead", JSON.parse(raw));
    } catch {}
  }, []);
  return null;
}
