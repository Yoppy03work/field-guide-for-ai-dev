import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type RelatedPageItem = {
  href: string;
  label: string;
  description?: string;
};

type RelatedPagesProps = {
  items: readonly RelatedPageItem[];
  heading?: string;
};

export function RelatedPages({
  items,
  heading = "次に読むページ",
}: RelatedPagesProps) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label={heading}
      className="my-12 rounded-md border border-[#E5E7EB] bg-[#FBFAF7] p-5"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
        {heading}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-start gap-2 rounded px-2 py-2 text-[#1F2937] hover:bg-[#F3F0EA] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
            >
              <ArrowRight
                className="mt-1 h-4 w-4 flex-none text-[#2F5D3A] transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <div className="flex-1">
                <span className="font-medium">{item.label}</span>
                {item.description !== undefined && (
                  <p className="mt-0.5 text-sm text-[#4B5563]">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
