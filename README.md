# @lumyx/ui

The Lumyx design system — React components and Tailwind CSS v4 tokens, built on
[shadcn/ui](https://ui.shadcn.com) and Radix primitives. It powers the
[Lumyx dashboard](https://github.com/lumyx-dev/dashboard), [lumyx.dev](https://lumyx.dev) and
[docs.lumyx.dev](https://docs.lumyx.dev).

> **Pre-1.0.** The API follows the needs of the Lumyx apps and may change between minor versions.

## Install

```bash
bun add @lumyx/ui
# until the first npm release, pin a tag — never the moving default branch:
bun add github:lumyx-dev/ui#v0.4.0
```

Peer dependencies: `react@^19` and `react-dom@^19`. The package does not depend on any
framework: links go through `LumyxLinkProvider` (see [Routing](#routing)).

## Setup (Tailwind CSS v4)

The package ships TypeScript source, not a build. With Next.js, let it compile the package:

```ts
// next.config.ts
const nextConfig = { transpilePackages: ['@lumyx/ui'] };
export default nextConfig;
```

Vite-based frameworks (Astro with `@astrojs/react`, Remix, …) compile it out of the box.

Import the tokens and point Tailwind at the component sources so their classes are generated:

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@lumyx/ui/styles.css';
@source '../node_modules/@lumyx/ui/src';
```

Adjust the `@source` path to where `node_modules` sits relative to the CSS file.

Numbers and identifiers use Geist Mono through `--font-mono` (`sl-num`). With Next.js, load
both families with `next/font` and expose them as `--font-geist-sans` and `--font-geist-mono`.

## Usage

```tsx
import { Button, Card, Badge } from '@lumyx/ui';

export function Example() {
  return (
    <Card>
      <Badge>live</Badge>
      <Button>Join room</Button>
    </Card>
  );
}
```

## Migrating from 0.3

0.4 moves the system to the v3 visual language (Cloud UI v3, Dashboard UI v3). Token and
class names are unchanged, their values are not:

- **Palette.** True greys (`#fafafa` page, `#eaeaea` card stroke, `#0a0a0a` ink); semantic inks
  are `#16a34a` / `#d97706` / `#e5484d`. New tokens: `bg-ink` / `text-on-ink`, `bg-chrome`,
  `border-stroke-hover`, `border-chrome-border`, `bg-accent-subtle`, `bg-accent-soft`,
  `border-{ok,warn,danger,info}-border`.
- **Radii.** `xs` 6 · `sm` 8 · `md` 12 · `lg` 16 (were 8 · 12 · 14 · 18).
- **Type.** Body is 14/20; `text-24`, `text-30`, `text-36` join the scale; line heights sit on a
  4px grid. `sl-num` now switches to Geist Mono (use `sl-tnum` for tabular sans);
  `sl-label` is 12px sentence case, no longer uppercase.
- **Motion.** One curve, `cubic-bezier(0.32,0.72,0,1)`; 300 / 400 / 500 / 600ms are allowed.
  Focus is a 2px accent outline offset by 2px.
- **Button.** `primary` is ink. The former indigo primary is `accent`. New `danger-outline`.
- **Badge.** Pills by default; `shape="chip"` for mono machine values.
- **Card.** Flat at rest, `interactive` lifts on hover; header and content pad 16px.
- **Tabs.** `TabsList` is segmented by default; pass `variant="underline"` for the old look.
  `SegmentedControl` covers toggles that are not navigation.
- **Metrics.** `MetricCard` is a card of its own (`bare` drops the frame) with `sub`,
  `subState` and an inline 64×20 sparkline; `MetricGrid` is a gapped responsive grid.
- **Chrome.** `TopBar` (row 1) and `PageHeader` (inside `PageBody`) replace `AppHeader`,
  which still renders but is deprecated. `SidebarBrand` and `SidebarPanel` build the
  sidebar head and foot; `SidebarNav` items take `count` and `dot`.
- **Feedback.** `AlertBanner` takes `icon`, `action` and `onDismiss`; `CodeBlock` is new.
- **Data viz.** `TimeSeriesChart` takes per-series `area` and `dashed`, `thresholds`, a `band`
  (p50–p95), a `playhead`, a fixed `max`, and `legend={false}` to move the legend into the card
  header with `ChartLegend`. New: `StackedAreaChart`, `LegendItem`, `TimeAxis`, and the
  `linePath` / `areaPath` / `bandPath` helpers for hand-drawn charts.
- **Tones.** `Tone` with `toneText` / `toneBg` / `toneVar`, `thresholdTone` and `scoreTone`.
  `Dot` is a still tone dot (`StatusDot` breathes while live). `ScoreBar`, `EventFeed` (two-line),
  `InsetStat`, `MeterRow`, `SearchField`, `UnitInput`; `MetricCard` takes `progress`.
- **Tokens added.** `accent-muted` (second indigo step), `text-on-ink-accent`, `on-ink-border`,
  and a 4px `rounded-2xs`.

## Routing

`SidebarNav`, `AppHeader` breadcrumbs and `RoomCard` render internal links. By default they are
plain `<a>` elements and no navigation item is marked active. Plug in your router once, in a
client component that wraps your pages:

```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LumyxLinkProvider } from '@lumyx/ui';

export function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <LumyxLinkProvider link={Link} pathname={usePathname()}>
      {children}
    </LumyxLinkProvider>
  );
}
```

Outside a router (Astro islands, static pages), skip the provider, or pass `activeHref` to
`SidebarNav` directly.

Entry points:

| Import | Contents |
|---|---|
| `@lumyx/ui` | Components (`components/ui`, `components/lumyx`), `LumyxLinkProvider` and the `cn` helper |
| `@lumyx/ui/styles.css` | Design tokens, the shadcn theme contract and base styles |
| `@lumyx/ui/code-theme` | Shiki code-highlighting theme matching the tokens |

## Development

```bash
bun install
bun run check-types
bun test
bun run verify:ds     # design-system constraints (no literal colours outside styles.css, …)
```

Design notes live in [`docs/`](docs/).

## License

[MIT](LICENSE) © Mathieu Chambaud

## Releasing

Versions follow [SemVer](https://semver.org/) and are cut from an up-to-date `main`:

```sh
npm version patch   # or minor / major
```

This runs the CI checks, bumps `package.json`, commits `chore(release): vX.Y.Z`, tags `vX.Y.Z`
and pushes. The tag triggers the Release workflow, which publishes a GitHub release with
generated notes.
