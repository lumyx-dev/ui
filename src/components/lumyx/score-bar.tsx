import { cn } from "../../lib/utils";
import { scoreTone, toneBg, toneText, type Tone } from "./tone";

/** Quality score cell: a 48×4 meter and the score in mono, both in the score's tone. */
export function ScoreBar({ score, tone, className }: { score: number; tone?: Tone; className?: string }) {
  const t = tone ?? scoreTone(score);
  const v = Math.min(100, Math.max(0, score));
  return (
    <span className={cn("inline-flex items-center gap-2", className)} title={`Score ${score}`}>
      <span className="h-1 w-12 overflow-hidden rounded-pill bg-hover">
        <span className={cn("block h-full", toneBg[t])} style={{ width: `${v}%` }} />
      </span>
      <span className={cn("sl-num text-12", toneText[t])}>{score}</span>
    </span>
  );
}
