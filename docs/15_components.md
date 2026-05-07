# 15. MDX で使えるコンポーネント仕様

> このファイルは Claude Code / Codex などのエージェントが
> MDX を書くときに参照する。仕様外の使い方を防ぐ。

## 目次

- [StatusBadge](#statusbadge) … 情報源バッジ
- [Glossary](#glossary) … 「ひとことで言うと」ブロック
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
| 3. よくある失敗 | `<Callout type="warn">` （Phase 2 で追加） |
| 4. 次に読むページ | `<RelatedPages>` （Phase 2 で追加） |

## このファイルの更新ルール

新しい component を追加したら、必ずこのファイルにも仕様を追記する。
追記がないコンポーネントは「使ってよいか分からない」扱いになる。
