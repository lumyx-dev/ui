import * as React from "react";
import { cn } from "../../lib/utils";
import { toneText, type Tone } from "./tone";

/** An inset tile inside a card: faint label, mono value, optional faint note. */
export function InsetStat({
  label, value, note, tone = "neutral", size = "md", className,
}: { label: React.ReactNode; value: React.ReactNode; note?: React.ReactNode; tone?: Tone; size?: "md" | "lg"; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-0.5 rounded-md bg-sunken p-3", className)}>
      <span className="text-12 text-faint">{label}</span>
      <span className={cn("sl-num font-semibold", size === "lg" ? "text-20" : "text-16", toneText[tone])}>{value}</span>
      {note != null ? <span className="text-12 text-faint">{note}</span> : null}
    </div>
  );
}

/** A labelled meter row: label left, mono value right, the meter (usually `Progress`) under it. */
export function MeterRow({ label, value, children, className }: { label: React.ReactNode; value: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="flex justify-between gap-3 text-14">
        <span className="text-muted">{label}</span>
        <span className="sl-num text-strong">{value}</span>
      </span>
      {children}
    </div>
  );
}
