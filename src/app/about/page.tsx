import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About | AI Dev Field Guide",
  description:
    "サイトの目的、対象読者、著者、授業課題としての文脈、ライセンスをまとめたページ。",
};

const REPO_URL = "https://github.com/Yoppy03work/field-guide-for-ai-dev";

const TIMELINE = [
  {
    date: "2026-05-06",
    title: "MVP 公開（4 ページ）",
    note: "/ /learn/github /workflow /about を Vercel に deploy。提出物として動く状態に。",
  },
  {
    date: "2026-05-06",
    title: "ツール一覧 + 7 ツール詳細（PR #9）",
    note: "/tools と /tools/[slug] が SSG で 7 件生成。リンク 404 を一気に解消。",
  },
  {
    date: "2026-05-06",
    title: "Cases 4 本（PR #10）",
    note: "Claude Code / Codex / Antigravity / Vercel の実体験を制作ログ化。",
  },
  {
    date: "2026-05-07",
    title: "第 2 期: AX/UX 強化と「次の一歩」教材化（PR #16〜#25）",
    note: "Codex P1 修正 / 共通 4 ブロック / /tutorials 新設 / 全ページ厚塗り。",
  },
];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-[720px] px-4 py-10 md:px-6 md:py-16">
      <Breadcrumb
        items={[
          { href: "/", label: "ホーム" },
          { label: "About" },
        ]}
      />
      <header className="mb-8">
        <StatusBadge status="green" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1F2937] md:text-4xl">
          About
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#4B5563]">
          AI Dev Field Guide の目的・著者・ライセンス・お問い合わせ先。
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          このサイトの目的
        </h2>
        <p className="mt-3 text-base leading-[1.8] text-[#1F2937]">
          大学1年生〜駆け出しジュニアエンジニアが、
          <strong>AI を使った開発フロー</strong>
          を真似できる教材として作っています。
          主役は AI ツールの機能紹介ではなく、
          Issue → Branch → 実装 → PR → レビュー → 画面確認 → Preview → Merge
          の流れの中で、AI をどこにどう差し込むか。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          対象読者
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[#1F2937]">
          <li>情報系の大学 1〜2 年生</li>
          <li>文系学部からプログラミングに挑戦中の学生</li>
          <li>新卒〜入社 2 年目のジュニアエンジニア</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
          GitHub の Issue / Branch / PR / Merge にまだ慣れていない人を想定。
          ChatGPT 程度の AI を触ったことがあれば十分です。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          著者
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#1F2937]">
          yoppy。学生でハッカソン経験あり。Web フロントエンド中心に
          開発を学んでいます。本サイトは授業課題として制作しました。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          授業課題としての文脈
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#1F2937]">
          授業で実際に試した Antigravity / GitHub / Vercel /
          他 AI を題材に、駆け出しエンジニアでも追体験できる教材として
          まとめ直したものです。実体験を 🟢 / 🟡 / 🔵 のバッジで明示し、
          誇張のない「使った所感」を共有することを目指しています。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          ライセンス
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[#1F2937]">
          <li>
            <strong>コード</strong>: MIT License
          </li>
          <li>
            <strong>コンテンツ</strong>: CC BY 4.0
          </li>
        </ul>
        <p className="mt-3 text-sm text-[#4B5563]">
          引用やリミックスは出典を示してご自由にどうぞ。
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          お問い合わせ
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#1F2937]">
          バグ報告・コンテンツの誤りや改善提案は、
          GitHub の Issues にお願いします。
        </p>
        <a
          href={`${REPO_URL}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
        >
          GitHub Issues を開く
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1F2937]">
          制作タイムライン
        </h2>
        <ol className="mt-3 space-y-3 border-l-2 border-[#E5E7EB] pl-5">
          {TIMELINE.map((item, idx) => (
            <li key={`${item.date}-${idx}`} className="relative">
              <span
                className="absolute -left-[27px] mt-1 inline-block h-3 w-3 rounded-full bg-[#2F5D3A]"
                aria-hidden="true"
              />
              <time
                dateTime={item.date}
                className="text-xs font-semibold uppercase tracking-wide text-[#4B5563]"
              >
                {item.date}
              </time>
              <p className="mt-1 font-semibold text-[#1F2937]">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
                {item.note}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-[#4B5563]">
          詳しくは{" "}
          <Link
            href="/cases"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            /cases
          </Link>
          {" "}に AI ツール別の制作ログがあります。
        </p>
      </section>

      <section className="mt-12 rounded-md border border-[#E5E7EB] bg-[#F3F0EA] p-5 text-sm text-[#4B5563]">
        <p>
          このサイトは{" "}
          <Link
            href="/cases"
            className="font-medium text-[#2F5D3A] underline underline-offset-2 hover:text-[#1B5E20]"
          >
            /cases
          </Link>{" "}
          で制作過程をログ化しています。Claude Code / Codex / Antigravity /
          Vercel をどう使ったかは、その記事を見てください。
        </p>
      </section>
    </article>
  );
}
