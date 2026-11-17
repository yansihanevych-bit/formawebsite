"use client";
import { useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { EditorialGrid } from "./Editorial";

export function ProjectsFilter({ items, filters, allLabel, lang }: { items: Project[]; filters: { id: string; label: string }[]; allLabel: string; lang: Locale }) {
  const [f, setF] = useState<string>("all");
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("s");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- фильтр из URL при монтировании
    if (s && filters.some((x) => x.id === s)) setF(s);
  }, [filters]);
  const shown = items.filter((i) => f === "all" || i.segments.includes(f as Project["segments"][number]));
  return (
    <>
      <div className="mb-16 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-6" role="tablist">
        {[{ id: "all", label: allLabel }, ...filters].map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={f === x.id}
            onClick={() => setF(x.id)}
            className={`meta relative pb-1 transition-opacity ${f === x.id ? "opacity-100" : "opacity-45 hover:opacity-100"}`}
          >
            {x.label}
            <sup className="ml-1 text-[0.55rem]">{x.id === "all" ? items.length : items.filter((i) => i.segments.includes(x.id as Project["segments"][number])).length}</sup>
            <span className={`absolute inset-x-0 -bottom-[25px] h-px bg-ink transition-transform duration-500 ${f === x.id ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        ))}
      </div>
      <EditorialGrid key={f} items={shown} lang={lang} />
    </>
  );
}
