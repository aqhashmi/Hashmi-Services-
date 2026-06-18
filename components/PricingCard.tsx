import { Check } from "lucide-react";
import type { Package } from "@/data/packages";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Pricing tier card. The highlighted tier gets the purple gradient treatment. */
export function PricingCard({ pkg }: { pkg: Package }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300",
        pkg.highlighted
          ? "border-primary/60 bg-card shadow-glow lg:-translate-y-3"
          : "border-border bg-card hover:border-primary/40"
      )}
    >
      {/* Gradient top accent on the highlighted card */}
      {pkg.highlighted && (
        <span className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-chevron-gradient" />
      )}

      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-chevron-gradient px-4 py-1 text-xs font-bold uppercase tracking-brand text-white shadow-glow">
          {pkg.badge}
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold uppercase tracking-brand">{pkg.name}</h3>
        <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>
      </div>

      <div className="mt-5">
        <span className="text-xs uppercase tracking-brand text-muted">
          {pkg.priceFrom}
        </span>
        <div className="text-3xl font-extrabold tracking-tight text-ink">
          {pkg.price}
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        <span className="font-medium text-ink">Best for: </span>
        {pkg.bestFor}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-ink/90">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-primary-light"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button
          href="/contact"
          variant={pkg.highlighted ? "gradient" : "secondary"}
          className="w-full"
        >
          {pkg.ctaLabel}
        </Button>
        <p className="mt-3 text-center text-xs text-muted/70">
          Prices are indicative and exclude government fees.
        </p>
      </div>
    </div>
  );
}
