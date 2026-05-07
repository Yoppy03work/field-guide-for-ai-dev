"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  id: string;
  label: string;
};

type TocProps = {
  items: readonly TocItem[];
};

export function Toc({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const targets: HTMLElement[] = [];
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) targets.push(el);
    }
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          const top = visibleEntries.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(top.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    for (const target of targets) {
      observer.observe(target);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="目次"
      className="rounded-md border border-[#E5E7EB] bg-[#FBFAF7] p-4"
    >
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#4B5563]">
        目次
      </h2>
      <ul className="space-y-1 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded px-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A] ${
                  isActive
                    ? "bg-[#F3F0EA] font-medium text-[#2F5D3A]"
                    : "text-[#1F2937] hover:bg-[#F3F0EA] hover:text-[#2F5D3A]"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
