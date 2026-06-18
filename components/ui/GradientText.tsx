import { cn } from "@/lib/utils";

/** Applies the signature grey → purple gradient to inline text. */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("text-accent-gradient", className)}>{children}</span>;
}
