import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Code,
  Eye,
  GitBranch,
  MessageSquare,
  Sparkles,
  Triangle,
  type LucideIcon,
} from "lucide-react";
import { getAllContentMeta } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata: Metadata = {
  title: "ツール一覧 | AI Dev Field Guide",
  description:
    "GitHub / Claude Code / Codex / Copilot / Antigravity / Vercel / 他 AI の 7 ツールを使いどころ中心に紹介。主役は /workflow です。",
};

const ICON_MAP: Record<string, LucideIcon> = {
  GitBranch,
  Bot,
  MessageSquare,
  Code,
  Eye,
  Triangle,
  Sparkles,
};

type SearchParams = { filter?: string };

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const onlyExperienced = params.filter === "experienced";
  const allTools = await getAllContentMeta("tools");
  const tools = onlyExperienced
    ? allTools.filter((t) => t.status === "green")
    : allTools;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          ツール一覧
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4B5563]">
          このページはツール辞書として使ってください。主役は{" "}
          <Link
            href="/workflow"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            /workflow
          </Link>
          {" "}（AI 開発フロー）です。
        </p>
      </header>

      <nav
        aria-label="フィルタ"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm"
      >
        <span className="text-[#4B5563]">表示:</span>
        <Link
          href="/tools"
          aria-current={!onlyExperienced ? "page" : undefined}
          className={`rounded-full px-3 py-1 ${
            !onlyExperienced
              ? "bg-[#2F5D3A] text-white"
              : "border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#F3F0EA]"
          }`}
        >
          すべて ({allTools.length})
        </Link>
        <Link
          href="/tools?filter=experienced"
          aria-current={onlyExperienced ? "page" : undefined}
          className={`rounded-full px-3 py-1 ${
            onlyExperienced
              ? "bg-[#2F5D3A] text-white"
              : "border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#F3F0EA]"
          }`}
        >
          🟢 実体験のみ
        </Link>
      </nav>

      {tools.length === 0 ? (
        <p className="rounded-md border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563]">
          条件に合うツールがありません。
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = ICON_MAP[tool.icon] ?? Sparkles;
            return (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
                >
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-[#2F5D3A]"
                      aria-hidden="true"
                    />
                    <StatusBadge status={tool.status} />
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-[#1F2937] group-hover:text-[#2F5D3A]">
                    {tool.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
                    {tool.oneLiner}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
