import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/home/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { blogPosts, getPostBySlug } from "@/data/blog";
import { company } from "@/data/company";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Article structured data for SEO.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: company.name },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <PageHero eyebrow={post.category} title={post.title} />

      <article className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-primary-light"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All articles
          </Link>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary-light" aria-hidden="true" />
              {post.author}
            </span>
            <span>{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary-light" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>

          {/* Body */}
          <div className="mt-8 space-y-5">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="pt-4 text-2xl font-bold tracking-tight">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="space-y-2.5 pl-1">
                    {block.items?.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-chevron-gradient" aria-hidden="true" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Inline CTA */}
          <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-deep/40 to-card p-7 text-center">
            <h2 className="text-xl font-bold">Ready to take the next step?</h2>
            <p className="mt-2 text-sm text-muted">
              Get a free consultation tailored to your business goals.
            </p>
            <Button href="/contact" variant="gradient" className="mt-5">
              Get a Free Consultation
            </Button>
          </div>
        </Container>
      </article>

      {/* Related */}
      <section className="border-t border-border py-16">
        <Container className="max-w-3xl">
          <h2 className="text-xl font-extrabold uppercase tracking-tight">
            Keep reading
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="text-xs font-semibold uppercase tracking-brand text-primary-light">
                  {r.category}
                </span>
                <h3 className="mt-2 font-bold transition-colors group-hover:text-primary-light">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
