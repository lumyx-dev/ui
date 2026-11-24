"use client";
import * as React from "react";
import { useLumyxLink } from "../../lib/link";
import { cn } from "../../lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

export type Crumb = { href?: string; label: string; mono?: boolean };

/**
 * Row 1 of the SidebarInset grid: a 56px bar, translucent over a 16px blur. Breadcrumb on the
 * left (the last crumb is the current screen, semibold), view controls on the right.
 */
export function TopBar({
  breadcrumb, leading, children, className,
}: {
  breadcrumb?: Crumb[];
  /** Rendered before the breadcrumb — a project switcher, for instance. */
  leading?: React.ReactNode;
  /** Right-hand controls: segmented controls, status pills, icon buttons. */
  children?: React.ReactNode;
  className?: string;
}) {
  const { Link } = useLumyxLink();
  return (
    <header
      className={cn(
        "row-start-1 flex h-14 shrink-0 items-center gap-3 border-b border-chrome-border bg-chrome px-4 backdrop-blur-[16px] lg:px-6",
        className,
      )}
    >
      <SidebarTrigger className="lg:hidden" />
      {leading}
      {leading && breadcrumb?.length ? <span aria-hidden className="hidden text-stroke-hover sm:inline">/</span> : null}
      {breadcrumb?.length ? (
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-14">
          {breadcrumb.map((crumb, i) => {
            const last = i === breadcrumb.length - 1;
            return (
              <React.Fragment key={`${crumb.label}-${i}`}>
                {i > 0 ? <span aria-hidden className="text-stroke-hover">/</span> : null}
                {crumb.href && !last ? (
                  <Link
                    href={crumb.href}
                    className={cn("truncate whitespace-nowrap text-muted no-underline hover:text-strong hover:no-underline", crumb.mono && "sl-num")}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={cn("truncate whitespace-nowrap", last ? "font-semibold text-strong" : "text-muted", crumb.mono && "sl-num")}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      ) : null}
      <span className="flex-1" />
      {children ? <div className="flex shrink-0 items-center gap-3">{children}</div> : null}
    </header>
  );
}

/** The page's own title block, at the top of the scrolling body. */
export function PageHeader({
  title, description, actions, className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <div className="min-w-[200px] flex-1">
        <h1 className="text-24 font-semibold text-strong">{title}</h1>
        {description ? <p className="text-14 text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
