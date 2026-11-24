"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from '../../lib/utils';

/**
 * An 8px meter. `projected` stacks a lighter segment after the fill — where the month lands
 * at the current pace — in `--accent-soft` unless `projectedClassName` says otherwise.
 */
function Progress({
  className, value = 0, projected, indicatorClassName, projectedClassName, ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  projected?: number;
  indicatorClassName?: string;
  projectedClassName?: string;
}) {
  const v = Math.min(100, Math.max(0, value ?? 0));
  const p = projected == null ? 0 : Math.min(100 - v, Math.max(0, projected));
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={v}
      className={cn("relative h-2 w-full overflow-hidden rounded-pill bg-hover", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("absolute inset-y-0 left-0 rounded-pill bg-accent transition-[width] duration-500 ease-[var(--ease-out)]", indicatorClassName)}
        style={{ width: `${v}%` }}
      />
      {p > 0 ? (
        <span
          aria-hidden
          className={cn("absolute inset-y-0 bg-accent-soft", projectedClassName)}
          style={{ left: `${v}%`, width: `${p}%` }}
        />
      ) : null}
    </ProgressPrimitive.Root>
  );
}

export { Progress };
