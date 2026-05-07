"use client";

import { useState, type HTMLAttributes, type ReactElement } from "react";
import { Check, Copy, X } from "lucide-react";

type CodeBlockProps = HTMLAttributes<HTMLPreElement>;

type CopyState = "idle" | "copied" | "failed";

function extractText(node: unknown): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (typeof node === "object" && node !== null) {
    const element = node as ReactElement<{ children?: unknown }>;
    if (element.props && "children" in element.props) {
      return extractText(element.props.children);
    }
  }
  return "";
}

export function CodeBlock({ children, className, ...rest }: CodeBlockProps) {
  const [state, setState] = useState<CopyState>("idle");
  const text = extractText(children);

  const handleCopy = async (): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setState("failed");
      window.setTimeout(() => setState("idle"), 2000);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 1500);
    } catch (error) {
      console.error("CodeBlock: clipboard write failed", error);
      setState("failed");
      window.setTimeout(() => setState("idle"), 2500);
    }
  };

  const buttonAriaLabel =
    state === "copied"
      ? "コピー済み"
      : state === "failed"
        ? "コピーに失敗"
        : "コードをコピー";

  return (
    <div className="group relative my-4">
      <pre
        {...rest}
        className={`overflow-x-auto rounded-md border border-[#E5E7EB] bg-[#F3F0EA] p-4 text-sm leading-relaxed text-[#1F2937] ${className ?? ""}`}
      >
        {children}
      </pre>
      {text.length > 0 && (
        <button
          type="button"
          onClick={handleCopy}
          aria-label={buttonAriaLabel}
          aria-live="polite"
          className="absolute right-2 top-2 inline-flex items-center gap-1 rounded border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-[#4B5563] opacity-0 transition-opacity hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A] group-hover:opacity-100 focus-visible:opacity-100"
        >
          {state === "copied" ? (
            <>
              <Check
                className="h-3.5 w-3.5 text-[#1B5E20]"
                aria-hidden="true"
              />
              コピー済み
            </>
          ) : state === "failed" ? (
            <>
              <X
                className="h-3.5 w-3.5 text-[#7A4F01]"
                aria-hidden="true"
              />
              コピー失敗
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              コピー
            </>
          )}
        </button>
      )}
    </div>
  );
}
