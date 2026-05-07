import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code,
  Eye,
  GitBranch,
  MessageSquare,
  Sparkles,
  Triangle,
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { Mermaid } from "@/components/Mermaid";
import { getAllContentMeta } from "@/lib/mdx";

const TOOLS = [
  {
    slug: "github",
    name: "GitHub",
    oneLiner: "Issue / Branch / PR / Review / Merge をまとめて管理",
    status: "green" as const,
    Icon: GitBranch,
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    oneLiner: "ターミナルで対話するコーディング AI",
    status: "green" as const,
    Icon: Bot,
  },
  {
    slug: "codex",
    name: "Codex",
    oneLiner: "PR の自動コードレビュー",
    status: "green" as const,
    Icon: MessageSquare,
  },
  {
    slug: "copilot",
    name: "GitHub Copilot",
    oneLiner: "エディタ内補完",
    status: "green" as const,
    Icon: Code,
  },
  {
    slug: "antigravity",
    name: "Antigravity",
    oneLiner: "ブラウザ操作 AI で画面確認",
    status: "yellow" as const,
    Icon: Eye,
  },
  {
    slug: "vercel",
    name: "Vercel",
    oneLiner: "Preview / 本番デプロイ",
    status: "yellow" as const,
    Icon: Triangle,
  },
  {
    slug: "other-ai",
    name: "他 AI（Gemini 等）",
    oneLiner: "文章校正 / 要約 / 補助",
    status: "blue" as const,
    Icon: Sparkles,
  },
];

const FLOW_CHART = `flowchart TD
    A["1. Issue"] --> B["2. Branch"]
    B --> C["3. Claude Code"]
    C --> D["4. PR"]
    D --> E["5. Codex"]
    E --> F["6. Antigravity"]
    F --> G["7. Vercel Preview"]
    G --> H["8. Merge"]
`;

export default async function Home() {
  const cases = await getAllContentMeta("cases");
  const latestCases = cases.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-16">
      <section
        aria-labelledby="hero-heading"
        className="rounded-md border border-[#E5E7EB] bg-white p-6 md:p-12"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
          AI Dev Field Guide
        </p>
        <h1
          id="hero-heading"
          className="mt-3 text-3xl font-bold tracking-tight text-[#1F2937] md:text-5xl"
        >
          AIで作る、AIに任せる、AIで磨く。
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B5563] md:text-lg">
          大学1年生〜駆け出しジュニアエンジニア向け、
          <strong className="text-[#1F2937]">AI 開発フロー</strong>
          を真似できる教材アプリ。主役は AI ツール紹介ではなく、
          AI を開発フローのどこに差し込むか。
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/learn/github"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F5D3A] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            まずはここから
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/workflow"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2F5D3A] bg-transparent px-6 py-3 text-base font-semibold text-[#2F5D3A] transition-colors hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            ワークフローを見る
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="about-site-heading"
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        <h2 id="about-site-heading" className="sr-only">
          このサイトについて
        </h2>
        <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
          <p className="text-sm font-semibold text-[#2F5D3A]">対象読者</p>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2937]">
            大学1年生〜駆け出しジュニアエンジニア。GitHub の用語に
            まだ慣れていない人も読めます。
          </p>
        </div>
        <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
          <p className="text-sm font-semibold text-[#2F5D3A]">主役</p>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2937]">
            AI ツールではなく
            <strong>「フロー」</strong>。
            Issue → PR → Review → Merge の中に AI を差し込む。
          </p>
        </div>
        <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
          <p className="text-sm font-semibold text-[#2F5D3A]">誠実バッジ</p>
          <p className="mt-2 text-sm leading-relaxed text-[#1F2937]">
            🟢 実体験 / 🟡 一部実体験 / 🔵 調査ベース で情報源を明示します。
          </p>
        </div>
      </section>

      <section
        aria-labelledby="start-here-heading"
        className="mt-12 rounded-md border-2 border-[#2F5D3A] bg-[#F3F0EA] p-6 md:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
          まずはここから
        </p>
        <h2
          id="start-here-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-[#1F2937] md:text-3xl"
        >
          GitHub の Issue / Branch / PR / Merge を、ひとことで言うと付きで
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#1F2937]">
          専門用語を 9 トピックに分けて、各セクションに「ひとことで言うと」と
          「具体例」を付けて解説します。最後にミニ課題で 1 つ通して試せます。
        </p>
        <Link
          href="/learn/github"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#2F5D3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
        >
          /learn/github を読む
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <section
        aria-labelledby="tutorials-heading"
        className="mt-12 rounded-md border border-[#E5E7EB] bg-white p-6 md:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
          手を動かす
        </p>
        <h2
          id="tutorials-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-[#1F2937] md:text-3xl"
        >
          チュートリアルで GitHub → Vercel → Antigravity を 1 周
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#1F2937]">
          読むだけで終わらせない、自分の手元で完走できるハンズオン。
          各チュートリアルは 15〜30 分で完了、末尾のセルフチェックで
          「できたか」を確かめられます。
        </p>
        <Link
          href="/tutorials"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#2F5D3A] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#2F5D3A] transition-colors hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
        >
          チュートリアルを見る
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <section
        aria-labelledby="route-heading"
        className="mt-12 rounded-md border border-[#E5E7EB] bg-[#FBFAF7] p-6 md:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
          推奨ルート
        </p>
        <h2
          id="route-heading"
          className="mt-2 text-xl font-bold tracking-tight text-[#1F2937] md:text-2xl"
        >
          1 周完走するなら、この順番が早い
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          <li className="rounded-md border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-semibold text-[#2F5D3A]">1. 学ぶ</p>
            <Link
              href="/learn/github"
              className="mt-1 block font-semibold text-[#1F2937] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
            >
              /learn/github
            </Link>
            <p className="mt-1 text-xs text-[#4B5563]">用語を「ひとことで言うと」で押さえる</p>
          </li>
          <li className="rounded-md border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-semibold text-[#2F5D3A]">2. 手を動かす</p>
            <Link
              href="/tutorials"
              className="mt-1 block font-semibold text-[#1F2937] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
            >
              /tutorials
            </Link>
            <p className="mt-1 text-xs text-[#4B5563]">35 + 25 + 20 分で 3 ハンズオン</p>
          </li>
          <li className="rounded-md border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-semibold text-[#2F5D3A]">3. 整理する</p>
            <Link
              href="/workflow"
              className="mt-1 block font-semibold text-[#1F2937] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
            >
              /workflow
            </Link>
            <p className="mt-1 text-xs text-[#4B5563]">8 ステップに AI を差し込む</p>
          </li>
          <li className="rounded-md border border-[#E5E7EB] bg-white p-4">
            <p className="text-xs font-semibold text-[#2F5D3A]">4. 真似る</p>
            <Link
              href="/cases"
              className="mt-1 block font-semibold text-[#1F2937] hover:text-[#2F5D3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
            >
              /cases
            </Link>
            <p className="mt-1 text-xs text-[#4B5563]">著者の制作ログを下敷きに</p>
          </li>
        </ol>
      </section>

      <section aria-labelledby="flow-heading" className="mt-12">
        <div className="flex items-end justify-between">
          <h2
            id="flow-heading"
            className="text-2xl font-bold tracking-tight text-[#1F2937]"
          >
            AI 開発フロー（要約）
          </h2>
          <Link
            href="/workflow"
            className="text-sm font-medium text-[#2F5D3A] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            8 ステップを詳しく見る →
          </Link>
        </div>
        <p className="mt-2 text-sm text-[#4B5563]">
          Issue → Branch → 実装 → PR → レビュー → 画面確認 → Preview → Merge
        </p>
        <Mermaid
          chart={FLOW_CHART}
          ariaLabel="AI 開発フロー 8 ステップの全体像"
        />
      </section>

      <section aria-labelledby="tools-heading" className="mt-12">
        <div className="flex items-end justify-between">
          <h2
            id="tools-heading"
            className="text-2xl font-bold tracking-tight text-[#1F2937]"
          >
            ツール早見（7 本）
          </h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-[#2F5D3A] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            ツール一覧 →
          </Link>
        </div>
        <p className="mt-2 text-sm text-[#4B5563]">
          ここはツール辞書として使ってください。主役はあくまで /workflow です。
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/tools/${tool.slug}`}
                className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-4 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
              >
                <div className="flex items-center justify-between">
                  <tool.Icon
                    className="h-5 w-5 text-[#2F5D3A]"
                    aria-hidden="true"
                  />
                  <StatusBadge status={tool.status} />
                </div>
                <h3 className="mt-3 text-base font-semibold text-[#1F2937] group-hover:text-[#2F5D3A]">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
                  {tool.oneLiner}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cases-heading" className="mt-12">
        <div className="flex items-end justify-between">
          <h2
            id="cases-heading"
            className="text-2xl font-bold tracking-tight text-[#1F2937]"
          >
            最新 Cases
          </h2>
          <Link
            href="/cases"
            className="text-sm font-medium text-[#2F5D3A] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            すべての Case →
          </Link>
        </div>
        <p className="mt-2 text-sm text-[#4B5563]">
          このサイト自体を作る過程の制作ログ。実体験ベースで AI ツールの使いどころを記録しています。
        </p>
        {latestCases.length === 0 ? (
          <p className="mt-6 rounded-md border border-dashed border-[#E5E7EB] bg-[#FBFAF7] p-5 text-sm text-[#4B5563]">
            Case はまだありません。
          </p>
        ) : (
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {latestCases.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/cases/${c.slug}`}
                  className="group flex h-full flex-col rounded-md border border-[#E5E7EB] bg-white p-5 transition-colors hover:border-[#2F5D3A] hover:bg-[#F3F0EA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
                >
                  <div className="flex items-center justify-between">
                    <StatusBadge status={c.status} />
                    <time
                      dateTime={c.date}
                      className="text-xs text-[#4B5563]"
                    >
                      {c.date}
                    </time>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-snug text-[#1F2937] group-hover:text-[#2F5D3A]">
                    {c.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="faq-heading" className="mt-12">
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-[#1F2937]"
        >
          よくある質問
        </h2>
        <dl className="mt-6 space-y-4">
          <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
            <dt className="font-semibold text-[#1F2937]">
              Q. プログラミング初心者でも読めますか？
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              読めるよう書いてあります。専門用語には初出時に必ず「ひとことで言うと」を併記し、
              <Link href="/learn/github" className="font-medium text-[#2F5D3A] underline underline-offset-2">/learn/github</Link>
              {" "}で 9 セクションをやさしく解説しています。
            </dd>
          </div>
          <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
            <dt className="font-semibold text-[#1F2937]">
              Q. AI ツールを 1 つも使ったことがありません。何から始めればいい？
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              まず{" "}
              <Link href="/tutorials/github" className="font-medium text-[#2F5D3A] underline underline-offset-2">/tutorials/github</Link>
              {" "}で GitHub の操作を 1 周してください。AI ツールは Step 3 以降で順次導入します。
            </dd>
          </div>
          <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
            <dt className="font-semibold text-[#1F2937]">
              Q. 有料プランは必要？
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              本サイトの内容を真似するだけなら、Vercel Hobby（無料）+ GitHub
              無料 + Gemini 無料枠で完結します。Claude Code は要相談。
            </dd>
          </div>
          <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
            <dt className="font-semibold text-[#1F2937]">
              Q. このサイトのソースは公開されていますか？
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              はい。コードは MIT、コンテンツは CC BY 4.0 で公開しています：{" "}
              <a
                href="https://github.com/Yoppy03work/field-guide-for-ai-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2F5D3A] underline underline-offset-2"
              >
                Yoppy03work/field-guide-for-ai-dev
              </a>
            </dd>
          </div>
          <div className="rounded-md border border-[#E5E7EB] bg-white p-5">
            <dt className="font-semibold text-[#1F2937]">
              Q. 内容に間違いがあった / 提案がある場合は？
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-[#4B5563]">
              GitHub の{" "}
              <a
                href="https://github.com/Yoppy03work/field-guide-for-ai-dev/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#2F5D3A] underline underline-offset-2"
              >
                Issues
              </a>
              {" "}でお願いします。
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="next-action-heading"
        className="mt-12 rounded-md border-2 border-[#2F5D3A] bg-[#F3F0EA] p-6 text-center md:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-wide text-[#2F5D3A]">
          次に試すミニ課題
        </p>
        <h2
          id="next-action-heading"
          className="mt-2 text-xl font-bold tracking-tight text-[#1F2937] md:text-2xl"
        >
          GitHub で Issue を 1 つ作ってみる
        </h2>
        <p className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-[#1F2937]">
          5 分でできる、いちばん小さな一歩。タイトルと受け入れ基準を 3 件書くだけで OK。
          慣れたら Branch を切って PR まで 1 周してみましょう。
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/tutorials/github"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F5D3A] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B5E20] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            やり方を見る（35 分のハンズオン）
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2F5D3A] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#2F5D3A] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F5D3A]"
          >
            About を読む
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
