import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Case1Mdx from "@/content/cases/case-1-claude-code-ui.mdx";
import Case2Mdx from "@/content/cases/case-2-codex-pr-review.mdx";
import Case3Mdx from "@/content/cases/case-3-antigravity-screen-check.mdx";
import Case4Mdx from "@/content/cases/case-4-vercel-preview.mdx";
import { getContentBySlug } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";
import { ReadingProgress } from "@/components/ReadingProgress";

const CASE_COMPONENTS = {
  "case-1-claude-code-ui": Case1Mdx,
  "case-2-codex-pr-review": Case2Mdx,
  "case-3-antigravity-screen-check": Case3Mdx,
  "case-4-vercel-preview": Case4Mdx,
} as const;

type CaseSlug = keyof typeof CASE_COMPONENTS;

const TOOL_LABEL: Record<string, string> = {
  github: "GitHub",
  "claude-code": "Claude Code",
  codex: "Codex",
  copilot: "Copilot",
  antigravity: "Antigravity",
  vercel: "Vercel",
  "other-ai": "他 AI",
};

export async function generateStaticParams(): Promise<{ slug: CaseSlug }[]> {
  return (Object.keys(CASE_COMPONENTS) as CaseSlug[]).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.hasOwn(CASE_COMPONENTS, slug))
    return { title: "Case が見つかりません" };
  const { frontmatter } = await getContentBySlug("cases", slug);
  return {
    title: `${frontmatter.title} | AI Dev Field Guide`,
    description: `${frontmatter.title}（${frontmatter.date}）の制作ログ。`,
  };
}

const REPO_URL = "https://github.com/Yoppy03work/field-guide-for-ai-dev";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(CASE_COMPONENTS, slug)) notFound();
  const typedSlug = slug as CaseSlug;
  const Component = CASE_COMPONENTS[typedSlug];
  const { frontmatter } = await getContentBySlug("cases", typedSlug);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-[820px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={frontmatter.status} />
          <time
            dateTime={frontmatter.date}
            className="text-sm text-[#4B5563]"
          >
            {frontmatter.date}
          </time>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          {frontmatter.title}
        </h1>
        <ul className="mt-3 flex flex-wrap gap-1.5 text-xs text-[#4B5563]">
          {frontmatter.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-[#E5E7EB] bg-[#FBFAF7] px-2 py-0.5"
            >
              {TOOL_LABEL[tool] ?? tool}
            </li>
          ))}
        </ul>
        {(frontmatter.relatedIssue !== undefined ||
          frontmatter.relatedPR !== undefined) && (
          <p className="mt-3 text-sm text-[#4B5563]">
            関連:{" "}
            {frontmatter.relatedIssue !== undefined && (
              <a
                href={`${REPO_URL}/issues/${frontmatter.relatedIssue}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
              >
                Issue #{frontmatter.relatedIssue}
              </a>
            )}
            {frontmatter.relatedIssue !== undefined &&
              frontmatter.relatedPR !== undefined &&
              " / "}
            {frontmatter.relatedPR !== undefined && (
              <a
                href={`${REPO_URL}/pull/${frontmatter.relatedPR}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
              >
                PR #{frontmatter.relatedPR}
              </a>
            )}
          </p>
        )}
      </header>

      <Component />

      <footer className="mt-16 border-t border-[#E5E7EB] pt-6">
        <p className="text-sm text-[#4B5563]">
          ←{" "}
          <Link
            href="/cases"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            Cases 一覧に戻る
          </Link>
        </p>
      </footer>
      </article>
    </>
  );
}
