import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { CTABanner } from "@/components/home/CTABanner";
import { GradientText } from "@/components/ui/GradientText";
import { blogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Expert guides on Dubai company formation, UAE Corporate Tax, free zones, banking, and visas — practical insights for entrepreneurs setting up in the UAE.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            The Hashmi <GradientText>Blog</GradientText>
          </>
        }
        subtitle="Practical guides and expert insights to help you set up, run, and grow your business in the UAE."
      />

      <section className="py-20 sm:py-24">
        <Container>
          {/* Featured post */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/40 lg:grid-cols-2"
            >
              {/* Visual block (gradient placeholder) */}
              <div className="relative flex min-h-[220px] items-center justify-center bg-gradient-to-br from-primary-deep via-primary to-primary-deep p-10 lg:min-h-full">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(255,255,255,0.18),transparent_70%)]" aria-hidden="true" />
                <span className="relative text-center text-2xl font-extrabold uppercase tracking-brand text-white/90">
                  {featured.category}
                </span>
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-surface px-3 py-1 font-medium text-primary-light">
                    Featured
                  </span>
                  <span>{formatDate(featured.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight transition-colors group-hover:text-primary-light">
                  {featured.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary-light">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Rest of posts */}
          <RevealGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Reveal key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-brand text-primary-light">
                    {post.category}
                  </span>
                  <h3 className="mt-3 text-lg font-bold tracking-tight transition-colors group-hover:text-primary-light">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-xs text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
