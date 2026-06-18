import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

/**
 * Site logo. References the PNG in /public (do not recreate the logo in code).
 * `mono` applies a brightness/contrast filter for the footer's white version.
 *
 * NOTE: Place the brand logo at /public/hashmi_logo_png.png. A placeholder
 * is included so the project runs out of the box — replace it with the real asset.
 */
export function Logo({
  className,
  mono = false,
  priority = false,
}: {
  className?: string;
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
        width={180}
        height={48}
        priority={priority}
        className={cn(
          "h-10 w-auto object-contain transition-opacity",
          // The footer uses a white/mono treatment per the brief.
          mono && "brightness-0 invert"
        )}
      />
    </Link>
  );
}
