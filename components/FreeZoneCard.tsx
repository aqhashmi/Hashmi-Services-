import { Building } from "lucide-react";
import type { FreeZone } from "@/data/freezones";

/** Compact card for a single free zone. */
export function FreeZoneCard({ zone }: { zone: FreeZone }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card">
      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-chevron-gradient transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-center justify-between">
        <span className="text-2xl font-extrabold uppercase tracking-brand text-accent-gradient">
          {zone.abbr}
        </span>
        <Building className="h-5 w-5 text-muted/60" aria-hidden="true" />
      </div>
      <p className="mt-1 text-xs font-medium uppercase tracking-brand text-primary-light/80">
        {zone.focus}
      </p>
      <h3 className="mt-3 text-sm font-semibold text-ink">{zone.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{zone.description}</p>
    </div>
  );
}
