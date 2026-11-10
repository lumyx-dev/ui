import * as React from "react";
import { cn } from "../../lib/utils";
import { LumyxMark } from "./mark";

/**
 * The sidebar's head: a 32px tile carrying the mark, the product name, and one line of
 * context (organisation, or instance and region). `accent` is Lumyx Cloud, `ink` the
 * self-hosted dashboard — the tile is how the two tell themselves apart at a glance.
 */
export function SidebarBrand({
  name, meta, tone = "accent", monoMeta = false, className,
}: {
  name: string;
  meta?: React.ReactNode;
  tone?: "accent" | "ink";
  /** Set `meta` in mono when it is an identifier (`sfu-eu-3 · eu-west-3`). */
  monoMeta?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-4", className)}>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-sm",
          tone === "accent" ? "bg-accent text-on-accent" : "bg-ink text-card",
        )}
      >
        <LumyxMark size={18} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-14 font-semibold text-strong">{name}</span>
        {meta ? <span className={cn("truncate text-12 text-faint", monoMeta && "sl-num")}>{meta}</span> : null}
      </span>
    </div>
  );
}

/** The rounded panel at the foot of the sidebar — plan usage, connection status. */
export function SidebarPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("m-3 flex flex-col gap-2 rounded-md border border-subtle bg-sunken p-4", className)}>
      {children}
    </div>
  );
}
