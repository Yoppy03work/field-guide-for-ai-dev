import type { Metadata } from "next";
import LearnGitHubMdx from "@/content/learn/github.mdx";
import { StatusBadge } from "@/components/StatusBadge";
import { Toc, type TocItem } from "@/components/Toc";

export const metadata: Metadata = {
  title: "GitHub 入門 | AI Dev Field Guide",
  description:
    "大学1年生でも読める GitHub の用語解説。Repository / Issue / Branch / Pull Request / Merge を「ひとことで言うと」で順に押さえる。",
};

const TOC: readonly TocItem[] = [
  { id: "section-1", label: "1. GitHub って何？" },
  { id: "section-2", label: "2. リポジトリとは？" },
  { id: "section-3", label: "3. Issue とは？" },
  { id: "section-4", label: "4. Branch とは？" },
  { id: "section-5", label: "5. Pull Request とは？" },
  { id: "section-6", label: "6. Review とは？" },
  { id: "section-7", label: "7. Merge とは？" },
  { id: "section-8", label: "8. Vercel Preview とは？" },
  { id: "section-9", label: "9. AI ツールの差し込み" },
  { id: "mini-task", label: "ミニ課題" },
];

export default function LearnGitHubPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
      <article className="min-w-0 max-w-[720px]">
        <header className="mb-8">
          <StatusBadge status="green" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
            GitHub 入門
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#4B5563]">
            まずはここから。Issue / Branch / Pull Request / Merge を、
            ひとことで言うと付きで順に押さえます。
          </p>
        </header>

        <LearnGitHubMdx />
      </article>

      <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
        <Toc items={TOC} />
      </aside>
    </div>
  );
}
