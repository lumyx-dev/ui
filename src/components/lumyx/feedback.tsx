import * as React from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from "lucide-react";
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export type Severity = "critical" | "warning" | "info" | "resolved";

const SEV = {
  critical: { tint: "bg-danger-tint", ink: "text-danger", border: "border-danger-border", glow: "shadow-[var(--shadow-danger)]", Icon: AlertTriangle, label: "Critical" },
  warning: { tint: "bg-warn-tint", ink: "text-warn", border: "border-warn-border", glow: "", Icon: AlertTriangle, label: "Warning" },
  info: { tint: "bg-info-tint", ink: "text-info", border: "border-info-border", glow: "", Icon: Info, label: "Info" },
  resolved: { tint: "bg-ok-tint", ink: "text-ok", border: "border-ok-border", glow: "", Icon: CheckCircle2, label: "Resolved" },
} as const;

export function SeverityBadge({ severity, children }: { severity: Severity; children?: React.ReactNode }) {
  const s = SEV[severity];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 text-12 font-semibold", s.tint, s.ink)}>
      {children ?? s.label}
    </span>
  );
}

/**
 * State the condition, the duration and the fix — then the machine context underneath.
 * v3: a white card stroked in the tone, a 40px tinted icon tile, actions and a dismiss on the right.
 */
export function AlertBanner({
  severity = "warning", title, body, context, icon: Icon, actionLabel, onAction, action, onDismiss, dismissLabel = "Dismiss", className,
}: {
  severity?: Severity; title: React.ReactNode; body?: React.ReactNode; context?: React.ReactNode;
  /** Replaces the severity glyph — a meter for a quota, a lock for 2FA. */
  icon?: React.ElementType;
  actionLabel?: string; onAction?: () => void;
  /** Free-form actions, rendered after `actionLabel`. */
  action?: React.ReactNode;
  onDismiss?: () => void; dismissLabel?: string;
  className?: string;
}) {
  const s = SEV[severity];
  const Glyph = Icon ?? s.Icon;
  return (
    <div role="alert" className={cn("flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4", s.border, s.glow, className)}>
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-md", s.tint)}>
        <Glyph className={cn("size-5 stroke-[1.75]", s.ink)} />
      </span>
      <div className="flex min-w-[240px] flex-1 flex-col gap-0.5">
        <p className="text-14 font-semibold text-strong">{title}</p>
        {body ? <p className="text-14 text-muted">{body}</p> : null}
        {context ? <p className="sl-num text-12 text-faint">{context}</p> : null}
      </div>
      {actionLabel ? (
        <Button variant={severity === "critical" ? "primary" : "secondary"} onClick={onAction}>{actionLabel}</Button>
      ) : null}
      {action}
      {onDismiss ? (
        <Button variant="secondary" size="icon" aria-label={dismissLabel} onClick={onDismiss}>
          <X className="size-3.5! text-muted" />
        </Button>
      ) : null}
    </div>
  );
}

/** Name what is absent and how data arrives. No "Oops", no exclamation marks. */
export function EmptyState({
  icon: Icon, title, body, action, className,
}: { icon?: React.ElementType; title: string; body?: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-6 py-16 text-center", className)}>
      {Icon ? (
        <span className="mb-1 flex size-10 items-center justify-center rounded-pill bg-hover text-muted">
          <Icon className="size-4 stroke-[1.75]" />
        </span>
      ) : null}
      <p className="text-14 font-semibold text-strong">{title}</p>
      {body ? <p className="max-w-sm text-12 text-faint">{body}</p> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

/** A failure surfaces the code and the verbatim message in an ink block. */
export function ErrorState({ code, message, onRetry }: { code: string; message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-lg border border-hairline bg-card p-4">
      <SeverityBadge severity="critical">{code}</SeverityBadge>
      <pre className="sl-num w-full overflow-x-auto rounded-md bg-ink p-4 text-13 whitespace-pre-wrap text-on-ink">{message}</pre>
      {onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
    </div>
  );
}

/** Code shown to be copied — token snippets, payloads. Ink block, mono, 13/20. */
export function CodeBlock({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <pre className={cn("sl-num overflow-x-auto rounded-md bg-ink p-4 text-13 text-on-ink", className)}>{children}</pre>
  );
}

// Re-exported for call sites that drew their own critical glyph.
export const CriticalIcon = XCircle;
