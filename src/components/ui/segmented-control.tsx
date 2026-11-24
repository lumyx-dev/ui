"use client";
import * as React from "react";
import { cn } from '../../lib/utils';

export type SegmentedOption<T extends string> = { value: T; label: React.ReactNode };

/**
 * A toggle group for a view setting — environment, time range, window — that is not tab
 * navigation. Same look as `TabsList variant="segmented"`; each segment is a button with
 * `aria-pressed`.
 */
function SegmentedControl<T extends string>({
  options, value, onValueChange, className, "aria-label": ariaLabel,
}: {
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  "aria-label": string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} data-slot="segmented-control" className={cn("inline-flex rounded-sm bg-hover p-0.5", className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onValueChange(o.value)}
          className={cn(
            "rounded-xs px-3 py-1 text-12 font-medium text-muted transition-all duration-400 ease-[var(--ease-out)] hover:text-strong",
            "aria-pressed:bg-card aria-pressed:text-strong aria-pressed:shadow-[var(--shadow-xs)]",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export { SegmentedControl };
