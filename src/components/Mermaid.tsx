"use client";

import { useEffect, useRef, useState } from "react";

type MermaidProps = {
  chart: string;
  ariaLabel?: string;
};

export function Mermaid({ chart, ariaLabel }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "neutral",
          securityLevel: "strict",
        });
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "Mermaid render failed",
          );
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre
        role="alert"
        className="overflow-auto rounded border border-[#E5E7EB] bg-[#F3F0EA] p-3 text-xs text-[#7A4F01]"
      >
        Mermaid 描画エラー: {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel ?? "ワークフロー図"}
      className="my-6 flex justify-center overflow-x-auto rounded-md border border-[#E5E7EB] bg-white p-4"
    />
  );
}
