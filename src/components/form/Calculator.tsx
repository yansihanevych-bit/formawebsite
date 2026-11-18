"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { AREA_MAX, AREA_MIN, DELIVERABLES, PROPERTY, RENDER_QTY, ROLES, estimate, type CalcInput, type Deliverable } from "@/lib/calc";
import { FileDrop, type FileRef } from "./FileDrop";
import { Corners } from "@/components/ui/Corners";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";
import { getAttribution, getSegment } from "@/lib/attribution";

const fmt = (n: number, lang: Locale) => n.toLocaleString(lang === "en" ? "en-GB" : lang === "ru" ? "ru-RU" : "it-IT");

/** Шаг калькулятора: номер, заголовок, отметка «готово» */
function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: React.ReactNode }) {
  return (
    <section className="relative border-t border-line py-10 first:border-t-0 first:pt-0">
      <div className="mb-6 flex items-baseline gap-4">
        <span className={`meta transition-colors ${done ? "text-accent" : "text-muted"}`}>0{n}</span>
        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">{title}</h2>
        {done && <span className="meta ml-auto text-accent">[ ✓ ]</span>}
      </div>
      {children}
    </section>
  );
}

function Opt({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`group relative w-full border px-5 py-4 text-left transition-colors duration-300 ${on ? "border-accent bg-accent/10" : "border-line hover:border-ink"}`}
    >
      <Corners className={on ? "opacity-100" : "opacity-0 transition-opacity group-hover:opacity-100"} />
      {children}
    </button>
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
    <div className="grid gap-12 lg:grid-cols-12">
      {/* шаги + линия прогресса */}
      <div className="relative lg:col-span-7">
        <div className="absolute -left-6 bottom-0 top-0 hidden w-px bg-line md:block" aria-hidden>
          <motion.div className="w-px origin-top bg-accent" style={{ height: "100%" }} animate={{ scaleY: progress }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
        </div>

        <Step n={1} title={t.steps[0]} done={done[0]}>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <Opt key={r} on={inp.role === r} onClick={() => upd({ role: r })}>
                {t.roles[r]}
              </Opt>
            ))}
          </div>
        </Step>

        <Step n={2} title={t.steps[1]} done={done[1]}>
          <div className="grid gap-2 sm:grid-cols-2">
            {PROPERTY.map((p) => (
              <Opt key={p} on={inp.property === p} onClick={() => upd({ property: p })}>
                {t.property[p]}
              </Opt>
            ))}
          </div>
        </Step>

        <Step n={3} title={t.steps[2]} done={done[2]}>
          <div className="flex items-end gap-6">
            <label className="flex items-baseline gap-2">
              <input
                type="number"
                inputMode="numeric"
                min={AREA_MIN}
                max={AREA_MAX}
                value={inp.area}
                onChange={(e) => upd({ area: Math.max(1, Math.min(AREA_MAX * 4, Number(e.target.value) || 0)) })}
                className="w-36 border-b border-ink bg-transparent font-display text-5xl font-medium tracking-tight outline-none focus:border-accent"
                aria-label={t.steps[2]}
              />
              <span className="font-display text-2xl">m²</span>
            </label>
            <span className="meta pb-2 text-muted">{t.areaHint}</span>
          </div>
          <input
            type="range"
            min={AREA_MIN}
            max={AREA_MAX}
            step={10}
            value={Math.min(inp.area, AREA_MAX)}
            onChange={(e) => upd({ area: Number(e.target.value) })}
            className="range-accent mt-8 w-full"
            style={{ ["--p" as string]: `${((Math.min(inp.area, AREA_MAX) - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100}%` }}
            aria-label={t.steps[2]}
          />
          <div className="meta mt-2 flex justify-between text-muted">
            <span>{AREA_MIN} m²</span>
            <span>{fmt(AREA_MAX, lang)}+ m²</span>
          </div>
        </Step>

        <Step n={4} title={t.steps[3]} done={done[3]}>
          <div className="grid gap-2">
            {DELIVERABLES.map((d) => {
              const on = inp.deliverables.includes(d);
              const line = res.lines.find((l) => l.id === d);
              return (
                <div key={d}>
                  <Opt on={on} onClick={() => toggle(d)}>
                    <span className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span className={`flex h-4 w-4 items-center justify-center border text-[10px] ${on ? "border-accent bg-accent text-white" : "border-ink/40"}`}>{on ? "✓" : ""}</span>
                        {t.deliverables[d]}
                      </span>
                      {on && line && !res.onRequest && <span className="meta shrink-0 whitespace-nowrap text-muted">€ {fmt(line.price, lang)}</span>}
                    </span>
                  </Opt>
                  {d === "renders" && on && (
                    <div className="mt-2 flex flex-wrap items-center gap-2 pl-5">
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

      {/* Live Estimate Summary */}
      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="group relative border border-ink p-7 lg:sticky lg:top-28">
          <Corners />
          <p className="meta flex items-center gap-2 text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> {t.summary}
          </p>
          <dl className="mt-6 space-y-2 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[0]}</dt><dd>{inp.role ? t.roles[inp.role] : "—"}</dd></div>
            <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[1]}</dt><dd>{inp.property ? t.property[inp.property] : "—"}</dd></div>
            <div className="flex justify-between gap-4 border-b border-line pb-2"><dt className="text-muted">{t.steps[2]}</dt><dd>{fmt(inp.area, lang)} m²</dd></div>
          </dl>
          <p className="meta mt-8 text-muted">{t.budget}</p>
          <AnimatePresence mode="wait">
            <motion.p key={price} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-2 font-display text-[clamp(1.8rem,2.6vw,2.5rem)] font-medium leading-tight tracking-tight">
              {inp.deliverables.length ? price : t.empty}
            </motion.p>
          </AnimatePresence>
          {inp.deliverables.length > 0 && !res.onRequest && (
            <p className="mt-4 text-sm">
              <span className="meta mr-2 text-muted">{t.timing}</span>
              {res.daysMin}–{res.daysMax} {t.days}
            </p>
          )}
          <p className="meta mt-6 text-[0.6rem] text-muted">{t.vat}</p>
        </div>
      </aside>

      {/* мобильная плашка с суммой */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-paper/90 px-5 py-3 backdrop-blur-lg lg:hidden">
        <span className="meta text-muted">{t.budget}</span>
        <span className="font-display text-lg font-medium">{inp.deliverables.length ? price : "—"}</span>
      </div>
    </div>
  );
}
