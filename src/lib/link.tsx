"use client";
import * as React from "react";

/**
 * Ce dont les composants Lumyx ont besoin d'un lien : les attributs d'une ancre et un `href`.
 * `next/link`, le `Link` de React Router ou une simple balise `<a>` conviennent tous.
 */
export type LinkComponent = React.ComponentType<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>;

type LinkContextValue = {
  /** Composant rendu pour chaque lien interne. Par defaut, une balise `<a>`. */
  Link: LinkComponent;
  /** Chemin courant, pour marquer l'item actif de la navigation. */
  pathname?: string;
};

function Anchor(props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a {...props} />;
}

const LinkContext = React.createContext<LinkContextValue>({ Link: Anchor });

/**
 * Branche le routeur de l'app sur les composants Lumyx, sans que le paquet depende d'un
 * framework. A poser une fois, dans un composant client qui englobe les pages :
 *
 *   <LumyxLinkProvider link={Link} pathname={usePathname()}>…</LumyxLinkProvider>
 *
 * Sans provider, les liens sont des `<a>` et aucun item de navigation n'est actif.
 */
export function LumyxLinkProvider({
  link,
  pathname,
  children,
}: {
  link?: LinkComponent;
  pathname?: string;
  children: React.ReactNode;
}) {
  const value = React.useMemo(() => ({ Link: link ?? Anchor, pathname }), [link, pathname]);
  return <LinkContext.Provider value={value}>{children}</LinkContext.Provider>;
}

export function useLumyxLink(): LinkContextValue {
  return React.useContext(LinkContext);
}
