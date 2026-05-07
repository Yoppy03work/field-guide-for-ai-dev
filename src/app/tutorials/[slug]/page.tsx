import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import GithubMdx from "@/content/tutorials/github.mdx";
import VercelMdx from "@/content/tutorials/vercel.mdx";
import AntigravityMdx from "@/content/tutorials/antigravity.mdx";
import { getContentBySlug } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumb } from "@/components/Breadcrumb";

const TUTORIAL_COMPONENTS = {
  github: GithubMdx,
  vercel: VercelMdx,
  antigravity: AntigravityMdx,
} as const;

type TutorialSlug = keyof typeof TUTORIAL_COMPONENTS;

const DIFFICULTY_LABEL = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
} as const;

export async function generateStaticParams(): Promise<
  { slug: TutorialSlug }[]
> {
  return (Object.keys(TUTORIAL_COMPONENTS) as TutorialSlug[]).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!Object.hasOwn(TUTORIAL_COMPONENTS, slug))
    return { title: "チュートリアルが見つかりません" };
  const { frontmatter } = await getContentBySlug("tutorials", slug);
  return {
    title: `${frontmatter.title} | AI Dev Field Guide`,
    description: `${frontmatter.title}（約${frontmatter.estimatedMinutes}分・${DIFFICULTY_LABEL[frontmatter.difficulty]}）。手を動かして 1 周なぞるハンズオン。`,
  };
}

export default async function TutorialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!Object.hasOwn(TUTORIAL_COMPONENTS, slug)) notFound();
  const typedSlug = slug as TutorialSlug;
  const Component = TUTORIAL_COMPONENTS[typedSlug];
  const { frontmatter } = await getContentBySlug("tutorials", typedSlug);

  return (
    <article className="mx-auto max-w-[820px] px-4 py-10 md:px-6 md:py-16">
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { href: "/tutorials", label: "チュートリアル" },
          { label: frontmatter.title },
        ]}
      />
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={frontmatter.status} />
          <span className="inline-flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#FBFAF7] px-2 py-0.5 text-xs text-[#4B5563]">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            約{frontmatter.estimatedMinutes}分
          </span>
          <span className="rounded-full border border-[#E5E7EB] bg-[#FBFAF7] px-2 py-0.5 text-xs text-[#4B5563]">
            {DIFFICULTY_LABEL[frontmatter.difficulty]}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          {frontmatter.title}
        </h1>
        {frontmatter.prerequisites !== undefined &&
          frontmatter.prerequisites.length > 0 && (
            <section
              aria-labelledby="prereq-heading"
              className="mt-4 rounded-md border border-[#E5E7EB] bg-[#FBFAF7] p-3 text-sm text-[#1F2937]"
            >
              <h2
                id="prereq-heading"
                className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]"
              >
                前提
              </h2>
              <ul className="mt-1 list-disc space-y-0.5 pl-5">
                {frontmatter.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          )}
      </header>

      <Component />

      <footer className="mt-16 border-t border-[#E5E7EB] pt-6">
        <p className="text-sm text-[#4B5563]">
          ←{" "}
          <Link
            href="/tutorials"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            チュートリアル一覧に戻る
          </Link>
        </p>
      </footer>
    </article>
  );
}
