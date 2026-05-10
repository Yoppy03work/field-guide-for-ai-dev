import type { Metadata } from "next";
import WorkflowMdx from "@/content/workflow/steps.mdx";
import { StatusBadge } from "@/components/StatusBadge";
import { Toc, type TocItem } from "@/components/Toc";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ReadingProgress } from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "AI 開発フローの全体像 | AI Dev Field Guide",
  description:
    "Issue → Branch → Claude Code → PR → Codex → Antigravity → Vercel Preview → Merge までの 8 ステップを、初心者がハマりどころと AI の使い方付きで解説。",
};

const TOC: readonly TocItem[] = [
  { id: "step-1", label: "Step 1: Issue を立てる" },
  { id: "step-2", label: "Step 2: Branch を切る" },
  { id: "step-3", label: "Step 3: Claude Code に依頼" },
  { id: "step-4", label: "Step 4: PR を作る" },
  { id: "step-5", label: "Step 5: Codex にレビュー" },
  { id: "step-6", label: "Step 6: Antigravity で確認" },
  { id: "step-7", label: "Step 7: Vercel Preview" },
  { id: "step-8", label: "Step 8: Merge する" },
];

export default function WorkflowPage() {
  return (
    <>
      <ReadingProgress />
      <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-6 md:py-12 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
      <article className="min-w-0 max-w-[820px]">
        <Breadcrumb
          items={[
            { href: "/", label: "ホーム" },
            { label: "ワークフロー" },
          ]}
        />
        <header className="mb-8">
          <StatusBadge status="green" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
            AI 開発フローの全体像
          </h1>
          <div className="mt-4 rounded-md border-l-4 border-[#2F5D3A] bg-[#F3F0EA] p-4 text-sm leading-relaxed text-[#1F2937]">
            <p className="font-semibold text-[#2F5D3A]">
              このページで学べること
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Issue → Merge までの 8 ステップが一望できる</li>
              <li>各ステップで AI ツールをどう差し込むかが分かる</li>
              <li>初心者がハマりやすいポイントと、自分で試す小さな課題が手元にある</li>
            </ul>
          </div>
        </header>

        <WorkflowMdx />
      </article>

      <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-fit">
        <Toc items={TOC} />
      </aside>
      </div>
    </>
  );
}
