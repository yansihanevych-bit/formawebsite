export function Arrow({ className = "", dir = "up-right" }: { className?: string; dir?: "right" | "left" | "down" | "up-right" }) {
  if (dir === "up-right")
    return (
      <svg viewBox="0 0 12 12" className={`arr h-2.5 w-2.5 ${className}`} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M1 11L11 1M3 1h8v8" />
      </svg>
    );
  const rot = { right: 0, left: 180, down: 90 }[dir];
  return (
    <svg viewBox="0 0 24 12" className={`arr h-3 w-6 ${className}`} style={{ transform: `rotate(${rot}deg)` }} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}
