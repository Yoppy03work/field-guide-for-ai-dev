# 16. ページタイプ別「書き方の型」

> このファイルは Claude Code / Codex / Gemini が
> 新規 MDX を書くときの「型」。CONTRIBUTING.md と組み合わせて読む。

## 共通 4 ブロック（教材ページの必須セクション）

詳細・教材ページ（`/learn/*` `/tutorials/*` `/tools/[slug]` `/cases/[slug]` `/workflow`）には
原則として以下の 4 ブロックを入れる。

```mdx
## ひとことで言うと

<Glossary term="..." oneLine="..." />

## まずやること

5 分で試せる小さな手順 1〜3 個。

## よくある失敗

- ハマりどころ 1
- ハマりどころ 2
- ハマりどころ 3

## 次に読むページ

<RelatedPages items={[
  { href: "...", label: "..." },
  { href: "...", label: "..." },
]} />
```

## ページタイプ別テンプレ

### `/learn/{topic}` ― 概念をやさしく理解する

frontmatter:
```yaml
---
title: "{topic} 入門"
slug: {topic}
status: green | yellow | blue
---
```

構成:
1. ページ全体ヘッダ（h1 + StatusBadge + 何が学べるか 3 行）
2. セクション 1〜N（各セクションは「ひとこと → 具体例 → なぜ → 試してみよう」）
3. **ページ全体として共通 4 ブロックを満たす**（各セクションへ機械的に当てない）
4. 末尾：「概念は分かった → 次は `/tutorials/{topic}` で手を動かす」

### `/tutorials/{topic}` ― 手を動かす

frontmatter:
```yaml
---
title: "{topic} チュートリアル"
slug: {topic}
status: green | yellow
estimatedMinutes: 30
difficulty: beginner | intermediate
prerequisites:
  - "GitHub アカウントを持っている"
---
```

構成:
1. ヘッダ（h1 + StatusBadge + 所要時間 + 前提）
2. **体験範囲の注記**（特に 🟡 のとき必須）
3. ステップ 1〜N（各ステップは「やる → 期待される結果 → うまくいかない時」）
4. **末尾の「できたか確認」セルフチェックリスト**：
   ```mdx
   ## できたか確認

   - [ ] X ができた
   - [ ] Y ができた
   - [ ] うまくいかなかった場所を説明できる
   ```
5. 「次のステップ」誘導

### `/tools/{slug}` ― 開発フローの中で

frontmatter:
```yaml
---
title: "{Tool}"
slug: {slug}
status: green | yellow | blue
oneLiner: "1 文説明"
icon: "Lucide アイコン名"
order: N
---
```

構成（過剰に厚くしない、詳細は Tutorial / Case に逃がす）:
1. このツールをひとことで言うと
2. 開発フローのどこで使うか（`/workflow#step-N` リンク）
3. 実際に試したこと
4. 効果があったこと
5. 微妙だったこと
6. 駆け出しが最初に試すなら（→ `/tutorials/{slug}`）
7. 関連する Case / Issue / PR

### `/cases/{slug}` ― 実例

frontmatter:
```yaml
---
title: "Case N: ..."
slug: case-N-...
status: green | yellow
date: "YYYY-MM-DD"
tools: ["claude-code", "vercel"]
relatedIssue: 5    # 任意
relatedPR: 6       # 任意
---
```

構成（真似できる教材になっているか）:
1. やりたかったこと
2. 使った AI / ツール
3. 実際に投げた指示（**`<CodeBlock>` で公開**）
4. 返ってきた結果（diff サマリ + スクショプレースホルダ）
5. 良かった点
6. 微妙だった点
7. **自分の repo で試すには**（→ Tutorial へ）
8. Lessons Learned（5〜8 件）
9. 関連 Issue / PR

## 文章スタイル

### 必ず守る

- **大学 1 年生が読める**前提で書く。難解な漢字熟語より平易に
- **専門用語は初出で `<Glossary>`**
- **一文 80 字以内** が読みやすい目安
- **🟢🟡🔵 の境目をぼかさない**（実体験は実体験、調査ベースは調査ベースのまま）

### 避けたい

- 「ぜひ」「実は」「なんと」など中身のない強調語
- 主観の連呼（「最高」「神」など、何が良いか具体的でない）
- 同じ文末の 3 行連続（「です」「ます」「です」）
- 過度な絵文字（🟢🟡🔵 と💡以外は控えめ）

## 内部リンクの作り方

- ページ間：`[ラベル](/path)` または `<Link href="/path">`
- セクション内：`[ラベル](#anchor-id)`
- GitHub 外部リンク：`[#PR 番号](https://github.com/Yoppy03work/field-guide-for-ai-dev/pull/N)`
- **dead link を作らない**（移動先がまだ存在しないなら、リンクにせずプレーンテキストで予告）

## frontmatter の `status` 判定

| バッジ | いつ |
|---|---|
| 🟢 green | このサイト or 著者の実プロジェクトで実際に使った |
| 🟡 yellow | 1〜2 回試したベース / 別プロジェクトでの体験 |
| 🔵 blue | 公式ドキュメントなど調査ベース、未使用 |

ぼかしたくなったら 🟡 に下げる。誇張しない。

## このファイルの更新ルール

新しいページタイプを追加したら、必ずこのファイルにも型を追記する。
迷ったら `docs/04_content.md` の構成を確認する。本文 SoT は MDX。
