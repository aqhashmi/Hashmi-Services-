import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 10000, suffix: "+", label: "Companies Formed" },
  { value: 40, suffix: "+", label: "Free Zones Covered" },
  { value: 90, suffix: "+", label: "Client Nationalities" },
];

// Authority / partner logo placeholders (text-based to avoid fake assets).
const authorities = ["DMCC", "IFZA", "MEYDAN", "RAKEZ", "JAFZA", "DED"];

export function TrustBar() {
  return (
    <section className="border-b border-border bg-surface/50 py-14" aria-label="Our track record">
      <Container>
        {/* Stat counters */}
        <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-4xl font-extrabold tracking-tight text-accent-gradient sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
              <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </dl>

        {/* Authority logo placeholders */}
        <div className="mt-12">
          <p className="text-center text-xs font-semibold uppercase tracking-brand text-muted/80">
            Trusted across the UAE&apos;s leading authorities &amp; free zones
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {authorities.map((name) => (
              <div
                key={name}
                className="select-none text-lg font-bold uppercase tracking-brand text-muted/50 grayscale transition hover:text-silver"
                aria-label={`${name} logo placeholder`}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
