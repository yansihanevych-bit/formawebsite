import Link from "next/link";
import type { Dict } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Corners } from "@/components/ui/Corners";
import { DrawLine } from "@/components/ui/DrawLine";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

/** Блок-переход к калькулятору в стиле инженерного чертежа */
export function CalcCta({ lang, t }: { lang: Locale; t: Dict["calcCta"] }) {
  return (
    <section className="container-x pb-24 md:pb-36">
      <div className="group relative overflow-hidden border border-ink/80 p-8 md:p-14">
        <Corners />
        {/* сетка чертежа */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "48px 48px" }}
        />
        <div className="relative grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="meta mb-6 flex items-center gap-3 text-muted">
              <span className="whitespace-nowrap text-accent">[ ∑ ]</span> {t.eyebrow}
            </p>
            <SplitText lines={[t.title]} className="h-section max-w-[18ch]" />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-lg text-muted">{t.text}</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link href={`/${lang}/calculator`} className="btn btn-solid">
              [ {t.button} → ]
            </Link>
          </div>
        </div>
        <DrawLine className="relative mt-12 !bg-accent" />
        <div className="meta relative mt-3 flex justify-between text-muted">
          <span>30 m²</span>
          <span>€ · m² · days</span>
          <span>2 500+ m²</span>
        </div>
      </div>
    </section>
  );
}
