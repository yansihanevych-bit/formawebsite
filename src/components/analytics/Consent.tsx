"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { captureAttribution } from "@/lib/attribution";

type Choice = { analytics: boolean; marketing: boolean; ts: string };
const KEY = "fb_consent_v1";

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(KEY);
    return v ? (JSON.parse(v) as Choice) : null;
  } catch {
    return null;
  }
}

function applyConsent(c: Choice, gtmId?: string) {
  // window.gtag определён в ConsentDefaults и пушит объект arguments, как требует Consent Mode
  const g = (...a: unknown[]) => window.gtag?.(...a);
  g("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.marketing ? "granted" : "denied",
    ad_user_data: c.marketing ? "granted" : "denied",
    ad_personalization: c.marketing ? "granted" : "denied",
  });
  // Basic Consent Mode: GTM загружается только после согласия хотя бы на одну категорию
  if (gtmId && (c.analytics || c.marketing) && !document.getElementById("gtm-js")) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const s = document.createElement("script");
    s.id = "gtm-js";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(s);
  }
}

export function ConsentDefaults() {
  // Выполняется до любых тегов: всё запрещено по умолчанию
  const code = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

type T = { text: string; accept: string; reject: string; settings: string; save: string; analytics: string; marketing: string; necessary: string; policy: string };

export function ConsentManager({ t, lang, gtmId }: { t: T; lang: string; gtmId?: string }) {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState(false);
  const [a, setA] = useState(true);
  const [m, setM] = useState(true);

  useEffect(() => {
    captureAttribution();
    const c = readChoice();
    if (c) {
      applyConsent(c, gtmId);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление выбора из localStorage
      setA(c.analytics);
      setM(c.marketing);
    } else setShow(true);
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-open-consent]")) {
        setShow(true);
        setDetail(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [gtmId]);

  const save = useCallback(
    (analytics: boolean, marketing: boolean) => {
      const c = { analytics, marketing, ts: new Date().toISOString() };
      try {
        localStorage.setItem(KEY, JSON.stringify(c));
      } catch {}
      applyConsent(c, gtmId);
      setShow(false);
      setDetail(false);
    },
    [gtmId]
  );

  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookie" className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md">
      <div className="bg-graphite p-6 text-warm shadow-2xl">
        <p className="text-sm leading-relaxed text-warm/85">
          {t.text}{" "}
          <Link href={`/${lang}/cookies`} className="underline underline-offset-4">
            {t.policy}
          </Link>
        </p>
        {detail && (
          <div className="mt-5 space-y-3 border-t border-white/15 pt-5 text-sm">
            <label className="flex items-center justify-between gap-4 opacity-60">
              {t.necessary}
              <input type="checkbox" checked disabled className="h-4 w-4 accent-accent" />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              {t.analytics}
              <input type="checkbox" checked={a} onChange={(e) => setA(e.target.checked)} className="h-4 w-4 accent-accent" />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4">
              {t.marketing}
              <input type="checkbox" checked={m} onChange={(e) => setM(e.target.checked)} className="h-4 w-4 accent-accent" />
            </label>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {detail ? (
            <button type="button" onClick={() => save(a, m)} className="btn btn-light flex-1 justify-center !py-3">
              {t.save}
            </button>
          ) : (
            <>
              <button type="button" onClick={() => save(true, true)} className="btn btn-light flex-1 justify-center !py-3">
                {t.accept}
              </button>
              <button type="button" onClick={() => save(false, false)} className="btn flex-1 justify-center border-white/40 !py-3 hover:bg-white/10">
                {t.reject}
              </button>
            </>
          )}
          {!detail && (
            <button type="button" onClick={() => setDetail(true)} className="eyebrow w-full pt-2 text-center text-[0.62rem] text-warm/60 hover:text-warm">
              {t.settings}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
