"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow } from "@/components/ui/Arrow";
import { track } from "@/lib/analytics";

type Opt = { id: string; label: string };

/** Короткая форма: email + тип клиента → полный квиз /start с предзаполнением */
export function QuickForm({ lang, options, t, defaultType }: { lang: string; options: Opt[]; t: { email: string; who: string; go: string }; defaultType?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [type, setType] = useState(defaultType ?? "");
  return (
    <form
      className="grid gap-4 md:grid-cols-[1fr_1fr_auto]"
      onSubmit={(e) => {
        e.preventDefault();
        track("form_start", { form: "quick", client_type: type });
        const q = new URLSearchParams();
        if (email) q.set("email", email);
        if (type) q.set("type", type);
        router.push(`/${lang}/start?${q.toString()}`);
      }}
    >
      <label className="sr-only" htmlFor="qf-email">{t.email}</label>
      <input id="qf-email" type="email" required placeholder={t.email} value={email} onChange={(e) => setEmail(e.target.value)} className="field border-white/30 text-paper placeholder:text-paper/50 focus:border-paper" />
      <label className="sr-only" htmlFor="qf-type">{t.who}</label>
      <select id="qf-type" value={type} onChange={(e) => setType(e.target.value)} className="field border-white/30 text-paper focus:border-paper [&>option]:text-ink">
        <option value="">{t.who}</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
      <button type="submit" className="btn btn-light justify-center">
        {t.go} <Arrow />
      </button>
    </form>
  );
}
