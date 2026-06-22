"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { packages } from "@/data/packages";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Compact pricing carousel shown in the hero. Cycles through the company-
 * formation packages (Starter / Growth / Enterprise) with price + key
 * features. Auto-advances, pauses on hover/focus, and respects reduced motion.
 */
export function HeroPackageSlider() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(1); // start on "Growth" (Most Popular)
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const count = packages.length;
  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count]
  );

  // Auto-advance every 5s unless paused or reduced motion is preferred.
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [reduce, paused, go]);

  const pkg = packages[index];

  return (
    <div
      className="relative mx-auto mt-14 w-full max-w-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Company formation packages"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/80 p-6 text-left shadow-card backdrop-blur sm:p-8">
        {/* Gradient top accent */}
        <span className="absolute inset-x-0 top-0 h-1 bg-chevron-gradient" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={reduce ? false : { opacity: 0, x: direction >= 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction >= 0 ? -60 : 60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-brand">
                  {pkg.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
              </div>
              {pkg.badge && (
                <span className="shrink-0 rounded-full bg-chevron-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-brand text-white">
                  {pkg.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="text-xs uppercase tracking-brand text-muted">
                {pkg.priceFrom}
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-ink">
                {pkg.price}
              </span>
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {pkg.features.slice(0, 4).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Button href="/contact" variant={pkg.highlighted ? "gradient" : "secondary"} className="w-full sm:w-auto">
                {pkg.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-3 text-xs text-muted/70">
                Indicative price — excludes government fees.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous package"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Choose package">
          {packages.map((p, i) => (
            <button
              key={p.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${p.name} package`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-chevron-gradient" : "w-2 bg-border hover:bg-muted"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next package"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:border-primary/60 hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
