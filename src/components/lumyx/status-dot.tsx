import { cn } from '../../lib/utils';

export type Status = "live" | "connecting" | "healthy" | "degraded" | "failed" | "idle";

const TONE: Record<Status, string> = {
  live: "bg-ok-solid",
  connecting: "bg-info-solid",
  healthy: "bg-ok-solid",
  degraded: "bg-warn-solid",
  failed: "bg-danger-solid",
  idle: "bg-idle",
};

/**
 * Status is an 8px dot, never an icon and never an emoji.
 * The only loop in the system: a 2.4s breath on live / connecting.
 */
export function StatusDot({ status = "idle", size = "md", className }: { status?: Status; size?: "sm" | "md"; className?: string }) {
  const breathes = status === "live" || status === "connecting";
  return (
    <span
      role="img"
      aria-label={status}
      className={cn(
        "inline-block shrink-0 rounded-pill",
        size === "sm" ? "size-1.5" : "size-2",
        TONE[status],
        breathes && "animate-[var(--animate-breathe)]",
        className,
      )}
    />
  );
}
