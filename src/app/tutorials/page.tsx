import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Sparkles } from "lucide-react";
import { getAllContentMeta } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "チュートリアル | AI Dev Field Guide",
  description:
    "GitHub / Vercel / Antigravity を実際に手を動かしてなぞるためのハンズオン。読むだけでなく、自分の repo で 1 周回せるよう設計。",
};

const DIFFICULTY_LABEL = {
  beginner: "初級",
  intermediate: "中級",
  advanced: "上級",
} as const;

export default async function TutorialsPage() {
  const tutorials = await getAllContentMeta("tutorials");
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-16">
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { label: "チュートリアル" },
        ]}
      />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          チュートリアル
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4B5563]">
          GitHub / Vercel / Antigravity を実際に手を動かしてなぞるための
          ハンズオン。読むだけで終わらず、自分の repo で 1 周回せるように
          書いています。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-[#2F5D3A] bg-[#F3F0EA] p-3 text-sm text-[#1F2937]">
          推奨ルート: <Link
            href="/tutorials/github"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >GitHub</Link>{" "}
          → <Link
            href="/tutorials/vercel"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >Vercel</Link>{" "}
          → <Link
            href="/tutorials/antigravity"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >Antigravity</Link>
        </div>
      </header>

      {tutorials.length === 0 ? (
        <p className="rounded-md border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563]">
          チュートリアルはまだありません。
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/tutorials/${t.slug}`}
                className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
              >
                <div className="flex items-center justify-between">
                  <Sparkles
                    className="h-5 w-5 text-[#2F5D3A]"
                    aria-hidden="true"
                  />
                  <StatusBadge status={t.status} />
                </div>
                <h2 className="mt-3 text-lg font-semibold text-[#1F2937] group-hover:text-[#2F5D3A]">
                  {t.title}
                </h2>
                <dl className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#4B5563]">
                  <div className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <dt className="sr-only">所要時間</dt>
                    <dd>約{t.estimatedMinutes}分</dd>
                  </div>
                  <div>
                    <dt className="sr-only">難易度</dt>
                    <dd className="rounded-full border border-[#E5E7EB] bg-[#FBFAF7] px-2 py-0.5">
                      {DIFFICULTY_LABEL[t.difficulty]}
                    </dd>
                  </div>
                </dl>
                {t.prerequisites !== undefined &&
                  t.prerequisites.length > 0 && (
                    <p className="mt-3 text-xs text-[#4B5563]">
                      前提: {t.prerequisites.length} 件
                    </p>
                  )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
