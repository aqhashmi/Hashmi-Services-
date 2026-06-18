# Hashmi Business Setup Services — Marketing Website

A modern, production-ready marketing site for **Hashmi Business Setup Services**, a Dubai-based company-formation consultancy. Built to feel premium, sleek, and conversion-focused, with a dark + purple design language derived from the brand logo.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **framer-motion**, and **lucide-react**.

---

## ✨ Features

- **Brand-matched design system** — grey→purple diagonal gradient (from the logo), dark near-black theme, Poppins typography, two-tone "HAS / HMI" heading treatment.
- **Fully responsive** & mobile-first.
- **Accessible** — semantic HTML, visible keyboard focus, skip link, ARIA labels, and full `prefers-reduced-motion` support.
- **SEO-optimized** — per-page metadata, Open Graph & Twitter cards, JSON-LD (`LocalBusiness`, `Service`, `Article`), `sitemap.xml`, and `robots.txt`.
- **Subtle motion** — scroll reveals, animated stat counters, testimonial carousel, FAQ accordion.
- **Typed content** — services, free zones, packages, FAQs, testimonials, and blog posts all live in `/data`.
- **Validated contact form** — client-side validation wired to a placeholder handler (see [below](#-connecting-a-real-contact-form-backend)).

## 📄 Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, trust bar, services, why-choose, process, free zones, packages, testimonials, FAQ, CTA, contact |
| `/about` | Company story, mission/vision, values, stats |
| `/services` | All services grid |
| `/services/[slug]` | Service detail pages (statically generated) |
| `/free-zones` | UAE free-zone comparison |
| `/packages` | Pricing tiers (Starter / Growth / Enterprise) |
| `/blog` | Blog listing with sample posts |
| `/blog/[slug]` | Blog post pages (statically generated) |
| `/contact` | Contact form, WhatsApp, address & map placeholder |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18.18+** (or 20+ recommended)
- npm (ships with Node)

### Install & run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Other scripts

```bash
npm run build   # Production build
npm start       # Run the production build
npm run lint    # Lint with ESLint
```

---

## 🎨 Brand & Theming

The design tokens live in two places (kept in sync):

- **`tailwind.config.ts`** — Tailwind color tokens (`base`, `surface`, `card`, `primary`, `silver`, `ink`, `muted`, …), the `bg-chevron-gradient` accent, glow shadows, and animations.
- **`app/globals.css`** — matching CSS variables plus helper classes (`.text-accent-gradient`, `.divider-gradient`, brand split colors).

| Token | Hex |
| --- | --- |
| Background base | `#0A0A0B` |
| Surface | `#15131A` |
| Card | `#1C1A24` |
| Primary purple | `#7C3AED` |
| Deep purple | `#4C1D95` |
| Light lavender | `#A78BFA` |
| Silver (HAS) | `#9CA3AF` |
| Border | `#2A2730` |
| Text primary | `#F5F5F7` |
| Text muted | `#A1A1AA` |

The signature accent is the **grey → purple diagonal gradient** (`#9CA3AF → #7C3AED`), used on chevron motifs, dividers, active states, and the numbered process steps.

### The logo

The site references the brand logo at **`/public/hashmi_logo_png.png`** (used in the header; a `mono` white version is rendered in the footer via a CSS filter).

> **⚠️ Replace the placeholder logo.** A generated placeholder ships so the project runs immediately. Drop your real PNG at `public/hashmi_logo_png.png` (same filename) to swap it in. The placeholder generator lives at `scripts/gen-logo.mjs` if you ever need to regenerate it.

---

## 🗂️ Project Structure

```
app/                     # App Router pages, layout, globals, sitemap, robots
  layout.tsx             # Root layout: fonts, metadata, header/footer, JSON-LD
  page.tsx               # Home page (composes home sections)
  about/ services/ ...   # Route segments
components/
  layout/                # Header, Footer, Logo
  ui/                    # Reusable primitives (Button, Container, Reveal, …)
  home/                  # Home-page sections (Hero, TrustBar, …)
  ContactForm.tsx        # Validated contact form (placeholder handler)
  ...
data/                    # Typed content (services, freezones, packages, faqs, …)
lib/                     # utils + framer-motion variants
public/                  # Static assets (logo)
scripts/                 # Dev helper: placeholder logo generator
```

---

## 🔌 Connecting a Real Contact-Form Backend

There is **no backend** in this project by design. The contact form
(`components/ContactForm.tsx`) is fully validated on the client and calls a
placeholder `submitToBackend()` function that just logs the data and simulates
a network delay.

To wire up a real integration, edit **`submitToBackend()`** in
`components/ContactForm.tsx`. Two common approaches:

**Option A — Next.js Route Handler (recommended):**

1. Create `app/api/contact/route.ts`:

   ```ts
   import { NextResponse } from "next/server";

   export async function POST(req: Request) {
     const data = await req.json();
     // TODO: send an email (Resend / SendGrid / Nodemailer),
     // or forward to your CRM / database here.
     return NextResponse.json({ ok: true });
   }
   ```

2. Replace the body of `submitToBackend()` with:

   ```ts
   const res = await fetch("/api/contact", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   });
   if (!res.ok) throw new Error("Request failed");
   ```

**Option B — Third-party form service** (no server code): point
`submitToBackend()` at a provider like **Formspree**, **Getform**, or **Web3Forms**
by `fetch`-ing their endpoint with your form data.

> 💡 Email providers worth a look: [Resend](https://resend.com),
> [SendGrid](https://sendgrid.com), [Postmark](https://postmarkapp.com).
> Store API keys in `.env.local` (never commit them).

### WhatsApp & phone

WhatsApp links and the phone number are generated from `data/company.ts`. Update
`whatsappHref`, `phoneHref`, `phoneDisplay`, `email`, and `address` there.

---

## 📈 Adding Analytics

Add your analytics snippet in `app/layout.tsx`. For example, with
[`@vercel/analytics`](https://vercel.com/docs/analytics):

```bash
npm i @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
// ...inside <body>, after {children}:
<Analytics />
```

For Google Analytics / GTM, use `next/script` with the `afterInteractive`
strategy inside the layout.

---

## 📝 Editing Content

All marketing content is data-driven and typed — no need to touch components:

- **Services:** `data/services.ts` (also powers `/services/[slug]`)
- **Free zones:** `data/freezones.ts`
- **Packages / pricing:** `data/packages.ts`
- **FAQs:** `data/faqs.ts`
- **Testimonials:** `data/testimonials.ts`
- **Blog posts:** `data/blog.ts` (also powers `/blog/[slug]`)
- **Company info / contact:** `data/company.ts`
- **Navigation:** `data/navigation.ts`

Update the canonical site URL in `data/company.ts` (`url`) so metadata, Open
Graph, and the sitemap point at your real domain.

---

## ⚖️ Disclaimer

The footer includes a disclaimer stating the company is an **independent
consultancy, not affiliated with any government agency**, and that all pricing
is indicative. Update the copy in `components/layout/Footer.tsx` and
`data/company.ts` as needed for your jurisdiction.

---

## 🚢 Deployment

Deploy anywhere that supports Next.js. The simplest is
[**Vercel**](https://vercel.com): push to a Git repo, import the project, and it
builds automatically. Remember to set `data/company.ts → url` to your production
domain.
