import type { Locale } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import { getDict } from "@/dictionaries";
import { projects } from "@/content/projects";
import { segments } from "@/content/segments";
import { ProjectsFilter } from "@/components/sections/ProjectsFilter";
import { PageIntro } from "@/components/sections/PageIntro";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return pageMeta(lang, "/projects", d.projects.title, d.projects.lead);
}

export default async function Page({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  return (
    <>
      <PageIntro eyebrow={`${projects.length} ${d.projects.title.toLowerCase()}`} title={d.projects.title} lead={d.projects.lead} />
      <section className="container-x pb-28 md:pb-40">
        <ProjectsFilter
          allLabel={d.projects.all}
          filters={segments.map((s) => ({ id: s.id, label: t(s.label, lang) }))}
          items={projects}
          lang={lang}
        />
      </section>
    </>
  );
}
