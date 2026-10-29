import { describe, expect, test } from "bun:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LumyxLinkProvider } from "./link";
import { RoomCard } from "../components/lumyx/room-card";
import { SidebarNav } from "../components/lumyx/sidebar-nav";
import { SidebarProvider } from "../components/ui/sidebar";

const room = {
  id: "standup",
  region: "eu",
  peers: 3,
  status: "live" as const,
  durationLabel: "12 min",
  bitrateLabel: "1.2 Mb/s",
  worstLossPct: 0.4,
};

function TestLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a data-router="test" {...props} />;
}

const Icon = () => <svg />;
const sections = [{ label: "Live", items: [
  { href: "/", label: "Overview", icon: Icon },
  { href: "/rooms", label: "Rooms", icon: Icon },
] }];

const nav = (provider: { link?: typeof TestLink; pathname?: string }, activeHref?: string) =>
  renderToStaticMarkup(
    <LumyxLinkProvider {...provider}>
      <SidebarProvider>
        <SidebarNav sections={sections} ariaLabel="Main" activeHref={activeHref} />
      </SidebarProvider>
    </LumyxLinkProvider>,
  );

describe("LumyxLinkProvider", () => {
  test("without a provider, links are plain anchors", () => {
    const html = renderToStaticMarkup(<RoomCard room={room} href="/rooms/standup" />);
    expect(html).toContain('href="/rooms/standup"');
    expect(html).not.toContain("data-router");
  });

  test("the provided link component renders every internal link", () => {
    const html = renderToStaticMarkup(
      <LumyxLinkProvider link={TestLink}>
        <RoomCard room={room} href="/rooms/standup" />
      </LumyxLinkProvider>,
    );
    expect(html).toContain('data-router="test"');
  });

  test("the provider pathname marks the active nav item", () => {
    const html = nav({ link: TestLink, pathname: "/rooms" });
    expect(html).toMatch(/aria-current="page"[^>]*href="\/rooms"|href="\/rooms"[^>]*aria-current="page"/);
    expect(html.match(/aria-current="page"/g)).toHaveLength(1);
  });

  test("activeHref overrides the provider pathname", () => {
    const html = nav({ pathname: "/rooms" }, "/");
    expect(html).toMatch(/aria-current="page"[^>]*href="\/"|href="\/"[^>]*aria-current="page"/);
  });
});
