import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type StepCardProps = {
  step: number;
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
};

export function StepCard({
  step,
  title,
  description,
  href,
  Icon,
}: StepCardProps) {
  return (
    <Link
      href={href}
      aria-label={`ステップ ${step}: ${title}`}
      className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
    >
      <div className="flex items-center gap-2">
        <Icon
          className="h-5 w-5 text-[#2F5D3A]"
          aria-hidden="true"
        />
        <span className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]">
          ステップ {step}
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold text-[#1F2937] group-hover:text-[#2F5D3A]">
        {title}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
        {description}
      </p>
    </Link>
  );
}
