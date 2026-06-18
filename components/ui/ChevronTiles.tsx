import { cn } from "@/lib/utils";

/**
 * A decorative motif echoing the logo: a row of skewed parallelogram tiles
 * that gradient from grey to purple. Purely presentational (aria-hidden).
 */
export function ChevronTiles({
  count = 5,
  className,
  tileClassName,
}: {
  count?: number;
  className?: string;
  tileClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        // Interpolate opacity so tiles fade from grey toward purple.
        const t = count > 1 ? i / (count - 1) : 0;
        return (
          <span
            key={i}
            className={cn(
              "block h-6 w-3 -skew-x-[20deg] rounded-[2px] bg-chevron-gradient",
              tileClassName
            )}
            style={{ opacity: 0.35 + t * 0.65 }}
          />
        );
      })}
    </div>
  );
}

/**
 * Large faint chevron-tile background pattern (used behind the hero).
 * Rendered as a tiled SVG so it scales cleanly and stays subtle.
 */
export function ChevronBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chevGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <pattern
            id="chevPattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-20)"
          >
            <rect x="0" y="0" width="10" height="28" rx="2" fill="url(#chevGrad)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chevPattern)" />
      </svg>
    </div>
  );
}
