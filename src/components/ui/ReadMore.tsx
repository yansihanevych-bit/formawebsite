"use client";
import { useState, type ReactNode } from "react";

export function ReadMore({ children, more, labels }: { children: ReactNode; more: ReactNode; labels: { more: string; less: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {children}
      <div className={`grid transition-[grid-template-rows] duration-500 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">{more}</div>
      </div>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className="eyebrow mt-6 inline-flex items-center gap-3 text-[0.65rem]">
        <span className="link-u">{open ? labels.less : labels.more}</span>
        <span aria-hidden>{open ? "−" : "+"}</span>
      </button>
    </div>
  );
}
