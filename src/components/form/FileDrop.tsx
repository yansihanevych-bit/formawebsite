"use client";
import { useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Corners } from "@/components/ui/Corners";
import { track } from "@/lib/analytics";

export type FileRef = { url: string; name: string; size: number };

/** Зона загрузки с пунктирной рамкой и угловыми метками. Файлы уходят напрямую в Vercel Blob. */
export function FileDrop({
  value,
  onChange,
  maxMb = 20,
  maxFiles = 1,
  t,
  tone = "ink",
}: {
  value: FileRef[];
  onChange: (v: FileRef[]) => void;
  maxMb?: number;
  maxFiles?: number;
  t: { cta: string; hint: string; remove: string; tooBig: string; unavailable: string; uploading: string };
  tone?: "ink" | "warm";
}) {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState<{ name: string; p: number } | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch("/api/upload")
      .then((r) => r.json())
      .then((j) => setEnabled(!!j.enabled))
      .catch(() => setEnabled(false));
  }, []);

  const pick = async (list: FileList | null) => {
    setErr("");
    if (!list || !enabled) return;
    let acc = value;
    for (const f of Array.from(list).slice(0, maxFiles - acc.length)) {
      if (f.size > maxMb * 1024 * 1024) {
        setErr(t.tooBig);
        continue;
      }
      setBusy({ name: f.name, p: 0 });
      try {
        const safe = f.name.replace(/[^\w.\-]+/g, "_").slice(-80);
        const b = await upload(`leads/${new Date().toISOString().slice(0, 10)}/${safe}`, f, {
          access: "public",
          handleUploadUrl: "/api/upload",
          onUploadProgress: ({ percentage }) => setBusy({ name: f.name, p: percentage }),
        });
        acc = [...acc, { url: b.url, name: f.name, size: f.size }];
        onChange(acc);
        track("file_upload", { file_type: f.type || "unknown" });
      } catch {
        setErr("Upload error");
      }
      setBusy(null);
    }
  };

  const dark = tone === "warm";
  return (
    <div>
      {value.length < maxFiles && (
        <label
          className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-8 text-center transition-colors ${
            dark ? "border-warm/30 hover:border-accent" : "border-ink/30 hover:border-accent"
          } ${enabled === false ? "cursor-not-allowed opacity-60" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            pick(e.dataTransfer.files);
          }}
        >
          <Corners tone={dark ? "warm" : "ink"} />
          <span className="meta">{busy ? `${t.uploading} ${Math.round(busy.p)}%` : enabled === false ? t.unavailable : t.cta}</span>
          <span className={`text-xs ${dark ? "text-warm/55" : "text-muted"}`}>{t.hint}</span>
          <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.dwg,.zip" multiple={maxFiles > 1} disabled={!enabled} onChange={(e) => pick(e.target.files)} />
        </label>
      )}
      {value.map((f) => (
        <div key={f.url} className={`flex items-center justify-between gap-4 border-b py-3 text-sm ${dark ? "border-white/15" : "border-line"}`}>
          <span className="truncate">✓ {f.name}</span>
          <span className="flex shrink-0 items-center gap-4 opacity-70">
            {(f.size / 1024 / 1024).toFixed(1)} MB
            <button type="button" onClick={() => onChange(value.filter((x) => x.url !== f.url))} className="meta hover:text-accent">
              {t.remove} ✕
            </button>
          </span>
        </div>
      ))}
      {err && <p className="mt-2 text-xs text-accent">{err}</p>}
    </div>
  );
}
