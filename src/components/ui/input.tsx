import * as React from "react";
import { cn } from '../../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full rounded-sm border border-stroke bg-card px-3 text-14 text-strong",
        "placeholder:text-faint transition-colors duration-400 ease-[var(--ease-out)] hover:border-stroke-hover",
        "outline-none focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:border-danger aria-invalid:focus-visible:outline-danger",
        className
      )}
      {...props}
    />
  );
}

export { Input };
