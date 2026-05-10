"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import { Link2, Check } from "lucide-react";

type Level = 2 | 3;

type AnchorHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: Level;
};

function flattenChildren(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(flattenChildren).join("");
  if (
    children !== null &&
    typeof children === "object" &&
    "props" in children
  ) {
    const props = (children as { props?: { children?: ReactNode } }).props;
    if (props !== undefined) return flattenChildren(props.children);
  }
  return "";
}

const slugRegex = /[^\p{L}\p{N}-]+/gu;

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/gu, "-")
    .replace(slugRegex, "")
    .slice(0, 80);
}

export function AnchorHeading({
  level,
  id,
  className,
  children,
  ...rest
}: AnchorHeadingProps) {
  const Tag = `h${level}` as "h2" | "h3";
  const text = flattenChildren(children);
  const resolvedId = id ?? slugify(text);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${resolvedId}`;
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      window.location.hash = `#${resolvedId}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
      window.location.hash = `#${resolvedId}`;
    } catch (error) {
      console.error("AnchorHeading: clipboard write failed", error);
      window.location.hash = `#${resolvedId}`;
    }
  };

  const buttonAriaLabel = copied ? "URL をコピーしました" : "このセクションの URL をコピー";

  return (
    <Tag
      {...rest}
      id={resolvedId}
      className={`group relative ${className ?? ""}`}
    >
      <span>{children}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={buttonAriaLabel}
        className="ml-2 inline-flex items-center align-middle text-[#4B5563] opacity-0 transition-opacity hover:text-[#2F5D3A] focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A] group-hover:opacity-100"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#1B5E20]" aria-hidden="true" />
        ) : (
          <Link2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </Tag>
  );
}
