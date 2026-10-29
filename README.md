# @lumyx/ui

The Lumyx design system — React components and Tailwind CSS v4 tokens, built on
[shadcn/ui](https://ui.shadcn.com) and Radix primitives. It powers the
[Lumyx dashboard](https://github.com/lumyx-dev/dashboard), [lumyx.dev](https://lumyx.dev) and
[docs.lumyx.dev](https://docs.lumyx.dev).

> **Pre-1.0.** The API follows the needs of the Lumyx apps and may change between minor versions.

## Install

```bash
bun add @lumyx/ui
# until the first npm release:
bun add github:lumyx-dev/ui
```

Peer dependencies: `react@^19`, `react-dom@^19`, `next@^16` (a few components use `next/link`
and `next/navigation`).

## Setup (Next.js + Tailwind CSS v4)

The package ships TypeScript source, not a build. Let Next.js compile it:

```ts
// next.config.ts
const nextConfig = { transpilePackages: ['@lumyx/ui'] };
export default nextConfig;
```

Import the tokens and point Tailwind at the component sources so their classes are generated:

```css
/* app/globals.css */
@import 'tailwindcss';
@import '@lumyx/ui/styles.css';
@source '../node_modules/@lumyx/ui/src';
```

Adjust the `@source` path to where `node_modules` sits relative to the CSS file.

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

Entry points:

| Import | Contents |
|---|---|
| `@lumyx/ui` | Components (`components/ui`, `components/lumyx`) and the `cn` helper |
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
