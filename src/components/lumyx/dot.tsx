import { cn } from "../../lib/utils";
import { toneBg, type Tone } from "./tone";

/**
 * A static dot in a tone. `StatusDot` is for a connection state and breathes while live; most
 * dots in a table or a feed only mark a tone and must stay still.
 */
export function Dot({ tone = "idle", size = "md", label, className }: { tone?: Tone; size?: "sm" | "md"; label?: string; className?: string }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 rounded-pill", size === "sm" ? "size-1.5" : "size-2", toneBg[tone], className)}
    />
  );
}
