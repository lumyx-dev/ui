import * as React from "react";
import { cn } from "../../lib/utils";
import { Dot } from "./dot";
import type { Tone } from "./tone";

export type FeedEvent = { time: string; message: React.ReactNode; detail?: React.ReactNode; tone?: Tone };

/**
 * Two-line event feed: a still dot, the fact, its identifier in mono underneath, the time on the
 * right. `EventList` stays the dense one-line variant.
 */
export function EventFeed({ events, className }: { events: FeedEvent[]; className?: string }) {
  return (
    <ul className={cn("flex flex-col", className)}>
      {events.map((e, i) => (
        <li key={`${e.time}-${i}`} className="grid grid-cols-[16px_minmax(0,1fr)_auto] gap-2 py-2">
          <Dot tone={e.tone ?? "idle"} className="mt-1.5" />
          <span className="flex min-w-0 flex-col">
            <span className="text-14 font-medium text-strong">{e.message}</span>
            {e.detail != null ? <span className="sl-num truncate text-12 text-faint">{e.detail}</span> : null}
          </span>
          <span className="sl-num text-12 leading-5 text-faint">{e.time}</span>
        </li>
      ))}
    </ul>
  );
}
