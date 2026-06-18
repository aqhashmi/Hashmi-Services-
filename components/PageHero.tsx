import { Container } from "@/components/ui/Container";
import { ChevronBackdrop, ChevronTiles } from "@/components/ui/ChevronTiles";

/** Reusable hero band for interior pages (About, Services, etc.). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-mesh-hero" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-purple-glow" aria-hidden="true" />
      <ChevronBackdrop />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="mb-4 flex items-center justify-center gap-3">
              <ChevronTiles count={3} tileClassName="h-3.5 w-2" />
              <span className="text-xs font-semibold uppercase tracking-brand text-primary-light">
                {eyebrow}
              </span>
            </div>
          )}
          <h1 className="text-balance text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
