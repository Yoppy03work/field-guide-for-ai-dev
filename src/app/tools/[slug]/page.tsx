import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import GithubMdx from "@/content/tools/github.mdx";
import ClaudeCodeMdx from "@/content/tools/claude-code.mdx";
import CodexMdx from "@/content/tools/codex.mdx";
import CopilotMdx from "@/content/tools/copilot.mdx";
import AntigravityMdx from "@/content/tools/antigravity.mdx";
import VercelMdx from "@/content/tools/vercel.mdx";
import OtherAiMdx from "@/content/tools/other-ai.mdx";
import { getContentBySlug } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";

const TOOL_COMPONENTS = {
  github: GithubMdx,
  "claude-code": ClaudeCodeMdx,
  codex: CodexMdx,
  copilot: CopilotMdx,
  antigravity: AntigravityMdx,
  vercel: VercelMdx,
  "other-ai": OtherAiMdx,
} as const;

type ToolSlug = keyof typeof TOOL_COMPONENTS;

const ICON_MAP: Record<string, LucideIcon> = {
  GitBranch,
  Bot,
  MessageSquare,
  Code,
  Eye,
  Triangle,
  Sparkles,
};

export async function generateStaticParams(): Promise<{ slug: ToolSlug }[]> {
  return (Object.keys(TOOL_COMPONENTS) as ToolSlug[]).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in TOOL_COMPONENTS)) return { title: "ツールが見つかりません" };
  const { frontmatter } = await getContentBySlug("tools", slug);
  return {
    title: `${frontmatter.title} | AI Dev Field Guide`,
    description: frontmatter.oneLiner,
  };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in TOOL_COMPONENTS)) notFound();
  const typedSlug = slug as ToolSlug;
  const Component = TOOL_COMPONENTS[typedSlug];
  const { frontmatter } = await getContentBySlug("tools", typedSlug);
  const Icon = ICON_MAP[frontmatter.icon] ?? Sparkles;

  return (
    <article className="mx-auto max-w-[820px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Icon
            className="h-8 w-8 text-[#2F5D3A]"
            aria-hidden="true"
          />
          <StatusBadge status={frontmatter.status} />
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-[#4B5563]">
          {frontmatter.oneLiner}
        </p>
      </header>

      <Component />

      <footer className="mt-16 border-t border-[#E5E7EB] pt-6">
        <p className="text-sm text-[#4B5563]">
          ← <a
            href="/tools"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            ツール一覧に戻る
          </a>
        </p>
      </footer>
    </article>
  );
}
