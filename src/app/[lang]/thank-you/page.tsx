import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { Arrow } from "@/components/ui/Arrow";
import { ThankYouEvent } from "@/components/form/ThankYouEvent";

export const metadata = { robots: { index: false } };

export default async function Page({ params }: PageProps<"/[lang]/thank-you">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-24 pt-40">
      <ThankYouEvent />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/mark-ink.svg" alt="" className="mb-10 w-14 dark:invert" />
      <h1 className="h-display max-w-[14ch]">{d.thanks.title}</h1>
      <p className="mt-8 max-w-xl text-lg text-ink-2/80">{d.thanks.text}</p>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href={`/${lang}/projects`} className="btn btn-solid">{d.common.viewProjects} <Arrow /></Link>
        <Link href={`/${lang}`} className="btn btn-ghost">{d.thanks.home}</Link>
      </div>
    </section>
  );
}
