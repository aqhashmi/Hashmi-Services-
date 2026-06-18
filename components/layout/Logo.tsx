import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Site logo. References the brand PNG in /public (do not recreate it in code).
 * The asset is a stacked lockup (chevron mark over the "HASHMI" wordmark and
 * tagline), trimmed to 407x328 with a transparent background.
 *
 * `mono` applies a white treatment for use on dark/coloured surfaces.
 * Pass `imgClassName` to override the display height per placement.
 */
export function Logo({
  className,
  imgClassName,
  mono = false,
  priority = false,
}: {
  className?: string;
  imgClassName?: string;
  mono?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${company.name} — home`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/hashmi_logo_png.png"
        alt={`${company.name} logo`}
        width={407}
        height={328}
        priority={priority}
        className={cn(
          "w-auto object-contain transition-opacity",
          // Default display height; tuned for the stacked lockup.
          "h-12 lg:h-14",
          mono && "brightness-0 invert",
          imgClassName
        )}
      />
    </Link>
  );
}
