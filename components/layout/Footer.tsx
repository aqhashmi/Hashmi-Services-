import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Youtube } from "lucide-react";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { footerQuickLinks } from "@/data/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/** Site footer: brand, services, quick links, contact, social, disclaimer. */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: company.social.instagram, label: "Instagram", Icon: Instagram },
    { href: company.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: company.social.facebook, label: "Facebook", Icon: Facebook },
    { href: company.social.youtube, label: "YouTube", Icon: Youtube },
  ];

  return (
    <footer className="relative border-t border-border bg-surface">
      {/* Gradient hairline echoing the logo. */}
      <div className="divider-gradient" />
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + blurb */}
          <div className="lg:col-span-1">
            <Logo mono />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              End-to-end company formation in Dubai — mainland, free zone, and
              offshore — with visas, banking, and ongoing compliance handled for you.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary-light"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h3 className="text-sm font-semibold uppercase tracking-brand text-ink">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted transition-colors hover:text-primary-light"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-semibold uppercase tracking-brand text-ink">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerQuickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-primary-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-brand text-ink">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                <span>
                  {company.address.line1}, {company.address.line2}, {company.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                <a href={`tel:${company.phoneHref}`} className="hover:text-primary-light">
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary-light" aria-hidden="true" />
                <a href={`mailto:${company.email}`} className="hover:text-primary-light">
                  {company.email}
                </a>
              </li>
              <li className="text-xs text-muted/80">{company.hours}</li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + copyright */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs leading-relaxed text-muted/80">
            <strong className="text-muted">Disclaimer:</strong> {company.name} is
            an independent business-setup consultancy. We are not a government
            entity and are not affiliated with, endorsed by, or acting on behalf
            of any UAE government department, free zone authority, or licensing
            agency. All government fees are payable directly to the relevant
            authorities. Prices shown are indicative and subject to change.
          </p>
          <div className="mt-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-muted">
              © {year} {company.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted">
              Built with care in Dubai, UAE.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
