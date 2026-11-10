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
 */
export function TimeSeriesChart({
  series, height = 200, yUnit = "", xLabels = [], max: maxProp, thresholds = [], band, playhead, legend = true, className,
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
  /** Set to false to place a `ChartLegend` in the card header instead. */
  legend?: boolean;
  className?: string;
}) {
  const W = 800;
  const H = height;
  const padL = 40, padB = 22, padT = 8, padR = 8;
  const all = [...series.flatMap((s) => s.data), ...(band ? band.hi : []), ...thresholds.map((t) => t.value)];
  const max = maxProp ?? Math.max(...all, 1);
  const min = 0;
  const len = Math.max(...series.map((s) => s.data.length), band?.hi.length ?? 0, 2);
  const x = (i: number) => padL + (i / (len - 1)) * (W - padL - padR);
  const y = (v: number) => padT + (1 - (Math.min(max, v) - min) / (max - min || 1)) * (H - padT - padB);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => min + t * (max - min));
  const pts = (d: number[]) => d.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const base = y(min).toFixed(1);

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" role="img">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke="var(--border-subtle)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <text x={0} y={y(t) + 3} fontSize="12" fill="var(--text-faint)" style={{ fontFamily: "var(--font-mono)", fontVariantNumeric: "tabular-nums" }}>
              {Math.round(t)}{yUnit}
            </text>
          </g>
        ))}
        {band ? (
          <polygon
            points={`${pts(band.hi)} ${band.lo.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).reverse().join(" ")}`}
            fill={band.color ?? "var(--accent)"}
            fillOpacity="0.1"
          />
        ) : null}
        {series.filter((s) => s.area).map((s) => (
          <polygon
            key={`${s.name}-area`}
            points={`${x(0).toFixed(1)},${base} ${pts(s.data)} ${x(s.data.length - 1).toFixed(1)},${base}`}
            fill={s.color}
            fillOpacity="0.08"
          />
        ))}
        {thresholds.map((t) => (
          <g key={`th-${t.value}`}>
            <line
              x1={padL} x2={W - padR} y1={y(t.value)} y2={y(t.value)}
              stroke={t.color ?? "var(--danger-solid)"} strokeWidth="1.5" strokeDasharray="6 6" vectorEffect="non-scaling-stroke"
            />
            {t.label ? (
              <text x={W - padR} y={y(t.value) - 4} fontSize="12" textAnchor="end" fill={t.color ?? "var(--danger-solid)"} style={{ fontFamily: "var(--font-mono)" }}>
                {t.label}
              </text>
            ) : null}
          </g>
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
        {playhead != null ? (
          <line
            x1={padL + Math.min(1, Math.max(0, playhead)) * (W - padL - padR)}
            x2={padL + Math.min(1, Math.max(0, playhead)) * (W - padL - padR)}
            y1={padT} y2={H - padB}
            stroke="var(--surface-ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
          />
        ) : null}
        {xLabels.map((l, i) => (
          <text key={l + i} x={x((i / Math.max(xLabels.length - 1, 1)) * (len - 1))} y={H - 4} fontSize="12" fill="var(--text-faint)" textAnchor="middle" style={{ fontFamily: "var(--font-mono)" }}>
            {l}
          </text>
        ))}
      </svg>
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
