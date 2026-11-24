import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../lib/utils';

/**
 * `pill` (default) is a status or role: 12px semibold on a tint. `chip` is a machine value —
 * a scope, an event name — set in mono on a 6px radius.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-0.5 text-12",
  {
    variants: {
      tone: {
        neutral: "bg-hover text-muted",
        accent: "bg-accent-tint text-accent-text",
        room: "bg-accent2-tint text-[var(--coral-600)]",
        ok: "bg-ok-tint text-ok",
        warn: "bg-warn-tint text-warn",
        danger: "bg-danger-tint text-danger",
        info: "bg-info-tint text-info",
      },
      shape: {
        pill: "rounded-pill font-semibold",
        chip: "sl-num rounded-xs font-normal",
      },
    },
    defaultVariants: { tone: "neutral", shape: "pill" },
  }
);

function Badge({
  className, tone, shape, asChild = false, ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ tone, shape }), className)} {...props} />;
}

export { Badge, badgeVariants };
