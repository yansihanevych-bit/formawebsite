"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { track } from "@/lib/analytics";

/**
 * Переход «карточка → страница проекта»: изображение карточки (элемент [data-pt-img] внутри ссылки)
 * клонируется и раскрывается на весь экран, затем открывается страница кейса,
 * у которой первый экран — то же изображение на всю ширину. После загрузки клон плавно гаснет.
 */
export function ProjectLink({ href, children, className, cursor = "View project", ...rest }: { href: string; children: ReactNode; className?: string; cursor?: string; "aria-label"?: string }) {
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const src = e.currentTarget.querySelector<HTMLImageElement>("[data-pt-img] img");
    if (!src || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    track("project_open", { href });
    const r = src.getBoundingClientRect();
    const ov = document.createElement("div");
    ov.className = "pt-overlay";
    Object.assign(ov.style, { position: "fixed", left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, zIndex: "150", overflow: "hidden", pointerEvents: "none", transition: "all .75s cubic-bezier(.76,0,.24,1)", background: "#21170f" });
    const img = document.createElement("img");
    img.src = src.currentSrc || src.src;
    Object.assign(img.style, { width: "100%", height: "100%", objectFit: "cover" });
    ov.appendChild(img);
    document.body.appendChild(ov);
    requestAnimationFrame(() => Object.assign(ov.style, { left: "0px", top: "0px", width: "100vw", height: "100vh" }));
    setTimeout(() => {
      router.push(href);
      // ждём новую страницу и гасим клон
      const started = Date.now();
      const wait = () => {
        if (location.pathname.endsWith(href.split("?")[0]) || Date.now() - started > 4000) {
          setTimeout(() => {
            ov.style.transition = "opacity .6s ease";
            ov.style.opacity = "0";
            setTimeout(() => ov.remove(), 650);
          }, 350);
        } else requestAnimationFrame(wait);
      };
      wait();
    }, 760);
  };

  return (
    <Link href={href} onClick={onClick} className={className} data-cursor={cursor} {...rest}>
      {children}
    </Link>
  );
}
