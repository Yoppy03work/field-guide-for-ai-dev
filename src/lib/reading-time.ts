const JA_CHARS_PER_MINUTE = 600;

/**
 * 本文文字列から読了時間（分、最小1）を概算する。
 * MDX import 字句や JSX をなるべく除外して文字数を数える。
 */
export function estimateReadingMinutes(text: string): number {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "");
  const minutes = cleaned.length / JA_CHARS_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}
