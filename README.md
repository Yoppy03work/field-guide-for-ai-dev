# AI Dev Field Guide

> AIで作る、AIに任せる、AIで磨く。

大学1年生〜駆け出しジュニアエンジニア向けの、**AI 開発フロー**を真似できる教材アプリ。

主役は「AI ツール紹介」ではなく、**「AI を開発フローのどこに差し込むか」**。
GitHub の基本から、Issue → PR → Review → Deploy までを 1 つの例で通します。

## 対象読者

- 情報系の大学1〜2年生 / 文系学部からプログラミングに挑戦中の学生 / 新卒〜入社2年目
- GitHub の Issue / Branch / PR / Merge をまだ使い慣れていない可能性
- AI ツールは ChatGPT 程度しか触ったことがない人

## サイト構成（MVP 6 ページ）

| URL | 内容 |
|---|---|
| `/` | ホーム（「まずはここから」中心） |
| `/learn/github` | GitHub 入門（最重要の入口、9 セクション） |
| `/workflow` | 中心ページ（Issue→PR→Review→Deploy 8 ステップ） |
| `/tools` | ツール一覧（7 本） |
| `/cases` | 制作ログ（このサイト自体を作る過程の記録） |
| `/about` | サイトの目的・著者 |

## ソース・バッジ

各ページの先頭に、内容の出所を明示するバッジを置きます。

- 🟢 **実体験** ― 著者が実際に試した
- 🟡 **一部実体験** ― 一部だけ試した、もしくは別プロジェクトでの体験
- 🔵 **調査ベース** ― 公式ドキュメントなどの調査ベース

## 技術スタック

- **Framework**: Next.js 16（App Router）
- **Language**: TypeScript 5.x（`strict: true`）
- **Style**: Tailwind CSS v4
- **Content**: MDX（`@next/mdx` + `gray-matter`）
- **Icon**: Lucide React
- **Diagram**: Mermaid（`rehype-mermaid`）
- **Deploy**: Vercel
- **CI**: GitHub Actions（lint / typecheck / build）
- **AI API は使わない**（純 Static サイト）

## ローカル起動

```bash
# 依存関係インストール
pnpm install

# 開発サーバ起動（http://localhost:3000）
pnpm dev

# ビルド
pnpm build

# 本番起動
pnpm start

# Lint / 型チェック
pnpm lint
pnpm typecheck
```

> Node.js 20 LTS / pnpm 9 以上を推奨。

## 開発フロー（このリポジトリの運用）

```
1. Issue を立てる（やることメモ）
2. Branch を切る（作業用の分岐）
3. Claude Code に実装を依頼する
4. Pull Request を作る（変更を見てもらう提出箱）
5. Codex にレビューしてもらう
6. Antigravity でブラウザ確認する
7. Vercel Preview で確認する
8. Merge して公開する
```

詳細は [`/workflow`](src/app/workflow) と [`docs/02_plan.md`](docs/02_plan.md) を参照。

## ドキュメント

実装の元になっている仕様・計画・コンテンツ案は、`docs/` 配下のドキュメント群を参照してください。

| ファイル | 内容 |
|---|---|
| [`docs/DOCS_INDEX.md`](docs/DOCS_INDEX.md) | 全ドキュメントの索引 |
| [`docs/01_spec.md`](docs/01_spec.md) | 仕様書（What） |
| [`docs/02_plan.md`](docs/02_plan.md) | 14 日スケジュール（When/How） |
| [`docs/03_pages.md`](docs/03_pages.md) | ページ構成・共通テンプレ |
| [`docs/04_content.md`](docs/04_content.md) | コンテンツ計画（文言ソース） |
| [`docs/05_design.md`](docs/05_design.md) | デザイン仕様 |
| [`docs/06_tech-stack.md`](docs/06_tech-stack.md) | 技術選定とディレクトリ構成 |
| [`docs/09_claude-brief.md`](docs/09_claude-brief.md) | 方針指示書（最重要） |
| [`docs/11_prompts.md`](docs/11_prompts.md) | Claude Code への実プロンプト集 |
| [`docs/14_github-templates.md`](docs/14_github-templates.md) | Issue / PR / CI テンプレ原本 |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code 向け文脈ファイル |
| [`AGENTS.md`](AGENTS.md) | 他 AI（Codex / Antigravity / Gemini）向け指針 |

## 貢献

Issue / PR テンプレートを `.github/` 配下に用意しています。

- バグ報告: `bug.md`
- 新機能 / 新ページ: `feature.md`
- コンテンツ追加 / 修正: `content.md`

## ライセンス

- **コード**: [MIT](LICENSE)
- **コンテンツ**: CC BY 4.0（`/about` ページに明記予定）

## クレジット

Author: yoppy

このプロジェクトは授業課題として作られています。
詳細は `/about` ページを参照してください。
