import { cn } from "@/lib/utils";
import { ChevronTiles } from "./ChevronTiles";

/** Consistent section header: small eyebrow, big title, optional subtitle. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <ChevronTiles count={3} tileClassName="h-3.5 w-2" />
          <span className="text-xs font-semibold uppercase tracking-brand text-primary-light">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  );
}
