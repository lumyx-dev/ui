import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '../../lib/utils';

/**
 * v3: the primary action is ink, not indigo. Secondary is a white control on an 8px radius
 * whose stroke darkens on hover. Press settles at 98% — no bounce. Focus is a 2px indigo
 * outline offset by 2px.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border font-semibold transition-all duration-400 ease-[var(--ease-out)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:stroke-[1.75]",
  {
    variants: {
      variant: {
        primary: "border-ink bg-ink text-card hover:border-[var(--n-700)] hover:bg-[var(--n-700)] dark:hover:border-[var(--n-200)] dark:hover:bg-[var(--n-200)]",
        accent: "border-accent bg-accent text-on-accent hover:border-accent-hover hover:bg-accent-hover",
        secondary: "border-stroke bg-card text-strong hover:border-stroke-hover",
        ghost: "border-transparent bg-transparent text-muted hover:bg-hover hover:text-strong",
        danger: "border-transparent bg-transparent text-danger hover:bg-danger-tint",
        "danger-outline": "border-danger-border bg-card text-danger hover:border-danger hover:bg-danger-tint",
        link: "h-auto border-transparent bg-transparent p-0 text-accent-text hover:text-accent-hover active:scale-100",
      },
      size: {
        sm: "h-7 rounded-sm px-2.5 text-12",
        md: "h-8 rounded-sm px-3 text-14",
        lg: "h-10 rounded-sm px-4 text-14",
        icon: "size-8 rounded-sm px-0",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  }
);

function Button({
  className, variant, size, asChild = false, ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
