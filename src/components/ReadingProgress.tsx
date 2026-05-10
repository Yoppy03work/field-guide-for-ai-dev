"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * ページ全体のスクロール進捗を上部に細いバーで表示する。
 * /learn/* /tutorials/* /workflow など長文ページで使う。
 *
 * 動的な進捗値は CSS カスタムプロパティ `--reading-progress` 経由で
 * Tailwind の arbitrary value に渡し、`transform: scaleX(...)` を
 * Tailwind ユーティリティで適用する。`style` 属性に残るのは CSS 変数
 * 1 行のみ（state-driven な値の標準パターン）。
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = (): void => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
      setProgress(ratio);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const cssVars: CSSProperties = {
    "--reading-progress": String(progress),
  } as CSSProperties;

  return (
    <div
      role="progressbar"
      aria-label="読了進捗"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      style={cssVars}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-[#2F5D3A] transition-transform duration-150 motion-reduce:transition-none scale-x-[var(--reading-progress)]"
    />
  );
}
