/**
 * One vocabulary for "what colour is this fact": a threshold crossed (`warn`, `danger`), healthy
 * (`ok`), the indigo data axis (`accent`), nothing to report (`idle`), secondary ink (`muted`) or
 * plain ink (`neutral`).
 */
export type Tone = "ok" | "warn" | "danger" | "accent" | "idle" | "muted" | "neutral";

/** Text ink per tone. */
export const toneText: Record<Tone, string> = {
  ok: "text-ok",
  warn: "text-warn",
  danger: "text-danger",
  accent: "text-accent-text",
  idle: "text-faint",
  muted: "text-muted",
  neutral: "text-strong",
};

/** Solid fill per tone — dots, meters. */
export const toneBg: Record<Tone, string> = {
  ok: "bg-ok-solid",
  warn: "bg-warn-solid",
  danger: "bg-danger-solid",
  accent: "bg-accent",
  idle: "bg-idle",
  muted: "bg-muted",
  neutral: "bg-strong",
};

/** CSS colour per tone, for SVG strokes and fills. */
export const toneVar: Record<Tone, string> = {
  ok: "var(--ok-solid)",
  warn: "var(--warn-solid)",
  danger: "var(--danger-solid)",
  accent: "var(--accent)",
  idle: "var(--idle)",
  muted: "var(--text-muted)",
  neutral: "var(--text-strong)",
};

/**
 * `danger` at or past `danger`, `warn` at or past `warn`, otherwise `healthy` — higher is worse.
 * A coloured number means a threshold was crossed, so tables usually pass `healthy: "neutral"`
 * (or `"muted"`) to keep in-range values in plain ink.
 */
export const thresholdTone = (value: number, warn: number, danger: number, healthy: Tone = "ok"): Tone =>
  value >= danger ? "danger" : value >= warn ? "warn" : healthy;

/** For a 0–100 quality score — lower is worse. Defaults follow Dashboard v3 (80 / 50). */
export const scoreTone = (score: number, good = 80, poor = 50): Tone =>
  score < poor ? "danger" : score < good ? "warn" : "ok";
