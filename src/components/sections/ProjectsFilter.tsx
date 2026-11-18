"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/content/projects";
import type { Dict } from "@/dictionaries";
import { t, type Locale } from "@/lib/i18n";
import { EditorialGrid } from "./Editorial";
import { ProjectsMap } from "./ProjectsMap";
import { ProjectIcon } from "@/components/ui/ProjectIcon";

type Opt = { id: string; label: string };
type Filters = { s: string; svc: string; kind: string; status: string };
const ALL = "all";

/**
 * Архив проектов (по мотивам OMA / BIG): фильтры по клиенту, услуге, типу и статусу,
 * три вида — галерея, список, карта. Фильтры сохраняются в URL (?s=&svc=&kind=&status=&view=).
 */
export function ProjectsFilter({
  items,
  lang,
  t: tx,
  segments,
  services,
}: {
  items: Project[];
  lang: Locale;
  t: Dict["explorer"];
  segments: Opt[];
  services: Opt[];
}) {
  const [f, setF] = useState<Filters>({ s: ALL, svc: ALL, kind: ALL, status: ALL });
  const [view, setView] = useState<"grid" | "list" | "map">("grid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление фильтров из URL
    setF({ s: q.get("s") || ALL, svc: q.get("svc") || ALL, kind: q.get("kind") || ALL, status: q.get("status") || ALL });
    const v = q.get("view");
    if (v === "list" || v === "map") setView(v);
  }, []);

  const sync = (nf: Filters, nv = view) => {
    const q = new URLSearchParams();
    Object.entries(nf).forEach(([k, v]) => v !== ALL && q.set(k, v));
    if (nv !== "grid") q.set("view", nv);
    history.replaceState(null, "", `${location.pathname}${q.toString() ? `?${q}` : ""}`);
  };
  const pick = (k: keyof Filters, v: string) => {
    const nf = { ...f, [k]: f[k] === v ? ALL : v };
    setF(nf);
    sync(nf);
  };
  const changeView = (v: typeof view) => {
    setView(v);
    sync(f, v);
  };

  const shown = useMemo(
    () =>
      items.filter(
        (p) =>
          (f.s === ALL || p.segments.includes(f.s as Project["segments"][number])) &&
          (f.svc === ALL || p.services.includes(f.svc as Project["services"][number])) &&
          (f.kind === ALL || p.kind === f.kind) &&
          (f.status === ALL || p.status === f.status)
      ),
    [items, f]
  );
  const activeCount = Object.values(f).filter((v) => v !== ALL).length;

  const groups: { k: keyof Filters; title: string; opts: Opt[] }[] = [
    { k: "s", title: tx.client, opts: segments },
    { k: "svc", title: tx.service, opts: services },
    { k: "kind", title: tx.type, opts: (Object.keys(tx.kinds) as (keyof typeof tx.kinds)[]).map((id) => ({ id, label: tx.kinds[id] })) },
    { k: "status", title: tx.status, opts: [{ id: "completed", label: tx.completed }, { id: "inProgress", label: tx.inProgress }] },
  ];

  return (
    <>
      {/* панель управления */}
      <div className="sticky top-16 z-20 -mx-[clamp(1.25rem,4vw,4rem)] mb-12 border-y border-line bg-paper/85 px-[clamp(1.25rem,4vw,4rem)] py-4 backdrop-blur-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="meta flex items-center gap-3">
            <span className="text-accent">[ {open ? "−" : "+"} ]</span> {tx.filters}
            {activeCount > 0 && <span className="bg-accent px-1.5 py-0.5 text-[0.55rem] text-white">{activeCount}</span>}
          </button>
          <p className="meta tabular-nums text-muted">
            {String(shown.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")} {tx.results}
          </p>
          <div className="flex items-center gap-1" role="tablist" aria-label="View">
            {(["grid", "list", "map"] as const).map((v) => (
              <button key={v} type="button" role="tab" aria-selected={view === v} onClick={() => changeView(v)} className={`meta border px-3 py-2 transition-colors ${view === v ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}>
                {tx.views[v]}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className="grid gap-6 pt-6 md:grid-cols-2 xl:grid-cols-4">
                {groups.map((g) => (
                  <div key={g.k}>
                    <p className="meta mb-3 text-muted">— {g.title}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.opts.map((o) => (
                        <button key={o.id} type="button" aria-pressed={f[g.k] === o.id} onClick={() => pick(g.k, o.id)} className={`border px-3 py-1.5 text-sm transition-colors ${f[g.k] === o.id ? "border-accent bg-accent text-white" : "border-line hover:border-ink"}`}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const nf = { s: ALL, svc: ALL, kind: ALL, status: ALL };
                    setF(nf);
                    sync(nf);
                  }}
                  className="meta mt-5 text-accent"
                >
                  {tx.reset} ✕
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {shown.length === 0 && <p className="py-20 text-center text-muted">{tx.empty}</p>}

      {view === "grid" && shown.length > 0 && <EditorialGrid key={JSON.stringify(f)} items={shown} lang={lang} />}

      {view === "list" && shown.length > 0 && (
        <div className="border-t border-ink">
          <div className="meta hidden grid-cols-[3rem_2fr_1fr_1fr_6rem_6rem_7rem] gap-4 border-b border-line py-3 text-muted md:grid">
            <span />
            <span>{tx.project}</span>
            <span>{tx.location}</span>
            <span>{tx.type}</span>
            <span>m²</span>
            <span>{tx.year}</span>
            <span>{tx.status}</span>
          </div>
          {shown.map((p, k) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.04 }}>
              <Link href={`/${lang}/projects/${p.slug}`} className="group grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-concrete/25 md:grid-cols-[3rem_2fr_1fr_1fr_6rem_6rem_7rem]">
                <ProjectIcon slug={p.slug} className="h-10 w-10 transition-colors group-hover:text-accent" />
                <span className="font-display text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">{t(p.title, lang)}</span>
                <span className="col-start-2 text-sm text-muted md:col-start-auto">{p.location}</span>
                <span className="hidden text-sm md:block">{t(p.propertyType, lang).split("·")[0]}</span>
                <span className="hidden text-sm tabular-nums md:block">{p.area.toLocaleString(lang)}</span>
                <span className="hidden text-sm tabular-nums md:block">{p.year}</span>
                <span className={`meta hidden md:block ${p.status === "completed" ? "text-muted" : "text-accent"}`}>{p.status === "completed" ? tx.completed : tx.inProgress}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {view === "map" && shown.length > 0 && <ProjectsMap items={shown} lang={lang} labels={{ completed: tx.completed, inProgress: tx.inProgress, open: tx.open }} />}
    </>
  );
}
