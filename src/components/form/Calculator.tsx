"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import type { Dict } from "@/dictionaries";
import { bcp47, type Locale } from "@/lib/i18n";
import { AREA_MAX, AREA_MIN, DELIVERABLES, PROPERTY, RENDER_QTY, ROLES, estimate, type CalcInput, type Deliverable } from "@/lib/calc";
import { FileDrop, type FileRef } from "./FileDrop";
import { Corners } from "@/components/ui/Corners";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";
import { getAttribution, getSegment } from "@/lib/attribution";

const fmt = (n: number, lang: Locale) => n.toLocaleString(bcp47[lang]);

const RULER = "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 10%)";
const RULER_FINE = "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 2%)";

/** Шаг калькулятора: контурный номер, заголовок капсом, отметка «готово» */
function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: React.ReactNode }) {
  return (
    <section className="relative border-t border-line py-10 first:border-t-0 first:pt-0 md:py-12">
      <div className="mb-7 flex items-center gap-5">
        <span className={`h-numeral text-4xl leading-none transition-colors duration-500 md:text-5xl ${done ? "text-accent" : "text-outline [--outline:var(--color-muted)]"}`}>0{n}</span>
        <h2 className="min-w-0 font-display text-lg uppercase leading-tight md:text-2xl">{title}</h2>
        <span className={`ml-auto flex h-7 w-7 shrink-0 items-center justify-center border text-xs transition-all duration-500 ${done ? "border-accent bg-accent text-white" : "border-line text-transparent"}`} aria-hidden>
          ✓
        </span>
      </div>
      {children}
    </section>
  );
}

function Opt({ on, onClick, idx, children }: { on: boolean; onClick: () => void; idx?: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`group relative flex min-h-[4.5rem] w-full flex-col justify-between gap-3 border px-4 py-3.5 text-left transition-all duration-300 ${
        on ? "border-accent bg-accent text-white" : "border-line hover:-translate-y-0.5 hover:border-ink"
      }`}
    >
      {idx && <span className={`meta ${on ? "text-white/70" : "text-muted"}`}>{idx}</span>}
      <span className="font-display text-sm uppercase leading-tight">{children}</span>
    </button>
  );
}

/** Живой план: квадрат площадью ≈ area, с размерными линиями и чертёжной сеткой */
function LivePlan({ area, lang }: { area: number; lang: Locale }) {
  const side = Math.sqrt(Math.max(area, 1));
  const max = Math.sqrt(AREA_MAX);
  const k = Math.min(1, side / max);
  const size = 22 + k * 70; // % контейнера
  return (
    <div className="relative aspect-square w-full overflow-hidden border border-line bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-[size:8.333%_8.333%]">
      <motion.div
        className="absolute left-1/2 top-1/2 border-2 border-accent bg-accent/10"
        animate={{ width: `${size}%`, height: `${size}%`, x: "-50%", y: "-50%" }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        <span className="meta absolute inset-0 flex items-center justify-center whitespace-nowrap text-accent">{fmt(area, lang)} m²</span>
        <span className="meta absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-muted">≈ {side.toFixed(1)} m</span>
        <span className="meta absolute -left-2 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap text-muted [writing-mode:vertical-rl] rotate-180">≈ {side.toFixed(1)} m</span>
      </motion.div>
      <span className="meta absolute bottom-2 right-3 text-muted">1:{Math.round(50 + k * 150)}</span>
    </div>
  );
}

export function Calculator({ lang, t, ff, formT, email }: { lang: Locale; t: Dict["calc"]; ff: Dict["ff"]; formT: Dict["form"]; email: string }) {
  const [inp, setInp] = useState<CalcInput>({ role: "", property: "", area: 120, deliverables: ["concept", "renders"], renderQty: "4-6" });
  // сегмент, выбранный ранее на сайте, подставляем после монтирования (без расхождения SSR/клиент)
  useEffect(() => {
    const seg = getSegment();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- однократное чтение cookie
    if (seg && (ROLES as readonly string[]).includes(seg)) setInp((s) => ({ ...s, role: s.role || (seg as CalcInput["role"]) }));
  }, []);
  const [contact, setContact] = useState({ name: "", phone: "", email: "", gdpr: false });
  const [files, setFiles] = useState<FileRef[]>([]);
  const [err, setErr] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [started, setStarted] = useState(false);
  const res = useMemo(() => estimate(inp), [inp]);
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-20% 0px -20% 0px" });

  const upd = (p: Partial<CalcInput>) => {
    if (!started) {
      setStarted(true);
      track("calculator_start");
    }
    setInp((s) => ({ ...s, ...p }));
  };
  const toggle = (d: Deliverable) => upd({ deliverables: inp.deliverables.includes(d) ? inp.deliverables.filter((x) => x !== d) : [...inp.deliverables, d] });

  const done = [!!inp.role, !!inp.property, inp.area >= AREA_MIN, inp.deliverables.length > 0];
  const progress = done.filter(Boolean).length / 4;
  const price = res.onRequest ? `${t.onRequest}` : inp.deliverables.length ? `€ ${fmt(res.low, lang)} – € ${fmt(res.high, lang)}` : "—";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, boolean> = {};
    if (contact.name.trim().length < 2) er.name = true;
    if (contact.phone.trim().length < 5) er.phone = true;
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) er.email = true;
    if (!contact.gdpr) er.gdpr = true;
    setErr(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/quick", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "calculator",
          ...contact,
          budget: price,
          files,
          language: lang,
          calc: { ...inp, ...res, lines: undefined },
          page: location.pathname,
          attribution: getAttribution(),
        }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error();
      setState("sent");
      track("generate_lead", { form: "calculator", lead_id: j.id, locale: lang, client_type: inp.role, value: res.low, currency: "EUR" });
    } catch {
      setState("error");
    }
  };

  const field = "w-full border border-line bg-transparent px-4 py-3.5 outline-none transition-colors focus:border-accent";

  return (
    <div ref={root} className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      {/* шаги + линия прогресса */}
      <div className="relative min-w-0 lg:col-span-7">
        <div className="absolute -left-6 bottom-0 top-0 hidden w-px bg-line md:block" aria-hidden>
          <motion.div className="w-px origin-top bg-accent" style={{ height: "100%" }} animate={{ scaleY: progress }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
        </div>

        <Step n={1} title={t.steps[0]} done={done[0]}>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {ROLES.map((r, i) => (
              <Opt key={r} idx={String.fromCharCode(65 + i)} on={inp.role === r} onClick={() => upd({ role: r })}>
                {t.roles[r]}
              </Opt>
            ))}
          </div>
        </Step>

        <Step n={2} title={t.steps[1]} done={done[1]}>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {PROPERTY.map((p, i) => (
              <Opt key={p} idx={String.fromCharCode(65 + i)} on={inp.property === p} onClick={() => upd({ property: p })}>
                {t.property[p]}
              </Opt>
            ))}
          </div>
        </Step>

        <Step n={3} title={t.steps[2]} done={done[2]}>
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
            <label className="flex items-baseline gap-3">
              <input
                type="number"
                inputMode="numeric"
                min={AREA_MIN}
                max={AREA_MAX}
                value={inp.area}
                onChange={(e) => upd({ area: Math.max(1, Math.min(AREA_MAX * 4, Number(e.target.value) || 0)) })}
                className="h-numeral w-[4.2ch] bg-transparent text-[clamp(3.5rem,9vw,7.5rem)] leading-none tabular-nums outline-none [appearance:textfield] focus:text-accent [&::-webkit-inner-spin-button]:appearance-none"
                aria-label={t.steps[2]}
              />
              <span className="font-display text-3xl">m²</span>
            </label>
            <span className="meta pb-3 text-muted">{t.areaHint}</span>
          </div>
          <div className="relative mt-8">
            <div className="pointer-events-none absolute inset-x-0 -top-3 h-3 text-ink/30" style={{ backgroundImage: RULER_FINE }} aria-hidden />
            <div className="pointer-events-none absolute inset-x-0 -top-5 h-5 text-ink/50" style={{ backgroundImage: RULER }} aria-hidden />
            <input
              type="range"
              min={AREA_MIN}
              max={AREA_MAX}
              step={10}
              value={Math.min(inp.area, AREA_MAX)}
              onChange={(e) => upd({ area: Number(e.target.value) })}
              className="range-accent w-full"
              style={{ ["--p" as string]: `${((Math.min(inp.area, AREA_MAX) - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100}%` }}
              aria-label={t.steps[2]}
            />
          </div>
          <div className="meta mt-2 flex justify-between text-muted">
            <span>{AREA_MIN} m²</span>
            <span>{fmt(AREA_MAX, lang)}+ m²</span>
          </div>
        </Step>

        <Step n={4} title={t.steps[3]} done={done[3]}>
          <div className="border-t border-line">
            {DELIVERABLES.map((d) => {
              const on = inp.deliverables.includes(d);
              const line = res.lines.find((l) => l.id === d);
              return (
                <div key={d}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(d)}
                    className={`group flex w-full items-center justify-between gap-4 border-b py-4 text-left transition-colors ${on ? "border-accent" : "border-line hover:border-ink"}`}
                  >
                    <span className="flex min-w-0 items-center gap-4">
                      <span className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${on ? "border-accent bg-accent" : "border-ink/40"}`} aria-hidden>
                        <span className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all duration-300 ${on ? "left-[1.15rem] bg-white" : "left-1 bg-ink/50"}`} />
                      </span>
                      <span className={`min-w-0 transition-opacity ${on ? "" : "opacity-60 group-hover:opacity-100"}`}>{t.deliverables[d]}</span>
                    </span>
                    <AnimatePresence>
                      {on && line && !res.onRequest && (
                        <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="meta shrink-0 whitespace-nowrap text-accent">
                          € {fmt(line.price, lang)}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                  {d === "renders" && on && (
                    <div className="flex flex-wrap items-center gap-2 py-4 pl-[3.25rem]">
                      <span className="meta mr-2 text-muted">{t.renderQty}</span>
                      {RENDER_QTY.map((q) => (
                        <button key={q} type="button" aria-pressed={inp.renderQty === q} onClick={() => upd({ renderQty: q })} className={`border px-4 py-2 text-sm ${inp.renderQty === q ? "border-accent bg-accent text-white" : "border-line hover:border-ink"}`}>
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Step>

        <Step n={5} title={t.steps[4]} done={state === "sent"}>
          {state === "sent" ? (
            <div className="border border-accent p-8">
              <p className="meta text-accent">[ ✓ ]</p>
              <p className="mt-3 font-display text-2xl font-medium">{ff.sent}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <p className="text-muted">{t.getPdf}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <input aria-label={ff.name} placeholder={`${ff.name} *`} className={`${field} ${err.name ? "border-accent" : ""}`} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} autoComplete="name" />
                <input aria-label={ff.phone} placeholder={`${ff.phone} *`} type="tel" className={`${field} ${err.phone ? "border-accent" : ""}`} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} autoComplete="tel" />
              </div>
              <input aria-label={ff.email} placeholder={`${ff.email} *`} type="email" className={`${field} ${err.email ? "border-accent" : ""}`} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} autoComplete="email" />
              <FileDrop value={files} onChange={setFiles} maxMb={20} t={{ cta: ff.attachCta, hint: ff.attachHint, remove: ff.remove, tooBig: ff.tooBig, unavailable: formT.filesUnavailable, uploading: formT.uploading }} />
              <label className="flex cursor-pointer gap-3 text-sm text-muted">
                <input type="checkbox" checked={contact.gdpr} onChange={(e) => setContact({ ...contact, gdpr: e.target.checked })} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
                <span className={err.gdpr ? "text-accent" : ""}>{ff.gdpr}</span>
              </label>
              {state === "error" && (
                <p className="text-sm text-accent">
                  {ff.error} <a href={`mailto:${email}`} className="underline">{email}</a>
                </p>
              )}
              <button type="submit" disabled={state === "sending"} className="btn btn-solid justify-between disabled:opacity-60 md:w-fit">
                {state === "sending" ? ff.sending : t.send} <Arrow dir="right" />
              </button>
            </form>
          )}
        </Step>
      </div>

      {/* Живой дисплей: план, цена, сроки */}
      <aside className="min-w-0 lg:col-span-5">
        <div className="relative border border-ink p-6 md:p-8 lg:sticky lg:top-24">
          <Corners />
          <p className="meta flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> {t.summary}
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-1 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
            <div className="px-6 pt-6">
              <LivePlan area={inp.area} lang={lang} />
            </div>
            <dl className="space-y-2 self-end text-sm">
              <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[0]}</dt><dd className="text-right">{inp.role ? t.roles[inp.role] : "—"}</dd></div>
              <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[1]}</dt><dd className="text-right">{inp.property ? t.property[inp.property] : "—"}</dd></div>
              <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[2]}</dt><dd>{fmt(inp.area, lang)} m²</dd></div>
              <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[3]}</dt><dd>{inp.deliverables.length}</dd></div>
            </dl>
          </div>
          <p className="meta mt-8 text-muted">{t.budget}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={price}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 font-display text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.05] tracking-tight"
            >
              {inp.deliverables.length ? price : t.empty}
            </motion.p>
          </AnimatePresence>
          {inp.deliverables.length > 0 && !res.onRequest && (
            <div className="mt-6">
              <p className="meta flex justify-between text-muted">
                <span>{t.timing}</span>
                <span className="text-ink">
                  {res.daysMin}–{res.daysMax} {t.days}
                </span>
              </p>
              {/* шкала дней: заливка до минимума, штриховка до максимума */}
              <div className="mt-3 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-hidden>
                {Array.from({ length: 14 }, (_, i) => (
                  <motion.span
                    key={i}
                    className="h-2.5"
                    initial={false}
                    animate={{ opacity: i < res.daysMax ? 1 : 0.18 }}
                    style={{ background: i < res.daysMin ? "var(--color-accent)" : i < res.daysMax ? "repeating-linear-gradient(45deg, var(--color-accent) 0 2px, transparent 2px 5px)" : "var(--color-line)" }}
                  />
                ))}
              </div>
            </div>
          )}
          <p className="meta mt-6 text-[0.6rem] text-muted">{t.vat}</p>
        </div>
      </aside>

      {/* мобильная плашка с суммой */}
      <div className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-paper/90 px-5 py-3 backdrop-blur-lg transition-transform duration-500 lg:hidden ${inView ? "translate-y-0" : "translate-y-full"}`}>
        <span className="meta text-muted">{t.budget}</span>
        <span className="font-display text-lg font-medium">{inp.deliverables.length ? price : "—"}</span>
      </div>
    </div>
  );
}
