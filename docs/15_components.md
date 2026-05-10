# 15. MDX で使えるコンポーネント仕様

> このファイルは Claude Code / Codex などのエージェントが
> MDX を書くときに参照する。仕様外の使い方を防ぐ。

## 目次

- [StatusBadge](#statusbadge) … 情報源バッジ
- [Glossary](#glossary) … 「ひとことで言うと」ブロック
- [Callout](#callout) … info / warn / tip 注記ブロック
- [RelatedPages](#relatedpages) … 「次に読むページ」リンクリスト
- [Breadcrumb](#breadcrumb) … パンくずリスト
- [CodeBlock](#codeblock) … コピーボタン付きコードブロック（自動適用）
- [ReadingTime](#readingtime) … 読了時間表示
- [AnchorHeading](#anchorheading) … h2 / h3 にホバー # アイコン
- [ReadingProgress](#readingprogress) … 上部のスクロール進捗バー
- [Mermaid](#mermaid) … クライアント描画の図
- [Toc](#toc) … 目次（page.tsx で使う、MDX では使わない）
- [StepCard / MiniTask](#stepcard--minitask) … チュートリアル課題
- [Header / Footer](#header--footer) … layout で使う、MDX では使わない

## StatusBadge

各ページの先頭に置く情報源バッジ。

```mdx
import { StatusBadge } from "@/components/StatusBadge";

<StatusBadge status="green" />   {/* 🟢 実体験 */}
<StatusBadge status="yellow" />  {/* 🟡 一部実体験 */}
<StatusBadge status="blue" />    {/* 🔵 調査ベース */}
```

**型**:

```ts
type StatusBadgeProps = {
  status: "green" | "yellow" | "blue";
};
```

**禁則**:
- 1 ページに **2 個以上置かない**（リスト型ページの個別カード除く）
- 自分で絵文字や色をハードコードして再現しない（必ず `<StatusBadge>` を使う）
- frontmatter の `status` と矛盾する値を渡さない

## Glossary

専門用語の「ひとことで言うと」ブロック。**初出時のみ**置く。

```mdx
import { Glossary } from "@/components/Glossary";

<Glossary term="Issue" oneLine="やることメモ" />

<Glossary term="Pull Request (PR)" oneLine="変更を見てもらう提出箱">
  例: 「この変更を main に取り込んでいいですか？」と提案する仕組み。
</Glossary>
```

**型**:

```ts
type GlossaryProps = {
  term: string;
  oneLine: string;
  children?: ReactNode;
};
```

**禁則**:
- 同じ用語に対して **同一ページで 2 個以上**置かない
- 別ページでは初出として置く（例：`/learn/github` と `/tutorials/github` の両方で OK）
- 中身（oneLine）を「`docs/04_content.md` の要点」と矛盾させない

## Callout

info / warn / tip の 3 種類の注記ブロック。Glossary（用語ひとこと）とは別物。

```mdx
import { Callout } from "@/components/Callout";

<Callout type="info" title="任意のタイトル">
  本文。中身は ReactNode を受け取る。
</Callout>

<Callout type="warn">
  「よくある失敗」ブロックで使うと効きます。
</Callout>

<Callout type="tip">
  ヒントや補足。
</Callout>
```

**型**:

```ts
type CalloutType = "info" | "warn" | "tip";
type CalloutProps = {
  type?: CalloutType;       // default: "info"
  title?: string;
  children: ReactNode;
};
```

**禁則**:
- 1 ページに 5 個以上置かない（情報過多）
- `type="warn"` は本物の注意点に限定（誇張しない）

## RelatedPages

「次に読むページ」共通コンポーネント。詳細・教材ページの末尾に置く。

```mdx
import { RelatedPages } from "@/components/RelatedPages";

<RelatedPages items={[
  { href: "/tutorials/github", label: "GitHub チュートリアル", description: "実際に手を動かす" },
  { href: "/tools/github", label: "/tools/github", description: "開発フローの中での使い方" },
]} />
```

**型**:

```ts
type RelatedPageItem = {
  href: string;
  label: string;
  description?: string;
};
type RelatedPagesProps = {
  items: readonly RelatedPageItem[];
  heading?: string;  // default: "次に読むページ"
};
```

## Breadcrumb

パンくずリスト。`page.tsx` の上部で使う。

```tsx
import { Breadcrumb } from "@/components/Breadcrumb";

<Breadcrumb items={[
  { href: "/", label: "ホーム" },
  { href: "/tools", label: "ツール" },
  { label: "GitHub" },  // 最後は href なし（現在地）
]} />
```

**型**:

```ts
type BreadcrumbItem = {
  href?: string;
  label: string;
};
```

## CodeBlock

コピーボタン付きコードブロック。MDX では **`mdx-components.tsx` で `pre` を自動置換**しているので、
コードブロックを書くと自動的に `<CodeBlock>` でラップされる。

```mdx
\`\`\`bash
pnpm install
\`\`\`
```

明示的に使いたい場合：

```tsx
import { CodeBlock } from "@/components/CodeBlock";

<CodeBlock>
  <code>pnpm install</code>
</CodeBlock>
```

**禁則**:
- インライン code は対象外（`<code>` のまま）
- 動的に変わる内容（タイムスタンプ等）は CodeBlock に入れない

## ReadingTime

読了時間表示（日本語 600 字/分の素直な近似）。

```tsx
import { ReadingTime } from "@/components/ReadingTime";

// 自動算出
<ReadingTime text={mdxRawText} />

// 手動指定
<ReadingTime minutes={5} />
```

**型**:

```ts
type ReadingTimeProps = {
  text?: string;       // 基本はこちらを渡して自動算出
  minutes?: number;    // 手動上書き。両方渡された場合は minutes が優先される
  className?: string;
};
```

算出ロジックは `src/lib/reading-time.ts` の `estimateReadingMinutes` を使う。

## AnchorHeading

`mdx-components.tsx` で h2 / h3 を自動的にこのコンポーネントに置換しているので、MDX で
直接 import することは通常ない。挙動：

- 見出し ID は `id` 属性指定があればそれを、無ければ見出しテキストから slug を生成
- ホバー / フォーカスで `#` アイコンを表示
- アイコンクリックで「現在の URL + #id」をクリップボードにコピー（失敗時はフォールバックでハッシュ更新）

**型**:

```ts
type AnchorHeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level: 2 | 3;
};
```

**禁則**:
- h1 には使わない（ページのトップ見出しに `#` リンクは不要）
- 動的な見出しテキストには `id` を明示する（slug が安定しない可能性）

## ReadingProgress

長文ページ（`/learn/*` `/tutorials/*` `/workflow` `/cases/*`）の上部に細い進捗バーを表示する。
クライアント側で `window.scrollY` を見る `"use client"` コンポーネント。

```tsx
import { ReadingProgress } from "@/components/ReadingProgress";

<ReadingProgress />
```

**禁則**:
- 短いページ（`/about` `/tools` 一覧、`/cases` 一覧）には付けない（無意味）
- 1 ページに 2 個置かない

## Mermaid

クライアントサイドで描画される図。`/workflow` のフロー図などで使う。

```mdx
import { Mermaid } from "@/components/Mermaid";

<Mermaid
  ariaLabel="Issue から Merge までの 8 ステップ"
  chart={`flowchart TD
    A["Issue"] --> B["Branch"]
    B --> C["実装"]
`}
/>
```

**型**:

```ts
type MermaidProps = {
  chart: string;
  ariaLabel?: string;
};
```

**禁則**:
- ラベルが多すぎる図にしない（モバイル 375px で読めなくなる）
- `securityLevel` は `strict` 固定。HTML を埋めない

## StepCard / MiniTask

「やってみよう」のチュートリアル課題。`/learn/github` の末尾で 8 ステップを表示する用途で使っている。

```mdx
import { MiniTask } from "@/components/MiniTask";

<MiniTask />
```

`MiniTask` は内部で 8 つの `StepCard` を持つ。新しい課題セットを作る場合は、
`StepCard` を直接使うのではなく、`MiniTask` のような複合 component を別ファイルで定義する。

## Header / Footer

`src/app/layout.tsx` で全ページに自動適用される。MDX で再 import しない。

## 共通 4 ブロックでの使い分け

| ブロック | 推奨コンポーネント |
|---|---|
| 1. ひとことで言うと | `<Glossary>` |
| 2. まずやること | プレーン Markdown の番号付きリスト |
| 3. よくある失敗 | プレーン Markdown の箇条書き（Phase 2 で `<Callout type="warn">` に置換予定） |
| 4. 次に読むページ | プレーン Markdown のリンクリスト（Phase 2 で `<RelatedPages>` に置換予定） |

## このファイルの更新ルール

新しい component を追加したら、必ずこのファイルにも仕様を追記する。
追記がないコンポーネントは「使ってよいか分からない」扱いになる。
