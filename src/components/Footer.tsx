import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const REPO_URL = "https://github.com/Yoppy03work/field-guide-for-ai-dev";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#E5E7EB] bg-[#FBFAF7] text-[#4B5563]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between md:px-6">
        <section aria-labelledby="badge-legend" className="space-y-3">
          <h2
            id="badge-legend"
            className="text-sm font-semibold text-[#1F2937]"
          >
            バッジ凡例
          </h2>
          <ul className="flex flex-wrap items-center gap-2">
            <li>
              <StatusBadge status="green" />
            </li>
            <li>
              <StatusBadge status="yellow" />
            </li>
            <li>
              <StatusBadge status="blue" />
            </li>
          </ul>
        </section>

        <div className="flex flex-col gap-3 md:items-end">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1F2937] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            GitHub リポジトリ
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/about"
            className="text-sm hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            About
          </Link>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-4 text-xs md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 yoppy</p>
          <p className="italic">このサイトは AI と一緒に作られています</p>
        </div>
      </div>
    </footer>
  );
}
