# Changelog

All notable changes to `@lumyx/ui`. Versions follow [SemVer](https://semver.org/); before 1.0 a
minor bump may break the API or the look. Releases are cut from `main` with `npm version`
(see Releasing in the README) and tagged `vX.Y.Z`.

## 0.4.0

The v3 visual language, from the Cloud UI v3 and Dashboard UI v3 designs. See "Migrating from 0.3"
in the README.

### Breaking

- Token values move to true greys, an ink primary, `#16a34a` / `#d97706` / `#e5484d` semantics and
  the coral `#ff8f70` second series. Token and class names are unchanged.
- Radii become `xs` 6 · `sm` 8 · `md` 12 · `lg` 16 (were 8 · 12 · 14 · 18).
- Body text is 14/20 and line heights sit on a 4px grid. `sl-num` sets Geist Mono; `sl-label` is
  12px sentence case.
- `Button` `primary` is ink; the indigo button is `accent`.
- `Card` is flat at rest; `CardHeader` has no rule and pads 16px.
- `TabsList` is segmented by default (`variant="underline"` for the old look).
- `MetricCard` is a card of its own and `MetricGrid` a gapped grid.
- Focus is a 2px accent outline instead of a 3px ring.

### Added

- Chrome: `TopBar`, `PageHeader`, `SidebarBrand`, `SidebarPanel`; `SidebarNav` items take `count`
  and `dot`, and the nav takes an `isActive` matcher.
- Controls: `SegmentedControl`, `SearchField`, `UnitInput`; `Button` `danger-outline`; `Badge`
  `shape="chip"`; `Card` `interactive`; `Progress` `projected`.
- Data viz: `StackedAreaChart`, `ChartLegend`, `LegendItem`, `TimeAxis`, `linePath` / `areaPath` /
  `bandPath`; `TimeSeriesChart` gains `area`, `dashed`, `thresholds`, `band`, `playhead`,
  `playheadColor`, `max`, `yAxis` and `legend`, and draws its labels in HTML so they keep their
  shape at any width.
- Tones: `Tone` (incl. `muted`), `toneText` / `toneBg` / `toneVar`, `thresholdTone` (with a
  `healthy` tone for in-range values), `scoreTone`, `Dot`,
  `ScoreBar`, `EventFeed`, `InsetStat`, `MeterRow`; `MetricCard` `sub`, `subState`, `progress`,
  `bare`; `AlertBanner` `icon`, `action`, `onDismiss`; `CodeBlock`.
- Tokens: `ink`, `on-ink`, `on-ink-accent`, `on-ink-border`, `chrome`, `chrome-border`,
  `stroke-hover`, `accent-subtle`, `accent-soft`, `accent-muted`, `{ok,warn,danger,info}-border`,
  `rounded-2xs`, type sizes 24 / 30 / 36, durations 300 / 400 / 500 / 600.

### Deprecated

- `AppHeader` (use `TopBar` + `PageHeader`) and `MetricCard` `threshold` (use `sub`).

## 0.3.0

- **Breaking:** links go through `LumyxLinkProvider`; the package no longer depends on Next.js.
- Components aligned with the design system tokens; release flow with tagged GitHub releases.
