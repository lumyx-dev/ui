"use client";
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from '../../lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 items-center rounded-pill border border-transparent p-0.5",
        "bg-stroke-hover transition-colors duration-120 data-[state=checked]:bg-accent",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="pointer-events-none block size-4 rounded-pill bg-on-accent shadow-[var(--shadow-xs)] transition-transform duration-180 ease-[var(--ease-out)] data-[state=checked]:translate-x-4" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
