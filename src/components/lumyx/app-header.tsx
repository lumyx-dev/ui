"use client";
import * as React from "react";
import { TopBar, type Crumb } from "./top-bar";

export type { Crumb } from "./top-bar";

/**
 * @deprecated since 0.4.0 — compose `TopBar` (row 1) with `PageHeader` (inside `PageBody`).
 * Kept so 0.3 call sites still render: the title becomes the last breadcrumb, `meta` and
 * `actions` sit on the right of the bar.
 */
export function AppHeader({
  breadcrumb,
  title,
  meta,
  actions,
  className,
}: {
  breadcrumb?: Crumb[];
  title: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  const crumbs: Crumb[] = [...(breadcrumb ?? []), { label: typeof title === "string" ? title : "" }].filter((c) => c.label);
  return (
    <TopBar breadcrumb={crumbs} className={className}>
      {typeof title !== "string" ? <span className="text-14 font-semibold text-strong">{title}</span> : null}
      {meta ? <span className="hidden truncate text-12 text-faint md:inline">{meta}</span> : null}
      {actions}
    </TopBar>
  );
}
