"use client";
import { useEffect } from "react";
import { rememberSegment } from "@/lib/attribution";

/** Запоминает сегмент посадочной — он подставится в форму заявки */
export function SegmentTracker({ id }: { id: string }) {
  useEffect(() => rememberSegment(id), [id]);
  return null;
}
