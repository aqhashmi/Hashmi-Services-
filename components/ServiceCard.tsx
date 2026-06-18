import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";

/**
 * Service card that lifts on hover and reveals a grey → purple gradient edge.
 * The gradient border is achieved with a layered background trick.
 */
export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-card"
    >
      {/* Gradient edge revealed on hover (sits on the left border). */}
      <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-chevron-gradient transition-transform duration-300 group-hover:scale-y-100" />
      {/* Soft gradient glow on hover */}
      <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-2xl transition-colors duration-300 group-hover:bg-primary/20" />

      <div className="relative">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-primary-light transition-colors duration-300 group-hover:border-primary/50">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>

        <h3 className="mt-5 flex items-center gap-1 text-lg font-bold tracking-tight">
          {service.title}
          <ArrowUpRight className="h-4 w-4 -translate-y-0.5 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.excerpt}</p>
      </div>
    </Link>
  );
}
