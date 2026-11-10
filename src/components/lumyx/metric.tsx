import * as React from "react";
import { cn } from '../../lib/utils';
import { Sparkline } from "./sparkline";

export type MetricState = "ok" | "warn" | "danger" | "neutral";

const INK: Record<MetricState, string> = {
  ok: "text-strong",
  warn: "text-warn",
  danger: "text-danger",
  neutral: "text-strong",
};

/** `lg` is a KPI card (24/32), `sm` a metric packed several to a card (20/28). */
const SIZE = {
  lg: { value: "text-24", unit: "text-14" },
  sm: { value: "text-20", unit: "text-14" },
} as const;

/**
 * v3 KPI card: label 12px muted, value in mono, unit faint, then a context line on the left
 * and a 64×20 sparkline on the right. A coloured number always means a threshold was crossed.
 */
export function MetricCard({
  label, value, unit, state = "ok", size = "lg", threshold, sub, subState, series, seriesColor, bare = false, className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  state?: MetricState;
  size?: keyof typeof SIZE;
  /** @deprecated since 0.4.0 — use `sub`. Rendered as the context line when `sub` is absent. */
  threshold?: string;
  /** Context line under the value: a delta, a threshold, a projection. */
  sub?: React.ReactNode;
  /** Colours the context line; defaults to `state` when it crossed a threshold. */
  subState?: MetricState;
  series?: number[];
  seriesColor?: string;
  /** Drop the card frame — for metrics placed inside another card. */
  bare?: boolean;
  className?: string;
}) {
  const context = sub ?? threshold;
  const subTone = subState ?? state;
  return (
    <div className={cn("flex flex-col gap-2", bare ? "" : "rounded-lg border border-hairline bg-card p-4", className)}>
      <span className="text-12 text-muted">{label}</span>
      <span className="flex items-baseline gap-1">
        <span className={cn("sl-num font-semibold tracking-[-0.02em]", SIZE[size].value, INK[state])}>{value}</span>
        {unit ? <span className={cn(SIZE[size].unit, "text-faint")}>{unit}</span> : null}
      </span>
      {context != null || series ? (
        <span className="flex items-center justify-between gap-2">
          {context != null ? (
            <span className={cn("text-12", subTone === "warn" ? "text-warn" : subTone === "danger" ? "text-danger" : subState === "ok" ? "text-ok" : "text-faint")}>
              {context}
            </span>
          ) : <span />}
          {series ? <Sparkline data={series} color={seriesColor ?? "var(--series-1)"} width={64} height={20} fill={false} /> : null}
        </span>
      ) : null}
    </div>
  );
}

/**
 * A responsive row of KPI cards: two columns on narrow screens, `columns` from `lg` up.
 */
export function MetricGrid({ columns = 4, className, children }: { columns?: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(var(--metric-cols),minmax(0,1fr))]", className)}
      style={{ "--metric-cols": columns } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
