import * as React from "react";
import { cn } from "../../lib/utils";

/** SVG path through `data` in a W×H box, `max` at the top, values clamped to [0, max]. */
export const linePath = (data: number[], max: number, W: number, H: number) =>
  data
    .map((v, i) => `${i ? "L" : "M"}${((i * W) / Math.max(data.length - 1, 1)).toFixed(1)} ${(H - (Math.min(max, Math.max(0, v)) / (max || 1)) * H).toFixed(1)}`)
    .join(" ");

/** The same path closed down to the baseline, for a 6–8% area fill. */
export const areaPath = (data: number[], max: number, W: number, H: number) => `${linePath(data, max, W, H)} L${W} ${H} L0 ${H} Z`;

/** A band between two series (p50–p95, min–max), closed along `lo` reversed. */
export const bandPath = (lo: number[], hi: number[], max: number, W: number, H: number) => {
  const back = lo
    .map((v, i) => [i, v] as const)
    .reverse()
    .map(([i, v]) => `L${((i * W) / Math.max(lo.length - 1, 1)).toFixed(1)} ${(H - (Math.min(max, Math.max(0, v)) / (max || 1)) * H).toFixed(1)}`)
    .join(" ");
  return `${linePath(hi, max, W, H)} ${back} Z`;
};

export type LegendSwatch = "line" | "dashed" | "square";

/** One legend entry: a 12px line, a dashed line (threshold, pace) or a 8px square (stacked band). */
export function LegendItem({
  color, label, swatch = "line", mono = false,
}: { color: string; label: React.ReactNode; swatch?: LegendSwatch; mono?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-12 text-muted">
      <span
        aria-hidden
        className={cn(swatch === "square" ? "size-2 rounded-2xs" : swatch === "dashed" ? "h-0 w-3 border-t-2 border-dashed" : "h-0.5 w-3")}
        style={swatch === "dashed" ? { borderColor: color } : { background: color }}
      />
      <span className={cn(mono && "sl-num")}>{label}</span>
    </span>
  );
}

/** A row of legend entries, usually placed in a card header next to the title. */
export function ChartLegend({
  items, swatch, className,
}: { items: { name: React.ReactNode; color: string; swatch?: LegendSwatch; mono?: boolean }[]; swatch?: LegendSwatch; className?: string }) {
  return (
    <span className={cn("flex flex-wrap items-center gap-4", className)}>
      {items.map((it, i) => (
        <LegendItem key={i} color={it.color} label={it.name} swatch={it.swatch ?? swatch} mono={it.mono} />
      ))}
    </span>
  );
}

/** Mono x-axis labels spread evenly under a chart. */
export function TimeAxis({ labels, className }: { labels: React.ReactNode[]; className?: string }) {
  return (
    <div className={cn("sl-num mt-2 flex justify-between text-12 text-faint", className)}>
      {labels.map((t, i) => <span key={i}>{t}</span>)}
    </div>
  );
}

/**
 * Stacked areas, one band per series (bottom band first), with an optional dashed ink line for
 * the pace to hold, given as fractions of the height from the top at the left and right edges.
 */
export function StackedAreaChart({
  series, colors, max, height = 200, pace, xLabels = [], label, className,
}: {
  series: number[][];
  colors: string[];
  max: number;
  height?: number;
  pace?: [number, number];
  xLabels?: React.ReactNode[];
  label: string;
  className?: string;
}) {
  const W = 600;
  const H = height;
  const n = series[0]?.length ?? 0;
  const x = (i: number) => ((i * W) / Math.max(n - 1, 1)).toFixed(1);
  const y = (v: number) => (H - (v / (max || 1)) * H).toFixed(1);

  const acc = new Array<number>(n).fill(0);
  const bands = series.map((data, k) => {
    const lo = acc.slice();
    data.forEach((v, i) => { acc[i] += v; });
    const top = acc.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
    const bottom = lo.map((_, i) => `L${x(n - 1 - i)} ${y(lo[n - 1 - i])}`).join(" ");
    return { d: `${top} ${bottom} Z`, color: colors[k] ?? "var(--series-5)", key: k };
  });

  return (
    <div className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label} className="block w-full" style={{ height: H }}>
        <path d={[0.25, 0.5, 0.75].map((f) => `M0 ${H * f}H${W}`).join("")} stroke="var(--border-subtle)" vectorEffect="non-scaling-stroke" />
        {[...bands].reverse().map((b) => (
          <path key={b.key} d={b.d} fill={b.color} fillOpacity={0.9} />
        ))}
        {pace ? (
          <path
            d={`M0 ${H * pace[0]} L${W} ${H * pace[1]}`}
            stroke="var(--surface-ink)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
      </svg>
      {xLabels.length ? <TimeAxis labels={xLabels} /> : null}
    </div>
  );
}
