import * as React from "react";
import { cn } from '../../lib/utils';

/** Tables live inside a card, edge to edge: 16px outer gutter, 8px between columns. */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto sl-scroll">
      <table data-slot="table" className={cn("w-full border-collapse text-14", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-t border-subtle transition-colors duration-300 ease-[var(--ease-out)] [tbody_&]:hover:bg-sunken [thead_&]:border-t-0",
        "data-[selected=true]:bg-accent-subtle data-[selected=true]:shadow-[inset_2px_0_0_var(--accent)]",
        className
      )}
      {...props}
    />
  );
}

/** Headers recede: 12px, medium, faint, sentence case. */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn("px-2 py-3 text-left align-middle text-12 font-medium whitespace-nowrap text-faint first:pl-4 last:pr-4", className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("px-2 py-3 align-middle text-14 first:pl-4 last:pr-4", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
