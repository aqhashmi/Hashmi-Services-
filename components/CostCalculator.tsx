"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Interactive company-formation cost estimator.
 *
 * Prices are INDICATIVE starting points (in AED) used to give visitors a
 * ballpark. Adjust the constants below to match your real pricing. The exact
 * quote is always confirmed by an advisor via the contact form.
 */
const JURISDICTIONS = [
  { id: "freezone", label: "Free Zone", base: 5999, allowsVisas: true, note: "100% ownership · fast setup" },
  { id: "mainland", label: "Mainland", base: 19999, allowsVisas: true, note: "Trade across the UAE" },
  { id: "offshore", label: "Offshore", base: 12000, allowsVisas: false, note: "Asset holding · no visas" },
] as const;

const PER_VISA = 3500; // per residence visa
const MAX_VISAS = 6;

const ADDONS = [
  { id: "bank", label: "Corporate bank account assistance", price: 1500 },
  { id: "tax", label: "VAT & Corporate Tax registration", price: 1000 },
  { id: "accounting", label: "Accounting & bookkeeping (1st year)", price: 4000 },
] as const;

type JurisdictionId = (typeof JURISDICTIONS)[number]["id"];
type AddonId = (typeof ADDONS)[number]["id"];

const aed = (n: number) => `AED ${n.toLocaleString("en-US")}`;

export function CostCalculator() {
  const [jurisdictionId, setJurisdictionId] = useState<JurisdictionId>("freezone");
  const [visas, setVisas] = useState(1);
  const [addons, setAddons] = useState<Record<AddonId, boolean>>({
    bank: true,
    tax: false,
    accounting: false,
  });

  const jurisdiction = JURISDICTIONS.find((j) => j.id === jurisdictionId)!;
  const effectiveVisas = jurisdiction.allowsVisas ? visas : 0;

  // Live total — recomputed whenever an input changes.
  const total = useMemo(() => {
    const addonsTotal = ADDONS.reduce(
      (sum, a) => (addons[a.id] ? sum + a.price : sum),
      0
    );
    return jurisdiction.base + effectiveVisas * PER_VISA + addonsTotal;
  }, [jurisdiction.base, effectiveVisas, addons]);

  const toggleAddon = (id: AddonId) =>
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));

  const stepVisas = (delta: number) =>
    setVisas((v) => Math.min(MAX_VISAS, Math.max(0, v + delta)));

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-card">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        {/* Inputs */}
        <div className="space-y-7 p-6 sm:p-8 lg:col-span-3">
          {/* Jurisdiction */}
          <fieldset>
            <legend className="text-sm font-semibold text-ink">
              1. Where do you want to set up?
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {JURISDICTIONS.map((j) => {
                const active = j.id === jurisdictionId;
                return (
                  <button
                    key={j.id}
                    type="button"
                    onClick={() => setJurisdictionId(j.id)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-all",
                      active
                        ? "border-primary/60 bg-surface shadow-glow"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <span className="block text-sm font-bold">{j.label}</span>
                    <span className="mt-0.5 block text-[11px] leading-tight text-muted">
                      {j.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Visas */}
          <fieldset>
            <legend className="text-sm font-semibold text-ink">
              2. How many residence visas?
            </legend>
            <div className="mt-3 flex items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border">
                <button
                  type="button"
                  onClick={() => stepVisas(-1)}
                  disabled={!jurisdiction.allowsVisas || effectiveVisas <= 0}
                  aria-label="Decrease visas"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-primary disabled:opacity-40"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span
                  className="w-10 text-center text-lg font-bold tabular-nums"
                  aria-live="polite"
                >
                  {effectiveVisas}
                </span>
                <button
                  type="button"
                  onClick={() => stepVisas(1)}
                  disabled={!jurisdiction.allowsVisas || effectiveVisas >= MAX_VISAS}
                  aria-label="Increase visas"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-primary disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-muted">
                {jurisdiction.allowsVisas
                  ? `${aed(PER_VISA)} per visa`
                  : "Offshore entities can't sponsor visas"}
              </span>
            </div>
          </fieldset>

          {/* Add-ons */}
          <fieldset>
            <legend className="text-sm font-semibold text-ink">
              3. Add-ons
            </legend>
            <div className="mt-3 space-y-2">
              {ADDONS.map((a) => {
                const checked = addons[a.id];
                return (
                  <label
                    key={a.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors",
                      checked ? "border-primary/50 bg-surface" : "border-border hover:border-primary/30"
                    )}
                  >
                    <span className="flex items-center gap-3 text-sm text-ink">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddon(a.id)}
                        className="h-4 w-4 rounded border-border text-primary accent-primary"
                      />
                      {a.label}
                    </span>
                    <span className="text-sm font-medium text-muted">+{aed(a.price)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-between gap-6 border-t border-border bg-surface/60 p-6 sm:p-8 lg:col-span-2 lg:border-l lg:border-t-0">
          <div>
            <p className="text-sm font-semibold uppercase tracking-brand text-primary">
              Estimated cost
            </p>
            <p className="mt-2 text-xs uppercase tracking-brand text-muted">from</p>
            <p
              className="text-4xl font-extrabold tracking-tight text-accent-gradient"
              aria-live="polite"
            >
              {aed(total)}
            </p>

            {/* Breakdown */}
            <ul className="mt-5 space-y-1.5 text-sm text-muted">
              <li className="flex justify-between">
                <span>{jurisdiction.label} licence</span>
                <span className="text-ink">{aed(jurisdiction.base)}</span>
              </li>
              {effectiveVisas > 0 && (
                <li className="flex justify-between">
                  <span>{effectiveVisas} × visa</span>
                  <span className="text-ink">{aed(effectiveVisas * PER_VISA)}</span>
                </li>
              )}
              {ADDONS.filter((a) => addons[a.id]).map((a) => (
                <li key={a.id} className="flex justify-between">
                  <span>{a.label}</span>
                  <span className="text-ink">{aed(a.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Button href="/contact" variant="gradient" className="w-full">
              Get an Exact Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="mt-3 flex items-start gap-1.5 text-xs text-muted/80">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Indicative estimate, excluding government fees. Your advisor will
              confirm an exact, all-in quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
