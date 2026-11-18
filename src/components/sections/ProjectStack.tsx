"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/content/projects";
import { t, type Locale } from "@/lib/i18n";
import { ProjectLink } from "@/components/ui/ProjectLink";
import { ProjectIcon } from "@/components/ui/ProjectIcon";
import { Corners } from "@/components/ui/Corners";

type L = { location: string; area: string; year: string; status: string; completed: string; inProgress: string };

/**
 * Портфолио в подаче P7: широкий кадр (при наведении — второй кадр), огромный номер,
 * название широким капсом и строка данных. Чётные проекты смещены — асимметричный ритм.
 */
export function ProjectStack({ items, lang, labels }: { items: Project[]; lang: Locale; labels: L }) {
  return (
    <div className="space-y-24 md:space-y-40">
      {items.map((p, k) => {
        const alt = k % 2 === 1;
        return (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-6 md:grid-cols-12 ${alt ? "md:[&>*]:col-start-2" : ""}`}
          >
            <ProjectLink href={`/${lang}/projects/${p.slug}`} className={`group block ${alt ? "md:col-span-11" : "md:col-span-11"}`}>
              <div className="mb-4 flex items-end justify-between gap-6">
                <span className="h-numeral text-outline text-[18vw] leading-[0.75] [--outline:var(--color-muted)] transition-colors duration-500 group-hover:text-accent group-hover:[-webkit-text-stroke:0] md:text-[9vw]">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <ProjectIcon slug={p.slug} className="mb-2 h-10 w-10 text-muted transition-colors group-hover:text-accent md:h-12 md:w-12" />
              </div>
              <div data-pt-img className="relative aspect-[4/3] overflow-hidden bg-paper-2 md:aspect-[21/9]">
                <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 768px) 90vw, 100vw" className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
                {p.gallery[1] && <Image src={p.gallery[1].src} alt="" fill sizes="(min-width: 768px) 90vw, 100vw" className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />}
                <Corners tone="warm" className="absolute inset-3 z-10" />
                <span className="meta absolute bottom-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-warm text-graphite opacity-0 transition-all duration-500 group-hover:opacity-100 md:h-20 md:w-20">
                  ↗
                </span>
              </div>
              <h2 className="mt-5 font-display text-[clamp(1.6rem,4.4vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">
                {t(p.title, lang)}
              </h2>
              <dl className="meta mt-5 grid grid-cols-2 gap-x-6 gap-y-2 border-t border-line pt-4 text-muted md:grid-cols-4">
                <div>
                  <dt className="inline">{labels.location}: </dt>
                  <dd className="inline text-ink">{p.location}</dd>
                </div>
                <div>
                  <dt className="inline">{labels.area}: </dt>
                  <dd className="inline text-ink">{p.area.toLocaleString(lang)} m²</dd>
                </div>
                <div>
                  <dt className="inline">{labels.year}: </dt>
                  <dd className="inline text-ink">{p.year}</dd>
                </div>
                <div>
                  <dt className="inline">{labels.status}: </dt>
                  <dd className={`inline ${p.status === "completed" ? "text-ink" : "text-accent"}`}>{p.status === "completed" ? labels.completed : labels.inProgress}</dd>
                </div>
              </dl>
            </ProjectLink>
          </motion.article>
        );
      })}
    </div>
  );
}
