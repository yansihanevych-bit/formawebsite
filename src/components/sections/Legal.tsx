import type { ReactNode } from "react";

export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="container-x pb-28 pt-40 md:pt-52">
      <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-normal">{title}</h1>
      <p className="eyebrow mt-4 text-[0.62rem] text-muted">{updated}</p>
      <div className="mt-12 max-w-3xl space-y-5 text-ink-2/85 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </article>
  );
}
