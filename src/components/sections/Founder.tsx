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

  return (
    <section ref={ref} id="about" data-tone="sand" className="relative overflow-hidden py-24 md:py-40">
      <div className="container-x">
        <p className="eyebrow flex items-center gap-3 text-ink">
          <span className="text-accent">+</span> {c.eyebrow}
        </p>
        <div className="mt-8">
          <SplitText lines={[c.lineA]} className="h-display" />
          <SplitText lines={[c.lineB]} delay={0.12} className="h-display text-accent md:pl-[22vw]" />
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-6">
          {/* портрет */}
          <motion.figure style={{ y: yPhoto }} className="group relative md:col-span-4">
            <div className="relative">
              <MaskImage img={PORTRAIT(c.role)} sizes="(min-width: 768px) 33vw, 100vw" quality={85} className="aspect-[4/5] bg-graphite" imgClassName="object-[50%_30%]" />
              <Corners tone="warm" />
            </div>
            <figcaption className="meta mt-3 flex justify-between text-muted">
              <span>( Founder )</span>
              <span>FORMA BURO</span>
            </figcaption>
          </motion.figure>

          {/* текст */}
          <div className="min-w-0 md:col-span-4 md:col-start-6 md:self-center">
            <Reveal>
              <p className="meta text-accent">{c.role}</p>
              <p className="mt-6 text-lg leading-relaxed md:text-xl">{c.text}</p>
              <p className="mt-5 text-sm text-muted">{c.text2}</p>
            </Reveal>
            <ul className="mt-10 border-t border-ink">
              {c.skills.map((s, k) => (
                <Reveal as="li" key={s} delay={0.08 * k} className="flex items-baseline gap-5 border-b border-line py-4">
                  <span className="h-numeral text-outline text-3xl [--outline:var(--color-accent)]">0{k + 1}</span>
                  <span className="font-display text-xl uppercase md:text-2xl">{s}</span>
                </Reveal>
              ))}
            </ul>
            <Magnetic className="mt-10 inline-block">
              <Link href={ctaHref} data-cursor="Explore" className="btn btn-solid">
                {c.cta} <span aria-hidden className="arr">→</span>
              </Link>
            </Magnetic>
          </div>

          {/* вертикальный фильм */}
          <motion.figure style={{ y: yFilm }} className="md:col-span-3 md:col-start-10">
            <div className="group relative mx-auto aspect-[9/16] w-full max-w-[340px] overflow-hidden bg-graphite md:max-w-none">
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
          </motion.figure>
        </div>
      </div>
      <span aria-hidden className="pointer-events-none absolute right-[6%] top-28 hidden text-3xl text-accent/40 md:block">+</span>
    </section>
  );
}
