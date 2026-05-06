import {
  Pencil,
  GitBranch,
  Bot,
  GitPullRequest,
  MessageSquare,
  Eye,
  ExternalLink,
  GitMerge,
} from "lucide-react";
import { StepCard } from "./StepCard";

const STEPS = [
  {
    step: 1,
    title: "Issue を立てる",
    description: "やることを Issue としてメモする",
    href: "/workflow#step-1",
    Icon: Pencil,
  },
  {
    step: 2,
    title: "Branch を切る",
    description: "feature/profile-card で作業ブランチを作る",
    href: "/workflow#step-2",
    Icon: GitBranch,
  },
  {
    step: 3,
    title: "Claude Code に実装を依頼する",
    description: "Issue の内容を渡して実装を進めてもらう",
    href: "/workflow#step-3",
    Icon: Bot,
  },
  {
    step: 4,
    title: "PR を作る",
    description: "作業ブランチから main へ Pull Request を出す",
    href: "/workflow#step-4",
    Icon: GitPullRequest,
  },
  {
    step: 5,
    title: "Codex にレビューしてもらう",
    description: "PR の自動レビューコメントに対応する",
    href: "/workflow#step-5",
    Icon: MessageSquare,
  },
  {
    step: 6,
    title: "Antigravity で画面を見てもらう",
    description: "プレビュー URL を渡して画面崩れがないか確認",
    href: "/workflow#step-6",
    Icon: Eye,
  },
  {
    step: 7,
    title: "Vercel Preview で確認する",
    description: "発行された Preview URL を実機で開く",
    href: "/workflow#step-7",
    Icon: ExternalLink,
  },
  {
    step: 8,
    title: "Merge する",
    description: "レビュー OK の PR を main に取り込む",
    href: "/workflow#step-8",
    Icon: GitMerge,
  },
] as const;

export function MiniTask() {
  return (
    <section
      id="mini-task"
      aria-labelledby="mini-task-heading"
      className="mt-16 scroll-mt-24"
    >
      <header className="rounded-md border border-[#E5E7EB] bg-[#F3F0EA] p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#2F5D3A]">
          やってみよう
        </p>
        <h2
          id="mini-task-heading"
          className="mt-2 text-2xl font-bold tracking-tight text-[#1F2937]"
        >
          ミニ課題: 自己紹介カードを追加する
        </h2>
        <p className="mt-3 text-base leading-relaxed text-[#1F2937]">
          ここまでで学んだ流れを、1 つの小さな例で通します。
          リポジトリに「自己紹介カード」を追加する課題を、
          Issue → Branch → 実装 → PR → レビュー → 画面確認 →
          Preview → Merge の 8 ステップで体験してみてください。
        </p>
        <p className="mt-2 text-sm text-[#4B5563]">
          各ステップの詳細は <code className="rounded bg-white px-1.5 py-0.5">/workflow</code> で順に解説します（後続で実装予定）。
        </p>
      </header>

      <ol className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <li key={s.step}>
            <StepCard
              step={s.step}
              title={s.title}
              description={s.description}
              href={s.href}
              Icon={s.Icon}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
