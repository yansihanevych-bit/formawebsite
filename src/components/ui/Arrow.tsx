export function Arrow({ className = "", dir = "right" }: { className?: string; dir?: "right" | "left" | "down" | "up-right" }) {
  const rot = { right: 0, left: 180, down: 90, "up-right": -45 }[dir];
  return (
    <svg viewBox="0 0 24 12" className={`h-3 w-6 ${className}`} style={{ transform: `rotate(${rot}deg)` }} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}
