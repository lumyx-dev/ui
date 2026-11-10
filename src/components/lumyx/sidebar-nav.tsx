"use client";
import * as React from "react";
import { useLumyxLink } from "../../lib/link";
import { cn } from "../../lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export type NavDot = "danger" | "warn" | "ok" | "accent";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  /** A count shown at the right edge, in mono — peers, rooms, open alerts. */
  count?: string | number;
  /** An 8px dot at the right edge — something on that screen needs a look. */
  dot?: NavDot;
};

export type NavSection = {
  /** Omit for the first group when it needs no heading. */
  label?: string;
  items: NavItem[];
};

const DOT: Record<NavDot, string> = {
  danger: "bg-danger-solid",
  warn: "bg-warn-solid",
  ok: "bg-ok-solid",
  accent: "bg-accent",
};

/** v3 sidebar nav: 14px rows on an 8px radius; the current page is an indigo tint, semibold. */
export function SidebarNav({
  sections,
  ariaLabel,
  activeHref,
  isActive,
}: {
  sections: NavSection[];
  ariaLabel: string;
  /** Force l'item actif ; par defaut, le `pathname` du `LumyxLinkProvider`. */
  activeHref?: string;
  /** Matching rule when an item owns nested routes; defaults to strict equality. */
  isActive?: (href: string, pathname: string) => boolean;
}) {
  const { Link, pathname: contextPathname } = useLumyxLink();
  const pathname = activeHref ?? contextPathname;
  const match = isActive ?? ((href: string, path: string) => href === path);
  return (
    <nav aria-label={ariaLabel} className="flex flex-col">
      {sections.map((section, si) => (
        <SidebarGroup key={section.label ?? si} className="gap-0.5 px-0 py-0">
          {section.label ? (
            <SidebarGroupLabel className="h-auto rounded-none px-3 pt-4 pb-1 text-12 font-semibold text-faint">
              {section.label}
            </SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {section.items.map((item) => {
                const active = pathname != null && match(item.href, pathname);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "h-auto gap-3 rounded-sm px-3 py-2 text-14 transition-all duration-400 ease-[var(--ease-out)]",
                        active
                          ? "bg-accent-tint font-semibold text-accent-text hover:bg-accent-tint hover:text-accent-text data-[active=true]:bg-accent-tint data-[active=true]:text-accent-text"
                          : "text-muted hover:bg-hover hover:text-strong",
                      )}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="no-underline hover:no-underline"
                      >
                        <item.icon className="size-4 shrink-0 stroke-[1.75]" />
                        <span className="flex-1">{item.label}</span>
                        {item.count != null ? (
                          <span className="sl-num text-12 font-normal text-faint">{item.count}</span>
                        ) : null}
                        {item.dot ? (
                          <span aria-hidden className={cn("size-2 shrink-0 rounded-pill", DOT[item.dot])} />
                        ) : null}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </nav>
  );
}
