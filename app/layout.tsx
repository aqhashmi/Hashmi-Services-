import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { company } from "@/data/company";

// Poppins is the global font, loaded via next/font (self-hosted, no layout shift).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Site-wide metadata + Open Graph defaults. Pages extend/override via `metadata`.
export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} | Company Formation in Dubai`,
    template: `%s | ${company.shortName}`,
  },
  description: company.description,
  keywords: [
    "Dubai company formation",
    "business setup Dubai",
    "free zone company UAE",
    "mainland company Dubai",
    "trade license Dubai",
    "UAE business setup consultancy",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: company.url,
    siteName: company.name,
    title: `${company.name} | Company Formation in Dubai`,
    description: company.description,
    images: [
      {
        url: "/hashmi_logo_png.png",
        width: 1200,
        height: 630,
        alt: company.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} | Company Formation in Dubai`,
    description: company.description,
    images: ["/hashmi_logo_png.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-base font-sans text-ink antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        {/* LocalBusiness structured data for SEO */}
        <JsonLd data={localBusinessSchema} />

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
