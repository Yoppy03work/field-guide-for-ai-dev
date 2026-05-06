import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

type GlossaryProps = {
  term: string;
  oneLine: string;
  children?: ReactNode;
};

export function Glossary({ term, oneLine, children }: GlossaryProps) {
  return (
    <aside
      role="note"
      aria-label={`${term}のひとことで言うと: ${oneLine}`}
      className="my-6 rounded-md border-l-4 border-[#2F5D3A] bg-[#F3F0EA] p-4 text-[#1F2937]"
    >
      <div className="flex items-start gap-3">
        <Lightbulb
          className="mt-1 h-5 w-5 flex-none text-[#2F5D3A]"
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-[#4B5563]">
            ひとことで言うと
          </p>
          <p className="mt-1 text-base leading-relaxed">
            <span className="font-bold">{term}</span>
            <span className="mx-2 text-[#4B5563]">→</span>
            <span>{oneLine}</span>
          </p>
          {children !== undefined && (
            <div className="mt-3 text-sm leading-relaxed text-[#4B5563]">
              {children}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
