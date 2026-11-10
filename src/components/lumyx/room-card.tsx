"use client";
import { useLumyxLink } from "../../lib/link";
import { cn } from '../../lib/utils';
import { StatusDot, type Status } from "./status-dot";
import { Badge } from '../ui/badge';

export type Room = {
  id: string;
  region: string;
  peers: number;
  status: Status;
  durationLabel: string;
  bitrateLabel: string;
  worstLossPct: number;
};

export function RoomCard({ room, href, className }: { room: Room; href?: string; className?: string }) {
  const { Link } = useLumyxLink();
  const body = (
    <div className={cn("sl-lift rounded-lg border border-hairline bg-card p-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <StatusDot status={room.status} />
            <span className="sl-num text-14 font-semibold text-strong">{room.id}</span>
          </span>
          <span className="sl-num text-12 text-faint">{room.region} · {room.durationLabel}</span>
        </div>
        <Badge tone="room">{room.peers} peers</Badge>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-subtle pt-3">
        <div className="flex flex-col gap-1">
          <span className="sl-label">Bitrate</span>
          <span className="sl-num text-16 font-semibold text-strong">{room.bitrateLabel}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="sl-label">Worst loss</span>
          <span className={cn("sl-num text-16 font-semibold", room.worstLossPct >= 2 ? "text-danger" : "text-strong")}>
            {room.worstLossPct.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
  return href ? <Link href={href} className="block no-underline hover:no-underline">{body}</Link> : body;
}
