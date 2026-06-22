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

## 🔌 Backend: Supabase (contact form)

The contact form is wired to **Supabase**. There is **no authentication** —
any visitor can submit. The flow is:

```
ContactForm (client)  →  POST /api/contact (server route)  →  Supabase `contacts` table
```

- `components/ContactForm.tsx` — validates on the client and POSTs the data.
- `app/api/contact/route.ts` — validates again server-side and inserts the row.
- `lib/supabase/server.ts` / `lib/supabase/client.ts` — Supabase clients (via `@supabase/ssr`).

### Setup (one-time)

1. **Install deps** (already in `package.json`):

   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. **Add environment variables.** Copy `.env.example` → `.env` and fill in your
   project's values (Supabase Dashboard → Project Settings → API):

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
   ```

   > `NEXT_PUBLIC_*` keys are exposed to the browser by design. The publishable
   > key is safe to ship — access is controlled by Row Level Security, not the key.

3. **Create the table + policy.** In the Supabase Dashboard → **SQL Editor**,
   paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
   It creates the `contacts` table and an RLS policy that lets **anyone INSERT**
   a submission but **no one read** submissions with the public key (they stay
   private; view them in the Dashboard's Table Editor).

4. **Run the app** and submit the form:

   ```bash
   npm run dev
   ```

   Submissions appear in **Supabase → Table Editor → contacts**.

### Notes

- The API route returns `201` on success, `400` for validation errors, and
  `500` if the insert fails (e.g. the table hasn't been created yet).
- To email submissions in addition to storing them, add a provider call inside
  `app/api/contact/route.ts` after the insert — e.g. [Resend](https://resend.com)
  or [SendGrid](https://sendgrid.com). Keep any secret keys in `.env`
  (without the `NEXT_PUBLIC_` prefix so they stay server-only).

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
