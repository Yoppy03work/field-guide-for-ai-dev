import type { Metadata } from "next";
import Link from "next/link";
import { getAllContentMeta } from "@/lib/mdx";
import { StatusBadge } from "@/components/StatusBadge";

export const metadata: Metadata = {
  title: "Cases / 制作ログ | AI Dev Field Guide",
  description:
    "このサイト自体を作る過程の制作ログ。Claude Code に UI を任せた / Codex に PR を見させた / Antigravity に画面を確認させた / Vercel Preview を運用した、の 4 本。",
};

const TOOL_LABEL: Record<string, string> = {
  github: "GitHub",
  "claude-code": "Claude Code",
  codex: "Codex",
  copilot: "Copilot",
  antigravity: "Antigravity",
  vercel: "Vercel",
  "other-ai": "他 AI",
};

export default async function CasesPage() {
  const cases = await getAllContentMeta("cases");
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          Cases / 制作ログ
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#4B5563]">
          このサイト自体を作る過程を、AI ツールごとに記録した制作ログです。
          実体験は 🟢、一部実体験は 🟡、調査ベースは 🔵 のバッジで表示します。
        </p>
        <div className="mt-3 rounded-md border-l-4 border-[#2F5D3A] bg-[#F3F0EA] p-3 text-sm text-[#1F2937]">
          このページは「真似できる教材」を意図しています。
          プロンプト全文は各 Case の中で読めるようにしています。
        </div>
      </header>

      {cases.length === 0 ? (
        <p className="rounded-md border border-[#E5E7EB] bg-white p-6 text-sm text-[#4B5563]">
          Case はまだありません。
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/cases/${c.slug}`}
                className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
              >
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={c.status} />
                  <time
                    dateTime={c.date}
                    className="text-xs text-[#4B5563]"
                  >
                    {c.date}
                  </time>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-[#1F2937] group-hover:text-[#2F5D3A]">
                  {c.title}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-1.5 text-xs text-[#4B5563]">
                  {c.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-[#E5E7EB] bg-[#FBFAF7] px-2 py-0.5"
                    >
                      {TOOL_LABEL[tool] ?? tool}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
