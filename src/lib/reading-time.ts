const JA_CHARS_PER_MINUTE = 600;

/**
 * 本文文字列から読了時間（分、最小1）を概算する。
 * MDX import 字句や JSX をなるべく除外して文字数を数える。
 *
 * frontmatter 剥がしはファイル冒頭のみを対象にする。本文中の `---`
 * （Markdown 水平線）を巻き添えにしないよう、`m` フラグは使わない。
 */
export function estimateReadingMinutes(text: string): number {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, "");
  const minutes = cleaned.length / JA_CHARS_PER_MINUTE;
  return Math.max(1, Math.round(minutes));
}
