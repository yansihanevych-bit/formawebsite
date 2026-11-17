import Link from "next/link";

// not-found не получает params — показываем двуязычный текст
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pb-24 pt-40">
      <p className="eyebrow mb-6 text-muted">404</p>
      <h1 className="h-display max-w-[14ch]">Pagina non trovata</h1>
      <p className="mt-4 font-display text-2xl font-normal text-muted">Page not found</p>
      <div className="mt-12 flex gap-3">
        <Link href="/it" className="btn btn-solid">Home (IT)</Link>
        <Link href="/en" className="btn btn-ghost">Home (EN)</Link>
      </div>
    </section>
  );
}
