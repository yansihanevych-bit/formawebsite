"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { upload } from "@vercel/blob/client";
import type { Dict } from "@/dictionaries";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";
import { getAttribution, getSegment } from "@/lib/attribution";

type Opt = { id: string; label: string };
type FileRef = { url: string; name: string; size: number };
type Uploading = { name: string; progress: number; error?: boolean };

type State = {
  clientType: string;
  country: string;
  city: string;
  propertyType: string;
  area: string;
  condition: string;
  services: string[];
  deadline: string;
  budget: string;
  files: FileRef[];
  comment: string;
  answers: Record<string, string>;
  name: string;
  company: string;
  email: string;
  phone: string;
  messenger: string;
  messengerHandle: string;
  language: string;
  gdpr: boolean;
  marketing: boolean;
  plan: string;
  track: string;
};

const DRAFT = "fb_draft_v1";
const TOWNS = ["Sanremo", "Bordighera", "Ospedaletti", "Ventimiglia", "Imperia", "Taggia", "Arma di Taggia", "Vallecrosia", "Camporosso", "Dolceacqua", "Menton", "Monaco", "Nice"];
const COUNTRIES = ["Italia", "France", "Monaco", "Switzerland", "Germany", "United Kingdom"];
const MESSENGERS = ["WhatsApp", "Telegram", "Signal", "Viber"];

type Props = {
  lang: "it" | "en";
  t: Dict["form"];
  clientTypes: Opt[];
  services: Opt[];
  questions: Record<string, { it: string; en: string }[]>;
  contactEmail: string;
};

function Label({ children, req, htmlFor }: { children: React.ReactNode; req?: boolean; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow mb-4 block text-[0.62rem] text-muted">
      {children}
      {req && <span className="text-accent"> *</span>}
    </label>
  );
}
function Err({ show, text }: { show?: boolean; text: string }) {
  return show ? <p className="mt-2 text-xs text-accent">{text}</p> : null;
}
function Chips({ opts, value, onPick }: { opts: Opt[]; value: string | string[]; onPick: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => {
        const on = Array.isArray(value) ? value.includes(o.id) : value === o.id;
        return (
          <button key={o.id} type="button" data-on={on} aria-pressed={on} onClick={() => onPick(o.id)} className="chip">
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function LeadForm({ lang, t, clientTypes, services, questions, contactEmail }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [s, setS] = useState<State>({
    clientType: "",
    country: "Italia",
    city: "",
    propertyType: "",
    area: "",
    condition: "",
    services: [],
    deadline: "",
    budget: "",
    files: [],
    comment: "",
    answers: {},
    name: "",
    company: "",
    email: "",
    phone: "",
    messenger: "WhatsApp",
    messengerHandle: "",
    language: lang,
    gdpr: false,
    marketing: false,
    plan: "",
    track: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [uploadsEnabled, setUploadsEnabled] = useState<boolean | null>(null);
  const [uploading, setUploading] = useState<Uploading[]>([]);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hp, setHp] = useState("");
  const started = useRef(false);
  const top = useRef<HTMLDivElement>(null);

  // init: черновик + параметры URL + сегмент из cookie
  useEffect(() => {
    let draft: Partial<State> = {};
    try {
      draft = JSON.parse(localStorage.getItem(DRAFT) || "{}");
    } catch {}
    const q = new URLSearchParams(location.search);
    const type = q.get("type") || draft.clientType || getSegment() || "";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- однократное чтение localStorage/URL при монтировании
    setS((p) => ({
      ...p,
      ...draft,
      clientType: clientTypes.some((c) => c.id === type) ? type : p.clientType,
      email: q.get("email") || draft.email || p.email,
      plan: q.get("plan") || draft.plan || "",
      track: q.get("track") || draft.track || "",
      gdpr: false,
    }));
    fetch("/api/upload")
      .then((r) => r.json())
      .then((j) => setUploadsEnabled(!!j.enabled))
      .catch(() => setUploadsEnabled(false));
  }, [clientTypes]);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { gdpr, ...rest } = s;
      localStorage.setItem(DRAFT, JSON.stringify(rest));
    } catch {}
  }, [s]);

  const set = useCallback(<K extends keyof State>(k: K, v: State[K]) => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "start" });
    }
    setS((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  }, []);

  const toggle = (k: "services", v: string) => set(k, s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v]);

  const qs = useMemo(() => (questions[s.clientType] || []).slice(0, 5), [questions, s.clientType]);

  const required: (keyof State)[][] = [
    ["clientType", "country"],
    ["propertyType", "area"],
    ["services"],
    [],
    ["name", "email", "gdpr"],
  ];

  const validate = (k: number) => {
    const e: Record<string, boolean> = {};
    required[k].forEach((f) => {
      const v = s[f];
      if (Array.isArray(v) ? v.length === 0 : !v) e[f] = true;
    });
    if (k === 1 && s.area && !(Number(s.area) > 0)) e.area = true;
    if (k === 4 && s.email && !/^\S+@\S+\.\S+$/.test(s.email)) e.email = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const go = (to: number) => {
    if (to > step && !validate(step)) return;
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "start" });
    }
    setDir(to > step ? 1 : -1);
    setStep(to);
    track("form_step", { step: to + 1, client_type: s.clientType });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onFiles = async (list: FileList | null) => {
    if (!list || !uploadsEnabled) return;
    const room = 10 - s.files.length;
    const arr = Array.from(list).slice(0, room).filter((f) => f.size <= 50 * 1024 * 1024);
    for (const f of arr) {
      setUploading((u) => [...u, { name: f.name, progress: 0 }]);
      try {
        const safe = f.name.replace(/[^\w.\-]+/g, "_").slice(-80);
        const blob = await upload(`leads/${new Date().toISOString().slice(0, 10)}/${safe}`, f, {
          access: "public",
          handleUploadUrl: "/api/upload",
          onUploadProgress: ({ percentage }) => setUploading((u) => u.map((x) => (x.name === f.name ? { ...x, progress: percentage } : x))),
        });
        setS((p) => ({ ...p, files: [...p.files, { url: blob.url, name: f.name, size: f.size }] }));
        setUploading((u) => u.filter((x) => x.name !== f.name));
        track("file_upload", { file_type: f.type || "unknown" });
      } catch {
        setUploading((u) => u.map((x) => (x.name === f.name ? { ...x, error: true } : x)));
      }
    }
  };

  const submit = async () => {
    if (!validate(4)) return;
    setSending(true);
    setFailed(false);
    const payload = {
      ...s,
      area: Number(s.area),
      answers: qs.map((q, k) => ({ q: q[lang], a: s.answers[k] || "" })).filter((x) => x.a),
      page: location.pathname + location.search,
      attribution: getAttribution(),
      hp,
    };
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "failed");
      sessionStorage.setItem(
        "fb_lead",
        JSON.stringify({ lead_id: j.id, client_type: s.clientType, service: s.services.join(","), locale: lang, lead_score: j.score, qualified: j.qualified, has_files: s.files.length > 0 })
      );
      localStorage.removeItem(DRAFT);
      router.push(`/${lang}/thank-you`);
    } catch {
      setFailed(true);
      setSending(false);
    }
  };

  const asOpts = (arr: string[]) => arr.map((x) => ({ id: x, label: x }));

  return (
    <div ref={top} className="scroll-mt-28">
      {/* progress */}
      <div className="mb-12">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="eyebrow text-[0.62rem] text-muted">
            {t.stepOf} {step + 1} {t.of} 5 — <span className="text-ink">{t.steps[step]}</span>
          </p>
          <p className="hidden text-xs text-muted sm:block">{t.draftSaved}</p>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {t.steps.map((label, k) => (
            <button key={label} type="button" onClick={() => k < step && go(k)} aria-label={label} className={`h-[3px] transition-colors duration-500 ${k <= step ? "bg-ink" : "bg-line"} ${k < step ? "cursor-pointer" : "cursor-default"}`} />
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 4) go(step + 1);
          else submit();
        }}
        noValidate
      >
        {/* honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[420px] space-y-10"
          >
            {step === 0 && (
              <>
                <div>
                  <Label req>{t.clientType}</Label>
                  <Chips opts={[...clientTypes, { id: "other", label: t.other }]} value={s.clientType} onPick={(id) => set("clientType", id)} />
                  <Err show={errors.clientType} text={t.required} />
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label req htmlFor="country">{t.country}</Label>
                    <input id="country" list="countries" className="field" value={s.country} onChange={(e) => set("country", e.target.value)} autoComplete="country-name" />
                    <datalist id="countries">{COUNTRIES.map((c) => <option key={c} value={c} />)}</datalist>
                    <Err show={errors.country} text={t.required} />
                  </div>
                  <div>
                    <Label htmlFor="city">{t.city}</Label>
                    <input id="city" list="towns" className="field" value={s.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
                    <datalist id="towns">{TOWNS.map((c) => <option key={c} value={c} />)}</datalist>
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <Label req>{t.propertyType}</Label>
                  <Chips opts={asOpts(t.propertyTypes)} value={s.propertyType} onPick={(id) => set("propertyType", id)} />
                  <Err show={errors.propertyType} text={t.required} />
                </div>
                <div className="max-w-xs">
                  <Label req htmlFor="area">{t.area}</Label>
                  <input id="area" inputMode="numeric" className="field font-display text-3xl font-normal" value={s.area} onChange={(e) => set("area", e.target.value.replace(/[^\d.,]/g, "").replace(",", "."))} placeholder="120" />
                  <Err show={errors.area} text={t.required} />
                </div>
                <div>
                  <Label>{t.condition}</Label>
                  <Chips opts={asOpts(t.conditions)} value={s.condition} onPick={(id) => set("condition", id)} />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label req>{t.service}</Label>
                  <Chips opts={services} value={s.services} onPick={(id) => toggle("services", id)} />
                  <Err show={errors.services} text={t.required} />
                </div>
                <div>
                  <Label>{t.deadline}</Label>
                  <Chips opts={asOpts(t.deadlines)} value={s.deadline} onPick={(id) => set("deadline", id)} />
                </div>
                <div>
                  <Label>{t.budget}</Label>
                  <Chips opts={asOpts(t.budgets)} value={s.budget} onPick={(id) => set("budget", id)} />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label>{t.files}</Label>
                  {uploadsEnabled === false ? (
                    <p className="border border-dashed border-line p-6 text-sm text-muted">
                      {t.filesUnavailable} <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>
                    </p>
                  ) : (
                    <label
                      className="flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-ink/30 px-6 py-12 text-center transition hover:border-ink hover:bg-paper-2/50"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        onFiles(e.dataTransfer.files);
                      }}
                    >
                      <span className="font-display text-xl font-normal">{t.filesDrop}</span>
                      <span className="text-xs text-muted">{t.filesHint}</span>
                      <input type="file" multiple className="sr-only" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif,.dwg,.zip" onChange={(e) => onFiles(e.target.files)} disabled={!uploadsEnabled} />
                    </label>
                  )}
                  {(s.files.length > 0 || uploading.length > 0) && (
                    <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
                      {s.files.map((f) => (
                        <li key={f.url} className="flex items-center justify-between gap-4 py-3">
                          <span className="truncate">✓ {f.name}</span>
                          <span className="flex shrink-0 items-center gap-4 text-muted">
                            {(f.size / 1024 / 1024).toFixed(1)} MB
                            <button type="button" onClick={() => set("files", s.files.filter((x) => x.url !== f.url))} aria-label="Remove" className="hover:text-ink">✕</button>
                          </span>
                        </li>
                      ))}
                      {uploading.map((u) => (
                        <li key={u.name} className="flex items-center justify-between gap-4 py-3 text-muted">
                          <span className="truncate">{u.name}</span>
                          <span className={u.error ? "text-accent" : ""}>{u.error ? "✕" : `${t.uploading} ${Math.round(u.progress)}%`}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <Label htmlFor="comment">{t.comment}</Label>
                  <textarea id="comment" rows={4} className="field resize-y" placeholder={t.commentPh} value={s.comment} onChange={(e) => set("comment", e.target.value)} />
                </div>
                {qs.length > 0 && (
                  <div className="space-y-6">
                    <Label>{t.questions}</Label>
                    {qs.map((q, k) => (
                      <div key={k}>
                        <label htmlFor={`q${k}`} className="mb-1 block text-sm">{q[lang]}</label>
                        <input id={`q${k}`} className="field" value={s.answers[k] || ""} onChange={(e) => set("answers", { ...s.answers, [k]: e.target.value })} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 4 && (
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label req htmlFor="name">{t.name}</Label>
                    <input id="name" className="field" value={s.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
                    <Err show={errors.name} text={t.required} />
                  </div>
                  <div>
                    <Label htmlFor="company">{t.company}</Label>
                    <input id="company" className="field" value={s.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
                  </div>
                  <div>
                    <Label req htmlFor="email">{t.email}</Label>
                    <input id="email" type="email" className="field" value={s.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                    <Err show={errors.email} text={t.required} />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t.phone}</Label>
                    <input id="phone" type="tel" className="field" value={s.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+39" />
                  </div>
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <Label>{t.messenger}</Label>
                    <Chips opts={asOpts(MESSENGERS)} value={s.messenger} onPick={(id) => set("messenger", id)} />
                  </div>
                  <div>
                    <Label htmlFor="mh">{t.messengerHandle}</Label>
                    <input id="mh" className="field" value={s.messengerHandle} onChange={(e) => set("messengerHandle", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>{t.language}</Label>
                  <Chips opts={[{ id: "it", label: "Italiano" }, { id: "en", label: "English" }]} value={s.language} onPick={(id) => set("language", id)} />
                </div>
                <div className="space-y-4 border-t border-line pt-8 text-sm">
                  <label className="flex cursor-pointer gap-3">
                    <input type="checkbox" checked={s.gdpr} onChange={(e) => set("gdpr", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-ink" />
                    <span>
                      {t.gdpr} <Link href={`/${lang}/privacy`} target="_blank" className="underline underline-offset-4">{t.privacy}</Link> <span className="text-accent">*</span>
                    </span>
                  </label>
                  <Err show={errors.gdpr} text={t.required} />
                  <label className="flex cursor-pointer gap-3 text-muted">
                    <input type="checkbox" checked={s.marketing} onChange={(e) => set("marketing", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-ink" />
                    <span>{t.marketing}</span>
                  </label>
                </div>
                {failed && (
                  <p className="text-sm text-accent" role="alert">
                    {t.error} <a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>
                  </p>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
          {step > 0 ? (
            <button type="button" onClick={() => go(step - 1)} className="eyebrow inline-flex items-center gap-3 text-[0.65rem] text-muted hover:text-ink">
              <Arrow dir="left" /> {t.back}
            </button>
          ) : (
            <span />
          )}
          <button type="submit" disabled={sending || uploading.some((u) => !u.error)} className="btn btn-solid disabled:opacity-50">
            {step < 4 ? t.next : sending ? t.sending : t.submit} <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
}
