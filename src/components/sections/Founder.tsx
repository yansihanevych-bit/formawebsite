"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { Corners } from "@/components/ui/Corners";
import { Magnetic } from "@/components/ui/Magnetic";
import { MaskImage } from "@/components/ui/MaskImage";

const PORTRAIT = (alt: string) => ({ src: "/founder/portrait.jpg", alt, w: 640, h: 640 });

export type FounderCopy = {
  eyebrow: string;
  lineA: string;
  lineB: string;
  role: string;
  text: string;
  text2: string;
  skills: string[];
  film: string;
  soundOn: string;
  soundOff: string;
  play: string;
  pause: string;
  cta: string;
};

/** «Кто я»: ч/б портрет, текст основателя и вертикальный концепт-фильм, который играет только в зоне видимости */
export function Founder({ c, ctaHref }: { c: FounderCopy; ctaHref: string }) {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [userPaused, setUserPaused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["6%", "-6%"]);
  const yFilm = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["14%", "-14%"]);

  // автозапуск без звука, когда кадр в зоне видимости (не при reduced motion и не после ручной паузы)
  useEffect(() => {
    const v = video.current;
    if (!v || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, userPaused]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    } else {
      setUserPaused(true);
      v.pause();
    }
  };
  const toggleSound = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) {
      setUserPaused(false);
      v.play().catch(() => {});
    }
  };

  const film = (
    <figure className="w-full">
      <div className="group relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden bg-graphite lg:max-w-none">
        <video
          ref={video}
          src="/founder/aurora-film.mp4"
          poster="/founder/aurora-poster.jpg"
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          aria-label={c.film}
          data-cursor={playing ? c.pause : c.play}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />
        <Corners tone="warm" />
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            aria-label={c.play}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rosso text-warm transition-transform duration-500 hover:scale-110"
          >
            <svg viewBox="0 0 12 12" className="ml-1 h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M2 1l9 5-9 5z" />
            </svg>
          </button>
        )}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10">
          <button type="button" onClick={toggle} className="meta border border-white/40 px-2.5 py-1.5 text-white transition-colors hover:bg-white hover:text-graphite">
            {playing ? c.pause : c.play}
          </button>
          <button type="button" onClick={toggleSound} aria-pressed={!muted} className="meta flex items-center gap-2 border border-white/40 px-2.5 py-1.5 text-white transition-colors hover:bg-white hover:text-graphite">
            <span className={`inline-block h-1.5 w-1.5 ${muted ? "bg-white/50" : "bg-accent"}`} />
            {muted ? c.soundOn : c.soundOff}
          </button>
        </div>
      </div>
      <figcaption className="meta mt-3 text-muted">( {c.film} )</figcaption>
    </figure>
  );

  return (
    <section ref={ref} id="about" data-tone="walnut" className="relative overflow-hidden py-24 md:py-36 lg:py-44">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
        {/* заголовок поверх портрета: инверсия через mix-blend */}
        <div className="relative z-10 lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:pt-[6vh]">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-accent">+</span> {c.eyebrow}
          </p>
          <SplitText lines={[c.lineA]} className="h-display !text-[clamp(2.4rem,8.4vw,9.5rem)] !leading-[0.88]" />
          <SplitText lines={[c.lineB]} delay={0.12} className="h-display !text-[clamp(2.4rem,8.4vw,9.5rem)] !leading-[0.88] text-accent md:pl-[16vw]" />
        </div>

        {/* портрет: выходит за левый край сетки, вертикальная подпись по кромке */}
        <motion.figure style={{ y: yPhoto }} className="group relative lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:-ml-[clamp(1.25rem,4vw,4rem)]">
          <div className="relative">
            <MaskImage img={PORTRAIT(c.role)} sizes="(min-width: 1024px) 42vw, 100vw" quality={85} className="aspect-[4/5] bg-graphite" imgClassName="object-[50%_30%]" />
            <Corners tone="warm" />
          </div>
          <span className="meta absolute -right-7 top-0 hidden origin-top-left translate-x-full whitespace-nowrap text-muted [writing-mode:vertical-rl] lg:block">
            ( Founder — FORMA BURO )
          </span>
          <figcaption className="meta mt-3 text-muted lg:hidden">( Founder — FORMA BURO )</figcaption>
        </motion.figure>

        {/* текст */}
        <div className="min-w-0 lg:col-span-4 lg:col-start-7 lg:row-start-2 lg:pt-16">
          <Reveal>
            <p className="meta text-accent">{c.role}</p>
            <p className="mt-6 font-display text-[clamp(1.1rem,1.6vw,1.5rem)] leading-snug">“{c.text}”</p>
            <p className="mt-6 text-sm text-muted">{c.text2}</p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-3 border-t border-line">
            {c.skills.map((s, k) => (
              <Reveal as="li" key={s} delay={0.08 * k} className={`py-4 ${k ? "border-l border-line pl-4" : ""}`}>
                <span className="h-numeral text-outline block text-3xl [--outline:var(--color-accent)]">0{k + 1}</span>
                <span className="mt-2 block font-display text-xs uppercase sm:text-sm">{s}</span>
              </Reveal>
            ))}
          </ul>
          <Magnetic className="mt-10 inline-block">
            <Link href={ctaHref} data-cursor="Explore" className="btn btn-light">
              {c.cta} <span aria-hidden className="arr">→</span>
            </Link>
          </Magnetic>
        </div>

        {/* вертикальный фильм — смещён вниз относительно текста */}
        <motion.div style={{ y: yFilm }} className="lg:col-span-2 lg:col-start-11 lg:row-start-2 lg:mt-40">
          {film}
        </motion.div>
      </div>
    </section>
  );
}
