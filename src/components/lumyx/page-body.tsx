import * as React from "react";
import { cn } from "../../lib/utils";

/** Row 2 of the SidebarInset grid — the only area that scrolls. 1400px, 24px gutter, 16px rhythm. */
export function PageBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className="sl-scroll row-start-2 min-w-0 overflow-y-auto">
      <div className={cn("sl-enter mx-auto flex w-full max-w-[1400px] flex-col gap-4 p-4 lg:p-6", className)}>{children}</div>
    </div>
  );
}
