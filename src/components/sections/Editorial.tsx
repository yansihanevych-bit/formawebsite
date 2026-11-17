import Link from "next/link";
import type { Project } from "@/content/projects";
import { t, type Locale } from "@/lib/i18n";
import { MaskImage } from "@/components/ui/MaskImage";
import { serviceById } from "@/content/services";

type Size = "full" | "wide" | "narrow" | "half";

const ratio: Record<Size, string> = {
  full: "aspect-[4/3] md:aspect-[21/9]",
  wide: "aspect-[4/3] md:aspect-[16/11]",
  narrow: "aspect-[4/5]",
  half: "aspect-[4/3]",
};
const sizes: Record<Size, string> = {
  full: "(min-width: 768px) 92vw, 100vw",
  wide: "(min-width: 768px) 58vw, 100vw",
  narrow: "(min-width: 768px) 40vw, 100vw",
  half: "(min-width: 768px) 46vw, 100vw",
};

/** Карточка проекта: hover — zoom ~4% и раскрытие доп. информации */
export function EditorialCard({ p, lang, size, priority }: { p: Project; lang: Locale; size: Size; priority?: boolean }) {
  const overlay = size === "full";
  return (
    <Link href={`/${lang}/projects/${p.slug}`} className="group block">
      <div className={`relative ${ratio[size]}`}>
        <MaskImage img={p.cover} sizes={sizes[size]} priority={priority} className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
        {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />}
        <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 md:p-8 ${overlay ? "text-paper" : "text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100"}`}>
          {overlay ? (
            <div>
              <p className="meta text-paper/70">— {p.location}</p>
              <h3 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-5xl">{t(p.title, lang)}</h3>
            </div>
          ) : (
            <span />
          )}
          <span className="meta translate-y-2 bg-paper px-3 py-2 text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            {p.services.map((s) => t(serviceById(s).title, lang).split(" ")[0]).join(" · ")}
          </span>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 border-t border-line pt-4 md:grid-cols-4">
        {!overlay && (
          <div className="col-span-2 md:col-span-4">
            <dt className="sr-only">Project</dt>
            <dd className="font-display text-xl font-medium tracking-tight md:text-2xl">{t(p.title, lang)}</dd>
          </div>
        )}
        <div>
          <dt className="sr-only">Location</dt>
          <dd className="meta text-muted">{p.location}</dd>
        </div>
        <div>
          <dt className="sr-only">Area</dt>
          <dd className="meta text-muted">{p.area.toLocaleString(lang)} m²</dd>
        </div>
        <div className={overlay ? "" : "hidden md:block"}>
          <dt className="sr-only">Type</dt>
          <dd className="meta text-muted">{t(p.propertyType, lang).split("·")[0]}</dd>
        </div>
        <div className={overlay ? "" : "hidden md:block"}>
          <dt className="sr-only">Delivery</dt>
          <dd className="meta text-muted">{t(p.turnaround, lang)}</dd>
        </div>
      </dl>
    </Link>
  );
}

/** Редакционная галерея: первый — на всю ширину, далее чередование широких/узких и пар */
export function EditorialGrid({ items, lang }: { items: Project[]; lang: Locale }) {
  const pattern: { size: Size; cls: string }[] = [
    { size: "full", cls: "md:col-span-12" },
    { size: "wide", cls: "md:col-span-7" },
    { size: "narrow", cls: "md:col-span-4 md:col-start-9 md:mt-40" },
    { size: "narrow", cls: "md:col-span-4 md:col-start-2" },
    { size: "wide", cls: "md:col-span-6 md:col-start-7 md:mt-24" },
    { size: "full", cls: "md:col-span-12" },
  ];
  return (
    <div className="grid gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-28">
      {items.map((p, k) => {
        const pt = pattern[k % pattern.length];
        return (
          <div key={p.slug} className={pt.cls}>
            <EditorialCard p={p} lang={lang} size={pt.size} priority={k === 0} />
          </div>
        );
      })}
    </div>
  );
}
