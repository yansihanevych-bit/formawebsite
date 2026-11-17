import Link from "next/link";
import "./globals.css";

export const metadata = { title: "404 — FORMA BURO", robots: { index: false } };

// Глобальная 404 для любых несуществующих адресов (обходит layout, поэтому свои html/body)
export default function GlobalNotFound() {
  return (
    <html lang="it">
      <body className="bg-paper text-ink">
        <section className="container-x flex min-h-svh flex-col justify-center py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/wordmark-ink.svg" alt="FORMA BURO" className="mb-16 w-40" />
          <p className="eyebrow mb-6 text-stone">404</p>
          <h1 className="h-display max-w-[14ch]">Pagina non trovata</h1>
          <p className="mt-4 font-display text-2xl font-light text-stone">Page not found</p>
          <div className="mt-12 flex gap-3">
            <Link href="/it" className="btn btn-solid">Home (IT)</Link>
            <Link href="/en" className="btn btn-ghost">Home (EN)</Link>
          </div>
        </section>
      </body>
    </html>
  );
}
