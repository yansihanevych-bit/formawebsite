import Link from "next/link";
import type { Project } from "@/content/projects";
import { t, type Locale } from "@/lib/i18n";
import { Pic } from "@/components/ui/Pic";

export function ProjectCard({ p, lang, ratio = "aspect-[4/5]", sizes = "(min-width: 768px) 33vw, 100vw" }: { p: Project; lang: Locale; ratio?: string; sizes?: string }) {
  return (
    <Link href={`/${lang}/projects/${p.slug}`} className="group block">
      <div className={`relative overflow-hidden ${ratio}`}>
        <Pic img={p.cover} sizes={sizes} className="absolute inset-0" imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-light md:text-2xl">{t(p.title, lang)}</h3>
          <p className="mt-1 text-sm text-stone">
            {p.location} · {p.area} m²
          </p>
        </div>
        <span className="eyebrow mt-2 shrink-0 text-[0.6rem] text-stone">{t(p.propertyType, lang).split("·")[0]}</span>
      </div>
    </Link>
  );
}
