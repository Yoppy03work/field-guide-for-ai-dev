import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "info" | "warn" | "tip";

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

const STYLES: Record<
  CalloutType,
  {
    Icon: typeof Info;
    border: string;
    bg: string;
    iconColor: string;
    label: string;
  }
> = {
  info: {
    Icon: Info,
    border: "border-[#0D47A1]",
    bg: "bg-[#E3F2FD]",
    iconColor: "text-[#0D47A1]",
    label: "Info",
  },
  warn: {
    Icon: AlertTriangle,
    border: "border-[#7A4F01]",
    bg: "bg-[#FFF8E1]",
    iconColor: "text-[#7A4F01]",
    label: "注意",
  },
  tip: {
    Icon: Lightbulb,
    border: "border-[#2F5D3A]",
    bg: "bg-[#E6F4EA]",
    iconColor: "text-[#2F5D3A]",
    label: "ヒント",
  },
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  const cfg = STYLES[type];
  return (
    <aside
      role="note"
      aria-label={title ?? cfg.label}
      className={`my-6 rounded-md border-l-4 ${cfg.border} ${cfg.bg} p-4 text-[#1F2937]`}
    >
      <div className="flex items-start gap-3">
        <cfg.Icon
          className={`mt-1 h-5 w-5 flex-none ${cfg.iconColor}`}
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className={`text-sm font-semibold ${cfg.iconColor}`}>
            {title ?? cfg.label}
          </p>
          <div className="mt-1 text-base leading-relaxed">{children}</div>
        </div>
      </div>
    </aside>
  );
}
