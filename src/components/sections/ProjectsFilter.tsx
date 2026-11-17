"use client";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

type Item = { slug: string; segments: string[]; node: ReactNode };

export function ProjectsFilter({ items, filters, allLabel }: { items: Item[]; filters: { id: string; label: string }[]; allLabel: string }) {
  const [f, setF] = useState<string>("all");
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("s");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- фильтр из URL при монтировании
    if (s && filters.some((x) => x.id === s)) setF(s);
  }, [filters]);
  const shown = items.filter((i) => f === "all" || i.segments.includes(f));
  return (
    <>
      <div className="mb-14 flex flex-wrap gap-2" role="tablist">
        {[{ id: "all", label: allLabel }, ...filters].map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={f === x.id} data-on={f === x.id} onClick={() => setF(x.id)} className="chip">
            {x.label}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((i) => (
            <motion.div key={i.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {i.node}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
