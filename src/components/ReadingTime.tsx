import { Clock } from "lucide-react";
import { estimateReadingMinutes } from "@/lib/reading-time";

type ReadingTimeProps = {
  /** 本文文字列。指定があれば minutes を上書きして自動算出する。 */
  text?: string;
  /** frontmatter で手動指定したいときに使う */
  minutes?: number;
  className?: string;
};

export function ReadingTime({ text, minutes, className }: ReadingTimeProps) {
  const value =
    minutes ?? (text !== undefined ? estimateReadingMinutes(text) : undefined);
  if (value === undefined) return null;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs text-[#4B5563] ${className ?? ""}`}
      aria-label={`読了時間 約${value}分`}
    >
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      <span>約{value}分</span>
    </span>
  );
}
