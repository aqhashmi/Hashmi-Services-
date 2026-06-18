/**
 * Tiny className combiner — joins truthy class strings.
 * Avoids a dependency on clsx/tailwind-merge for this small project.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Format an ISO date string as e.g. "28 May 2026". */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
