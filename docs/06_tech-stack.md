# 06. 技術スタック詳細と選定理由 ― v2

> **v2 改訂**: `09_claude-brief.md` を反映。
> Pagefind / RSS / ダークモード / 記事別 OG 画像 / 高度なアニメは **Phase 2 へ後送り**。
> shadcn/ui は MVP では入れず、必要になったら追加する方針に変更。

## サマリ（MVP 構成）

| レイヤ | 採用 |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.x |
| Style | Tailwind CSS v4 |
| Content | MDX（`@next/mdx` + `gray-matter`） |
| Icon | Lucide React |
| Animation | Framer Motion（最小限のみ） |
| Diagram | Mermaid（`rehype-mermaid`） |
| Deploy | Vercel |
| CI | GitHub Actions（lint, typecheck, build） |
| Code Review | Codex |
| Browser Test | Antigravity（手動） |

### Phase 2 で追加検討
- shadcn/ui
- Pagefind（検索）
- RSS フィード
- ダークモード
- 記事別 OG 画像（自動生成）
- velite（型付き Frontmatter）
- 単体テスト（Vitest）

## 詳細と選定理由

### Next.js 16 (App Router)

- **採用理由**: Vercel 最適、駆け出しの将来需要が高い
- **注意**: v16 は資料が少ない、CLAUDE.md に「Next.js 16 を使う」を明記
- **既存 web3-portfolio で動作確認済**

### TypeScript 5.x

- **採用理由**: Codex が型エラーを拾える領域なので教材価値◎
- **設定**: `strict: true`、`noUncheckedIndexedAccess: true`

### Tailwind CSS v4

- **採用理由**: Next.js v16 のデフォルト、AI が書きやすい
- **注意**: `@tailwindcss/postcss` の設定が必要

### shadcn/ui（Phase 2）

- **MVP では入れない**: 依存を増やしたくない、Tailwind の素のクラスだけで通す
- **Phase 2**: Tabs / Accordion / Dialog などが必要になったら追加

### MDX（`@next/mdx` + `gray-matter`）

- **採用理由**: 公式、設定が単純
- **Frontmatter**: `gray-matter` で読み込み、TypeScript 型を手書き
- **Phase 2**: `velite` への移行を検討（型付き Frontmatter が魅力）

### Pagefind（Phase 2）

- **MVP では入れない**: 6 ページ MVP では検索は過剰
- **Phase 2**: ページ数が増えたら追加

### Mermaid

- **採用理由**: ワークフロー図を Markdown で書ける
- **使う場所**: `/workflow` の8ステップ図

### Vercel

- **採用理由**: Next.js 最適、PR プレビューが教材の核
- **設定**: GitHub リポジトリと連携、自動デプロイ
  - Production：`main`
  - Preview：それ以外すべて

### GitHub Actions（CI）

- **採用理由**: lint/typecheck/build を自動回す
- **最小ジョブ**:
  - `pnpm install`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

### Codex（PR レビュー）

- **役割**: PR 提出時の自動コードレビュー
- **PR テンプレに「Codex への指示」欄を設ける**

### Antigravity（ブラウザ E2E 確認）

- **役割**: 主要ページの巡回テスト、レイアウト崩れの発見
- **頻度**: PR レビューの後半、週末ごと

## 開発環境

| 項目 | バージョン |
|---|---|
| Node.js | 20 LTS |
| パッケージマネージャ | pnpm（推奨）、npm でも可 |
| エディタ | VS Code（Copilot 拡張インストール済） |
| OS | macOS（著者環境） |

## ディレクトリ構成（予定）

```
ai-dev-field-guide/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── feature.md
│   │   ├── bug.md
│   │   └── content.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml
├── public/
│   ├── og-image.png       # MVP では1枚共通
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # /
│   │   ├── about/page.tsx
│   │   ├── learn/
│   │   │   └── github/page.tsx         # /learn/github
│   │   ├── workflow/page.tsx           # /workflow
│   │   ├── tools/
│   │   │   ├── page.tsx                # /tools
│   │   │   └── [slug]/page.tsx
│   │   ├── cases/
│   │   │   ├── page.tsx                # /cases
│   │   │   └── [slug]/page.tsx
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── Glossary.tsx                # 「ひとことで言うと」用
│   │   ├── ToolCard.tsx
│   │   ├── CaseCard.tsx
│   │   └── ...
│   ├── content/
│   │   ├── learn/
│   │   │   └── github.mdx              # 9 セクション
│   │   ├── workflow/
│   │   │   └── steps.mdx               # 8 ステップ
│   │   ├── tools/
│   │   │   ├── github.mdx
│   │   │   ├── claude-code.mdx
│   │   │   ├── codex.mdx
│   │   │   ├── copilot.mdx
│   │   │   ├── antigravity.mdx
│   │   │   ├── vercel.mdx
│   │   │   └── other-ai.mdx
│   │   └── cases/
│   │       ├── case-1-claude-code-ui.mdx
│   │       ├── case-2-codex-pr-review.mdx
│   │       ├── case-3-antigravity-screen-check.mdx
│   │       └── case-4-vercel-preview.mdx
│   ├── lib/
│   │   ├── mdx.ts
│   │   ├── seo.ts
│   │   └── ...
│   └── styles/
│       └── globals.css
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 採用しなかった選択肢

| 候補 | 不採用理由 |
|---|---|
| Astro | Next.js のほうが駆け出しの将来需要が高い |
| Hugo / Jekyll | カスタムコンポーネントが書きにくい |
| Notion / Substack | ホスティング独占で教材として不適 |
| Sanity / Contentful | API 必須、AI API 非使用方針と相性悪 |
| velite（MVP） | 動作実績が少ない、Phase 2 で再検討 |
| shadcn/ui（MVP） | 依存を増やしたくない、Phase 2 で再検討 |
| Pagefind（MVP） | 6 ページでは過剰 |

## 既知の懸念

1. **Next.js 16 の情報量**: Claude Code が古い v15 情報で実装してしまう可能性
   - 対策：CLAUDE.md に明記、エラー時は公式ドキュメント参照を指示
2. **Tailwind v4 の breaking changes**: Plugin の互換性
   - 対策：必要なプラグインを最小限に抑える
3. **MDX のレンダラー選び**: 動作実績の少ない `velite` を選ぶとハマる
   - 対策：第一候補は `@next/mdx`、Phase 2 で再評価

## レビュアー向け：技術選定のレビュー観点

- 1〜2 週間で本当に Next.js 16 + Tailwind v4 で完走できるか
- shadcn/ui を入れない判断は妥当か
- MDX は `@next/mdx` で十分か
- Pagefind を Phase 2 に回す判断は妥当か
- CI は GitHub Actions の最小セットで足りるか
- 単体テストを MVP に入れない判断は妥当か
