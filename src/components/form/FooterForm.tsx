"use client";
import { useState } from "react";
import type { Dict } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { FileDrop, type FileRef } from "./FileDrop";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

/** Форма заявки в финальном блоке футера: имя, телефон, бюджет, идея, файл до 20 МБ */
export function FooterForm({ lang, t, filesT, email }: { lang: Locale; t: Dict["ff"]; filesT: Dict["form"]; email: string }) {
  const [v, setV] = useState({ name: "", phone: "", budget: "", message: "", gdpr: false });
  const [files, setFiles] = useState<FileRef[]>([]);
  const [err, setErr] = useState<Record<string, boolean>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [hp, setHp] = useState("");
  const set = (k: keyof typeof v, val: string | boolean) => {
    setV((p) => ({ ...p, [k]: val }));
    setErr((e) => ({ ...e, [k]: false }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, boolean> = {};
    if (v.name.trim().length < 2) er.name = true;
    if (!/^[+\d][\d\s().-]{4,}$/.test(v.phone.trim()) && !/^@?\w{3,}$/.test(v.phone.trim())) er.phone = true;
    if (!v.gdpr) er.gdpr = true;
    setErr(er);
    if (Object.keys(er).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/quick", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "footer", ...v, files, language: lang, page: location.pathname, attribution: getAttribution(), hp }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error();
      setState("sent");
      track("generate_lead", { form: "footer", lead_id: j.id, locale: lang, has_files: files.length > 0 });
    } catch {
      setState("error");
    }
  };

  const field = "w-full border border-white/15 bg-transparent px-4 py-3.5 text-warm placeholder:text-warm/40 outline-none transition-colors focus:border-accent";
  const label = "meta mb-2 block text-warm/60";

  if (state === "sent")
    return (
      <div className="flex min-h-[320px] flex-col justify-center border border-accent/60 p-8">
        <p className="meta text-accent">[ ✓ ]</p>
        <p className="mt-4 font-display text-3xl font-medium tracking-tight">{t.sent}</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="grid gap-px">
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden />
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="ff-name" className={label}>{t.name} *</label>
          <input id="ff-name" className={`${field} ${err.name ? "border-accent" : ""}`} value={v.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="ff-phone" className={label}>{t.phone} *</label>
          <input id="ff-phone" type="tel" inputMode="tel" placeholder="+39 …" className={`${field} ${err.phone ? "border-accent" : ""}`} value={v.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" />
        </div>
      </div>
      <div className="mt-5">
        <span className={label}>{t.budget}</span>
        <div className="flex flex-wrap gap-2">
          {t.budgets.map((b) => (
            <button
              key={b}
              type="button"
              aria-pressed={v.budget === b}
              onClick={() => set("budget", v.budget === b ? "" : b)}
              className={`border px-4 py-2.5 text-sm transition-colors ${v.budget === b ? "border-accent bg-accent text-white" : "border-white/20 hover:border-warm"}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="ff-msg" className={label}>{t.idea}</label>
        <textarea id="ff-msg" rows={4} className={`${field} resize-y`} placeholder={t.ideaPh} value={v.message} onChange={(e) => set("message", e.target.value)} />
      </div>
      <div className="mt-5">
        <span className={label}>{t.attach}</span>
        <FileDrop
          value={files}
          onChange={setFiles}
          maxMb={20}
          tone="warm"
          t={{ cta: t.attachCta, hint: t.attachHint, remove: t.remove, tooBig: t.tooBig, unavailable: filesT.filesUnavailable, uploading: filesT.uploading }}
        />
      </div>
      <label className="mt-5 flex cursor-pointer gap-3 text-sm text-warm/75">
        <input type="checkbox" checked={v.gdpr} onChange={(e) => set("gdpr", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]" />
        <span className={err.gdpr ? "text-accent" : ""}>{t.gdpr}</span>
      </label>
      {state === "error" && (
        <p className="mt-3 text-sm text-accent" role="alert">
          {t.error} <a href={`mailto:${email}`} className="underline">{email}</a>
        </p>
      )}
      <div className="mt-6">
        <button type="submit" disabled={state === "sending"} className="btn btn-light w-full justify-between disabled:opacity-60 md:w-auto">
          {state === "sending" ? t.sending : t.send} <Arrow dir="right" />
        </button>
      </div>
    </form>
  );
}
