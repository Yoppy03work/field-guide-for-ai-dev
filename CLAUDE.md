# AI Dev Field Guide ― CLAUDE.md

このファイルは Claude Code が起動時に読む文脈ファイルです。
**プロジェクトルートに `CLAUDE.md` という名前でコピーして使ってください。**

---

# AI Dev Field Guide

## このプロジェクトは何

大学1年生〜駆け出しジュニアエンジニア向け、AI 開発フローの教材アプリ。

**主役は「AI 開発フロー」であって、ツール紹介ではない。**

サブタイトル: AIで作る、AIに任せる、AIで磨く。

## 対象読者

- 情報系の大学1〜2年生 / 文系学部からプログラミングに挑戦中の学生 / 新卒〜入社2年目
- GitHub の Issue / Branch / PR / Merge をまだ使い慣れていない可能性
- AI ツールは ChatGPT 程度しか触ったことがない
- Claude Code / Codex / Antigravity は名前すら知らない可能性

## サイト構成（MVP 6 ページ）

```
/                      ホーム（「まずはここから」中心）
/learn/github          GitHub 入門（最重要の入口、9 セクション）
/workflow              中心ページ（Issue→PR→Review→Deploy 8 ステップ）
/tools                 ツール一覧（7 本）
/tools/[slug]          各ツール詳細
/cases                 制作ログ（このサイト自体を作る過程の記録）
/cases/[slug]          個別 Case
/about                 サイトの目的・著者
```

## 技術スタック（必ず守る）

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.x、`strict: true`、`noUncheckedIndexedAccess: true`
- **Style**: Tailwind CSS v4
  - `@apply` 禁止、ユーティリティクラスを直接記述
  - インラインスタイル禁止
- **Content**: MDX（`@next/mdx` + `gray-matter`）
- **Icon**: Lucide React
- **Animation**: Framer Motion（最小限のみ、`prefers-reduced-motion` 対応必須）
- **Diagram**: Mermaid（`rehype-mermaid`）
- **Deploy**: Vercel
- **CI**: GitHub Actions（lint / typecheck / build）
- **AI API は使わない**（純 Static サイト）

## 守ってほしい方針（最重要）

1. **専門用語は必ず「ひとことで言うと」を併記**（`<Glossary>` コンポーネントを使う）
2. **🟢🟡🔵 のソース・バッジを各ページの先頭に**（`<StatusBadge>`）
3. **過剰なアニメーションは避ける**（控えめが正義）
4. **WCAG 2.1 AA を満たす**
5. **モバイル優先**（375px で横スクロールが出ない）
6. **AI ツール紹介を主役にしない**（ツールは「道具」として登場させる）
7. **著者の実体験ベース**を優先、ネット情報は補強として使う

## ディレクトリ規約

```
src/
├── app/                   ページ（App Router）
├── components/            共通コンポーネント
├── content/               MDX コンテンツ
│   ├── learn/             /learn/* の中身
│   ├── workflow/          /workflow の中身
│   ├── tools/             /tools/* の中身（7 本）
│   └── cases/             /cases/* の中身
├── lib/                   ユーティリティ（mdx.ts, seo.ts, content-types.ts）
└── styles/                globals.css
```

## 第2期の合言葉

> **全ページを厚くする、ではなく、全ページから次の一歩を踏めるようにする。**

行数ではなく、各ページが以下 4 条件を満たすことを完了基準とする。

1. このページを読んだあと、読者が **1 つ操作できる**
2. このページから **次に読む場所が明確**
3. **専門用語が初出で説明されている**（`<Glossary>`）
4. **実例・失敗例・ミニ課題**がある

## 教材ページの 4 ブロック（必須）

詳細・教材ページ（`/learn/*` `/tutorials/*` `/tools/[slug]` `/cases/[slug]` `/workflow`）には、
原則として以下の 4 ブロックを入れる。

```text
1. ひとことで言うと   … <Glossary> または冒頭1行
2. まずやること        … 5 分で試せるアクション
3. よくある失敗        … ハマりどころ 3〜5 個
4. 次に読むページ      … Markdown リンクリスト 1〜3 件
                        （Phase 2 で <RelatedPages> に置換予定）
```

Home / About / 一覧ページ（`/` `/about` `/tools` `/cases` `/tutorials`）では、
同じ役割を **導線として表現する**（CTA / カードグリッド / 推奨ルート）。
4 ブロックを機械的に当てはめない。

## ページ間の役割分担

同じ説明が 4 か所に出ないよう、ページごとの守備範囲を固定する。

| URL | 役割 |
|---|---|
| `/learn/{topic}` | **概念**をやさしく理解する場所 |
| `/tutorials/{topic}` | 実際に **操作する**場所（ハンズオン） |
| `/tools/{slug}` | **開発フローの中で**どう使うかの整理 |
| `/cases/{slug}` | このサイト制作で **実際にどう使ったか**の記録 |

## 04_content.md と MDX の SoT

二重管理を避けるための役割分担：

| ファイル | 役割 |
|---|---|
| `docs/04_content.md` | **構成・章立て・要点の設計書**（本文 SoT ではない） |
| `src/content/*.mdx` | **本文の SoT**（実際の文章はここに書く） |
| `docs/16_content-recipe.md` | **書き方の型**（共通 4 ブロック、用語ルール） |

新規コンテンツを書くときは、**04_content.md の要点に従う。本文の正は MDX**。

## やらないこと（Phase 2 へ）

- ユーザー認証 / アカウント機能
- データベース / API / バックエンド
- AI API 呼び出し
- Pagefind 検索
- RSS フィード
- ダークモード
- 記事別 OG 画像（共通 1 枚のみ）
- 高度なアニメーション
- 多言語対応
- shadcn/ui（必要になってから判断）
- ブログ機能（`/cases` に統合済み）

## 用語ルール

| 用語 | ひとことで言うと |
|---|---|
| Repository | プロジェクトを置く場所 |
| Issue | やることメモ |
| Branch | 作業用の分岐 |
| Pull Request (PR) | 変更を見てもらう提出箱 |
| Review | 変更内容の確認 |
| Merge | 本番の流れに合流させること |
| Vercel Preview | 公開前にお試し画面で見ること |

これらの用語が初出する場面では `<Glossary term="..." oneLine="..." />` を使う。

## バッジ仕様

```tsx
<StatusBadge status="green" />   // 🟢 実体験
<StatusBadge status="yellow" />  // 🟡 一部実体験
<StatusBadge status="blue" />    // 🔵 調査ベース
```

各 MDX の frontmatter に `status: green | yellow | blue` を必ず入れる。

## Frontmatter テンプレ

### ツール詳細用
```yaml
---
title: "Claude Code"
slug: claude-code
status: green
oneLiner: "ターミナルで対話するコーディングAI"
icon: "Terminal"
order: 2
---
```

### Case 用
```yaml
---
title: "Case 1: Claude Code に UI 実装を任せた"
slug: case-1-claude-code-ui
date: 2026-05-XX
status: green
tools: [claude-code, vercel]
relatedIssue: 5
relatedPR: 6
---
```

## 困ったとき

- **Next.js 16 の挙動が不明** → 公式ドキュメント（v16）を参照、v15 の知識で実装しない
- **設計に迷う** → `docs/01_spec.md` 〜 `docs/06_tech-stack.md` を読む
- **コンテンツの文言が不明** → `docs/04_content.md` を読む（勝手に書き換えない）
- **デザインに迷う** → `docs/05_design.md` を読む
- **どのプロンプトを使うべきか** → `docs/11_prompts.md` を読む

## 危険操作のルール

- ファイル削除 / 大規模書き換え / マイグレーションは、実行前に必ず差分を見せて確認を取る
- 不明点は推測で進めず、必ず質問してから着手
- 既存ファイルとの衝突は手を止めて報告

## 関連ドキュメント

- `docs/DOCS_INDEX.md` ― 全ドキュメントの索引
- `docs/09_claude-brief.md` ― 方針指示書（最重要）
- `docs/01_spec.md` ― 仕様書
- `docs/02_plan.md` ― 14 日スケジュール
- `docs/03_pages.md` ― ページ構成
- `docs/04_content.md` ― コンテンツ計画
- `docs/05_design.md` ― デザイン仕様
- `docs/06_tech-stack.md` ― 技術スタック
- `docs/11_prompts.md` ― 実プロンプト集
- `AGENTS.md` ― 他 AI（Codex / Antigravity / Gemini）向け
