import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Globe2,
  Anchor,
  FileBadge,
  Users,
  Landmark,
  Receipt,
  Calculator,
  FileX2,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  /** Short one-liner used on overview cards. */
  excerpt: string;
  icon: LucideIcon;
  /** Longer intro shown at the top of the detail page. */
  intro: string;
  /** Bullet highlights / what's included. */
  highlights: string[];
  /** Step-by-step or feature paragraphs for the detail page. */
  details: { heading: string; body: string }[];
  /** Common questions specific to this service. */
  faqs?: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "mainland-company-formation",
    title: "Mainland Company Formation",
    excerpt:
      "Trade anywhere in the UAE and bid on government contracts with a DED-licensed mainland company.",
    icon: Building2,
    intro:
      "A mainland licence lets you operate across the entire UAE market, work directly with government entities, and open an unlimited number of branches. With recent reforms, most commercial activities now allow 100% foreign ownership — no local partner required.",
    highlights: [
      "100% foreign ownership on most activities",
      "Trade freely across the UAE and internationally",
      "Eligible for government and semi-government tenders",
      "No cap on visa quota (subject to office space)",
      "Memorandum of Association (MOA) drafting & notarisation",
    ],
    details: [
      {
        heading: "Choose the right legal structure",
        body: "We advise on the optimal structure — LLC, sole establishment, or civil company — based on your activity, ownership goals, and visa requirements, then reserve your trade name with the Department of Economic Development.",
      },
      {
        heading: "Activity & approvals",
        body: "We map your business activities to the correct DED codes and secure any external approvals (e.g. from regulatory authorities) your activity requires before the licence is issued.",
      },
      {
        heading: "MOA, Ejari & establishment card",
        body: "We prepare and notarise your MOA, arrange a compliant office or Ejari tenancy, and process your establishment card so you can begin sponsoring visas.",
      },
    ],
    faqs: [
      {
        question: "Do I still need a local sponsor for a mainland company?",
        answer:
          "For most commercial and industrial activities, no. Foreign investors can own 100% of the company. A handful of strategic activities still require a UAE national partner or agent — we'll confirm this for your specific activity.",
      },
    ],
  },
  {
    slug: "free-zone-company-setup",
    title: "Free Zone Company Setup",
    excerpt:
      "100% ownership, full profit repatriation, and fast licensing across 40+ UAE free zones.",
    icon: Globe2,
    intro:
      "Free zones are purpose-built economic areas offering 100% foreign ownership, zero customs duty within the zone, and streamlined setup — often within days. We match you to the right free zone for your activity, budget, and visa needs.",
    highlights: [
      "100% foreign ownership and full profit repatriation",
      "Fast licensing — many zones issue within 3–7 working days",
      "Cost-effective packages for freelancers and SMEs",
      "Flexi-desk to full-office options with visa eligibility",
      "Industry-specialised zones (media, tech, commodities, logistics)",
    ],
    details: [
      {
        heading: "Pick the right free zone",
        body: "Each free zone has its own activity list, pricing, and visa allocation. We compare options like IFZA, Meydan, DMCC, and SHAMS against your needs so you don't overpay or pick a zone that limits your growth.",
      },
      {
        heading: "Licence & registration",
        body: "We handle name reservation, initial approval, licence issuance, and your incorporation documents — coordinating directly with the free zone authority on your behalf.",
      },
      {
        heading: "Visas & banking",
        body: "Once licensed, we process establishment cards and residence visas, and introduce you to banking partners to open your corporate account.",
      },
    ],
  },
  {
    slug: "offshore-company-formation",
    title: "Offshore Company Formation",
    excerpt:
      "Hold assets, own property, and structure international trade with a tax-efficient offshore entity.",
    icon: Anchor,
    intro:
      "An offshore company is ideal for holding assets, international trading, and wealth structuring. Offshore entities offer confidentiality and tax efficiency, though they cannot trade within the UAE mainland or sponsor residence visas.",
    highlights: [
      "100% foreign ownership with strong confidentiality",
      "Hold UAE and international assets and property",
      "No requirement for physical office space",
      "Efficient structuring for international trade",
      "Multi-currency corporate bank accounts",
    ],
    details: [
      {
        heading: "Jurisdiction selection",
        body: "We advise on the right offshore jurisdiction (such as JAFZA Offshore or RAK ICC) based on your asset-holding, banking, and succession-planning objectives.",
      },
      {
        heading: "Incorporation & documentation",
        body: "We prepare your incorporation documents, registered agent details, and share structure, and manage the full filing process with the authority.",
      },
    ],
  },
  {
    slug: "trade-license-business-licensing",
    title: "Trade License & Business Licensing",
    excerpt:
      "Commercial, professional, and industrial licences mapped precisely to your activities.",
    icon: FileBadge,
    intro:
      "Your trade licence defines what your business can legally do. We ensure your licence covers every activity you need — and nothing that inflates your cost — across commercial, professional, and industrial categories.",
    highlights: [
      "Accurate activity selection and grouping",
      "Commercial, professional & industrial licences",
      "Licence amendments and activity additions",
      "Annual renewals handled on your behalf",
      "External regulatory approvals where required",
    ],
    details: [
      {
        heading: "Activity mapping",
        body: "Choosing too few activities limits your business; choosing too many can raise costs and trigger extra approvals. We map activities precisely to your real operations.",
      },
      {
        heading: "Renewals & amendments",
        body: "We track your renewal dates and handle amendments — adding activities, changing trade names, or updating shareholders — so your licence stays current.",
      },
    ],
  },
  {
    slug: "visa-pro-services",
    title: "Visa & PRO Services",
    excerpt:
      "Investor, employment, and family residence visas plus full government liaison (PRO).",
    icon: Users,
    intro:
      "From your investor visa to your team and family, we manage the entire residence-visa journey — Emirates ID, medical, and biometrics — alongside ongoing PRO services that keep you compliant with government departments.",
    highlights: [
      "Investor, partner & employment visas",
      "Family / dependent visa sponsorship",
      "Emirates ID, medical typing & biometrics coordination",
      "Document attestation and translation",
      "Ongoing government liaison (PRO) services",
    ],
    details: [
      {
        heading: "End-to-end visa processing",
        body: "We handle entry permits, status changes, medicals, Emirates ID, and visa stamping — guiding you through each step and minimising trips to government centres.",
      },
      {
        heading: "PRO & document services",
        body: "Our PRO team manages attestations, labour and immigration formalities, and renewals, acting as your dedicated liaison with UAE authorities.",
      },
    ],
  },
  {
    slug: "corporate-bank-account-opening",
    title: "Corporate Bank Account Opening",
    excerpt:
      "Introductions to UAE and international banks with full application and compliance support.",
    icon: Landmark,
    intro:
      "Opening a UAE corporate account requires the right documentation and a clear business profile. We prepare your application, introduce you to suitable banking partners, and support you through compliance and KYC requirements.",
    highlights: [
      "Introductions to leading UAE & international banks",
      "Application preparation and business-profile drafting",
      "Compliance (KYC/AML) documentation support",
      "Multi-currency and digital banking options",
      "Guidance on minimum balance and account types",
    ],
    details: [
      {
        heading: "Bank matching",
        body: "Different banks suit different business models, nationalities, and turnover levels. We match you to banks where your profile has the strongest chance of approval.",
      },
      {
        heading: "Application & follow-up",
        body: "We compile your documents, prepare a clear company profile, and follow up with relationship managers to move your application forward.",
      },
    ],
  },
  {
    slug: "vat-corporate-tax-registration",
    title: "VAT & Corporate Tax Registration",
    excerpt:
      "Stay compliant with UAE Corporate Tax and VAT — registration, filing, and advisory.",
    icon: Receipt,
    intro:
      "UAE Corporate Tax (9%) and VAT (5%) are now active. We register your business with the Federal Tax Authority, advise on thresholds and exemptions (including Free Zone Qualifying status), and keep your filings on time.",
    highlights: [
      "Corporate Tax registration with the FTA",
      "VAT registration (mandatory and voluntary)",
      "Guidance on Free Zone qualifying income",
      "Periodic return preparation and filing",
      "Penalty avoidance through deadline management",
    ],
    details: [
      {
        heading: "Registration & thresholds",
        body: "We assess whether VAT and Corporate Tax registration are mandatory for your turnover and activity, then complete registration with the Federal Tax Authority.",
      },
      {
        heading: "Ongoing compliance",
        body: "We prepare and file your returns on schedule and advise on record-keeping so you remain compliant and avoid administrative penalties.",
      },
    ],
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    excerpt:
      "Cloud bookkeeping, management accounts, and audit-ready financials for your business.",
    icon: Calculator,
    intro:
      "Accurate books are now essential for Corporate Tax compliance. We provide cloud-based bookkeeping, monthly management accounts, and audit-ready financial statements so you always know where your business stands.",
    highlights: [
      "Cloud bookkeeping on modern accounting software",
      "Monthly management accounts and reporting",
      "Accounts payable / receivable management",
      "Audit-ready financial statements",
      "Payroll and WPS support",
    ],
    details: [
      {
        heading: "Day-to-day bookkeeping",
        body: "We record transactions, reconcile accounts, and keep your ledgers tidy — giving you a real-time view of cash flow and profitability.",
      },
      {
        heading: "Reporting & audit support",
        body: "We produce management reports and prepare financial statements that meet Corporate Tax and audit requirements.",
      },
    ],
  },
  {
    slug: "company-liquidation",
    title: "Company Liquidation",
    excerpt:
      "Close your company cleanly with proper deregistration, clearances, and visa cancellation.",
    icon: FileX2,
    intro:
      "Closing a company correctly protects you from future fines and liabilities. We manage the full liquidation process — from board resolutions and clearances to licence cancellation and visa termination.",
    highlights: [
      "Board / shareholder resolution drafting",
      "Liquidator appointment where required",
      "Utility, immigration & labour clearances",
      "Visa cancellation for owners and staff",
      "Final licence cancellation certificate",
    ],
    details: [
      {
        heading: "Orderly wind-down",
        body: "We coordinate clearances with government departments, settle outstanding obligations, and cancel visas in the correct sequence.",
      },
      {
        heading: "Final deregistration",
        body: "We obtain your cancellation certificate so the company is formally closed and you have no lingering renewal or penalty exposure.",
      },
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
