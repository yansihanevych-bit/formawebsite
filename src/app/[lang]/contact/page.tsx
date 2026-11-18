import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { site } from "@/content/misc";
import { projects } from "@/content/projects";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectsMap } from "@/components/sections/ProjectsMap";
import { SectionHead } from "@/components/ui/SectionHead";
import { Corners } from "@/components/ui/Corners";
import { Arrow } from "@/components/ui/Arrow";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/contact", d.contact.title, d.contact.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  const rows: [string, string, string?][] = [
    ["Email", site.email, `mailto:${site.email}`],
    [d.form.phone, site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
    ["WhatsApp", `+${site.whatsapp}`, `https://wa.me/${site.whatsapp}`],
    ["Telegram", `@${site.telegram}`, `https://t.me/${site.telegram}`],
    ["Instagram", site.instagram.replace("https://", ""), site.instagram],
    [d.footer.contacts, site.address],
    ["—", d.contact.hours],
  ];
  return (
    <>
      <PageIntro eyebrow={d.nav.contact} title={d.contact.title} lead={d.contact.lead} />
      <section className="container-x pb-24 md:pb-32">
        <div className="grid gap-10 md:grid-cols-12">
          <dl className="border-t border-ink md:col-span-7">
            {rows.map(([k, v, href]) => (
              <div key={k + v} className="grid grid-cols-[8rem_1fr] items-baseline gap-4 border-b border-line py-5 md:grid-cols-[12rem_1fr]">
                <dt className="meta text-muted">{k}</dt>
                <dd className="font-display text-xl font-medium tracking-tight md:text-2xl">
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="link-u">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="group relative flex flex-col justify-between gap-8 border border-ink p-8 md:col-span-4 md:col-start-9">
            <Corners />
            <p className="font-display text-2xl font-medium tracking-tight">{d.home.ctaText}</p>
            <div className="flex flex-col gap-3">
              <a href="#contact" className="btn btn-solid justify-between">{d.contact.write} <Arrow dir="down" /></a>
              <Link href={`/${lang}/calculator`} className="btn btn-ghost justify-between">{d.nav.calculator} <Arrow /></Link>
              <Link href={`/${lang}/start`} className="btn btn-ghost justify-between">{d.common.startProject} <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container-x pb-24 md:pb-32">
        <SectionHead eyebrow={d.contact.where} title={site.towns.join(" · ")} />
        <ProjectsMap items={projects} lang={lang} labels={{ completed: d.explorer.completed, inProgress: d.explorer.inProgress, open: d.explorer.open }} />
      </section>
    </>
  );
}
