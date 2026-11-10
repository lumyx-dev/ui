"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { Input } from "./input";

/** A search input with a leading glyph; 240px from `sm` up, full width below. */
function SearchField({
  className, inputClassName, "aria-label": ariaLabel, ...props
}: Omit<React.ComponentProps<"input">, "type"> & { inputClassName?: string; "aria-label": string }) {
  return (
    <label className={cn("relative block w-full sm:w-60", className)}>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 stroke-[1.75] text-faint" />
      <Input type="search" aria-label={ariaLabel} className={cn("h-8 pl-8", inputClassName)} {...props} />
    </label>
  );
}

/** An input with a unit after the value — `ms`, `%`, `kbps` — set in the faint ink. */
function UnitInput({
  unit, className, inputClassName, ...props
}: React.ComponentProps<"input"> & { unit: React.ReactNode; inputClassName?: string }) {
  return (
    <span className={cn("relative block", className)}>
      <Input className={cn("sl-num pr-12", inputClassName)} {...props} />
      <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-12 text-faint">{unit}</span>
    </span>
  );
}

export { SearchField, UnitInput };
