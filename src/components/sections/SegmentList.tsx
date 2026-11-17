"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Img } from "@/content/images";
import { Arrow } from "@/components/ui/Arrow";
import { rememberSegment } from "@/lib/attribution";
import { track } from "@/lib/analytics";

type Item = { id: string; n: string; who: string; title: string; href: string; img: Img };

export function SegmentList({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="relative grid gap-10 md:grid-cols-12">
      <ul className="border-t border-line md:col-span-7">
        {items.map((it, k) => (
          <li key={it.id} className="border-b border-line">
            <Link
              href={it.href}
              onMouseEnter={() => setActive(k)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(k)}
              onClick={() => {
                rememberSegment(it.id);
                track("segment_select", { client_type: it.id, position: "home_list" });
              }}
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 md:py-9"
            >
              <span className="eyebrow text-[0.65rem] text-muted">{it.n}</span>
              <span>
                <span className="block font-display text-[clamp(1.5rem,2.8vw,2.6rem)] font-normal leading-tight transition-transform duration-500 group-hover:translate-x-2">
                  {it.who}
                </span>
                <span className="mt-1 block text-sm text-muted">{it.title}</span>
              </span>
              <Arrow className="transition-transform duration-500 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="relative hidden md:col-span-5 md:block">
        <div className="sticky top-28 aspect-[4/5] w-full overflow-hidden bg-paper-2">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active ?? 0}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={items[active ?? 0].img.src} alt="" fill sizes="40vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
