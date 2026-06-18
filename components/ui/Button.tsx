import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gradient";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-brand transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-deep hover:shadow-glow active:scale-[0.98]",
  // Signature grey → purple gradient button.
  gradient:
    "bg-chevron-gradient text-white hover:shadow-glow active:scale-[0.98]",
  secondary:
    "border border-border bg-card text-ink hover:border-primary/60 hover:bg-surface",
  ghost: "text-ink hover:text-primary-light",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/**
 * Polymorphic button: renders a Next.js <Link> when `href` is provided
 * (external links open in a new tab automatically), otherwise a <button>.
 */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonAsLink | ButtonAsButton) {
  const classes = cn(base, variants[variant], sizes[size], className);

  // When `href` is present, render a Link (with safe external-link handling).
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    const isHttp = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
