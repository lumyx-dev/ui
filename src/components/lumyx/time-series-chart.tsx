"use client";
import * as React from "react";
import { cn } from '../../lib/utils';
import { ChartLegend } from "./chart";

export type Series = {
  name: string;
  color: string;
  data: number[];
  /** Fill under the line at 8% of its colour. */
  area?: boolean;
  /** Dashed — a comparison or a forecast. */
  dashed?: boolean;
};

export type ChartThreshold = { value: number; label?: string; color?: string };
export type ChartBand = { lo: number[]; hi: number[]; color?: string; name?: string };

/**
 * Dependency-free line chart on the five fixed series values. Optional area fills, dashed
 * threshold lines, a shaded band (p50–p95) and a playhead. Numbers are not tweened.
 *
 * Only the marks live in the stretched SVG; axis and threshold labels are HTML laid over it, so
 * text keeps its shape at any width and the last x label is never clipped.
 */
export function TimeSeriesChart({
  series, height = 200, yUnit = "", xLabels = [], max: maxProp, thresholds = [], band, playhead, playheadColor = "var(--accent)",
  yAxis = true, legend = true, className,
}: {
  series: Series[];
  height?: number;
  yUnit?: string;
  xLabels?: string[];
  /** Top of the y axis; defaults to the largest value. */
  max?: number;
  thresholds?: ChartThreshold[];
  band?: ChartBand;
  /** A vertical line at this fraction of the x axis (0–1) — the replay position. */
  playhead?: number;
  playheadColor?: string;
  /** Set to false for a bare chart (no y labels, plot spans the full width). */
  yAxis?: boolean;
  /** Set to false to place a `ChartLegend` in the card header instead. */
  legend?: boolean;
  className?: string;
}) {
  const W = 600;
  const H = 200;
  const all = [...series.flatMap((s) => s.data), ...(band ? band.hi : []), ...thresholds.map((t) => t.value)];
  const max = maxProp ?? Math.max(...all, 1);
  const len = Math.max(...series.map((s) => s.data.length), band?.hi.length ?? 0, 2);
  const x = (i: number) => (i / (len - 1)) * W;
  const y = (v: number) => H - (Math.min(max, Math.max(0, v)) / (max || 1)) * H;
  const pts = (d: number[]) => d.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const ticks = [1, 0.75, 0.5, 0.25];
  const pct = (v: number) => `${(1 - Math.min(max, Math.max(0, v)) / (max || 1)) * 100}%`;
  const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
  const ph = playhead == null ? null : Math.min(1, Math.max(0, playhead));

  return (
    <div className={cn("w-full", className)}>
      <div className="relative" style={{ height }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" className="absolute inset-0 block size-full overflow-visible">
          <path d={ticks.map((t) => `M0 ${H * (1 - t)}H${W}`).join("") + `M0 ${H}H${W}`} stroke="var(--border-subtle)" vectorEffect="non-scaling-stroke" />
          {band ? (
            <polygon
              points={`${pts(band.hi)} ${band.lo.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).reverse().join(" ")}`}
              fill={band.color ?? "var(--accent)"}
              fillOpacity="0.1"
            />
          ) : null}
          {series.filter((s) => s.area).map((s) => (
            <polygon key={`${s.name}-area`} points={`0,${H} ${pts(s.data)} ${x(s.data.length - 1).toFixed(1)},${H}`} fill={s.color} fillOpacity="0.08" />
          ))}
          {thresholds.map((t) => (
            <line
              key={`th-${t.value}`}
              x1={0} x2={W} y1={y(t.value)} y2={y(t.value)}
              stroke={t.color ?? "var(--danger-solid)"} strokeWidth="1.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke"
            />
          ))}
          {series.map((s) => (
            <polyline
              key={s.name}
              points={pts(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={s.dashed ? "6 6" : undefined}
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {ph != null ? (
            <line x1={ph * W} x2={ph * W} y1={0} y2={H} stroke={playheadColor} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          ) : null}
        </svg>
        {yAxis
          ? ticks.map((t) => (
              <span
                key={t}
                className="sl-num pointer-events-none absolute left-0 rounded-2xs bg-card/80 pr-1 text-12 text-faint"
                style={{ top: `${(1 - t) * 100}%`, transform: t === 1 ? undefined : "translateY(-50%)" }}
              >
                {fmt(max * t)}{yUnit}
              </span>
            ))
          : null}
        {thresholds.filter((t) => t.label).map((t) => (
          <span
            key={`thl-${t.value}`}
            className="sl-num pointer-events-none absolute right-0 -translate-y-full pb-0.5 text-12"
            style={{ top: pct(t.value), color: t.color ?? "var(--danger-solid)" }}
          >
            {t.label}
          </span>
        ))}
      </div>
      {xLabels.length ? (
        <div className="sl-num mt-2 flex justify-between text-12 text-faint">
          {xLabels.map((l, i) => <span key={l + i}>{l}</span>)}
        </div>
      ) : null}
      {legend ? (
        <ChartLegend
          className="mt-3"
          items={[
            ...series.map((s) => ({ name: s.name, color: s.color, swatch: s.dashed ? ("dashed" as const) : ("line" as const) })),
            ...(band?.name ? [{ name: band.name, color: band.color ?? "var(--accent)", swatch: "square" as const }] : []),
          ]}
        />
      ) : null}
    </div>
  );
}
