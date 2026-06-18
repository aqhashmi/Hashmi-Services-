"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

/** Sticky site header with logo, nav, phone, and consultation CTA. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Add a backdrop + border once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-base/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo priority />

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-chevron-gradient" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${company.phoneHref}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <Phone className="h-4 w-4 text-primary-light" aria-hidden="true" />
            {company.phoneDisplay}
          </a>
          <Button href="/contact" variant="gradient" size="sm">
            Free Consultation
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-border bg-base/95 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-base font-medium",
                  isActive(item.href)
                    ? "bg-card text-ink"
                    : "text-muted hover:bg-surface hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted"
              >
                <Phone className="h-4 w-4 text-primary-light" aria-hidden="true" />
                {company.phoneDisplay}
              </a>
              <Button href="/contact" variant="gradient">
                Free Consultation
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
