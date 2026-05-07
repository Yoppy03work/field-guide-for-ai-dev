# Contributing to AI Dev Field Guide

このプロジェクトに貢献する人（人間 / AI）のための onboarding です。

## このプロジェクトの北極星

> **全ページを厚くする、ではなく、全ページから次の一歩を踏めるようにする。**

各ページが以下 4 条件を満たしたら完了です。

1. このページを読んだあと、読者が **1 つ操作できる**
2. このページから **次に読む場所が明確**
3. **専門用語が初出で説明されている**
4. **実例・失敗例・ミニ課題**がある

## 最初に読むもの

| ファイル | 役割 |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Claude Code 向け文脈ファイル。プロジェクトの方針 |
| [`AGENTS.md`](AGENTS.md) | Codex / Antigravity / Gemini 向けレビュー観点 |
| [`docs/09_claude-brief.md`](docs/09_claude-brief.md) | プロジェクト方針指示書（最重要） |
| [`docs/16_content-recipe.md`](docs/16_content-recipe.md) | ページタイプ別の書き方の型 |
| [`docs/15_components.md`](docs/15_components.md) | MDX で使えるコンポーネント仕様 |

## 開発フロー（このリポジトリ自体が教材）

1. **Issue を立てる** … `[feat]` `[bug]` `[content]` のいずれかでタイトルを切る
2. **Branch を切る** … `feat/<issue#>-<slug>` の形式
3. **実装** … Claude Code に依頼するときは `docs/11_prompts.md` のプロンプトを再利用
4. **PR を作る** … `.github/PULL_REQUEST_TEMPLATE.md` の項目を埋める
5. **CI 確認** … `pnpm typecheck` `pnpm lint` `pnpm build` が green
6. **Codex review を待つ** … 通常 2〜5 分
7. **Codex 指摘に対応** … P1 critical は同じ PR で必ず対応、PR description に明記
8. **Vercel Preview 確認** … 自動コメントから URL を開く
9. **merge** … `--merge`（履歴を残す）/ `--squash`（小さい修正）

## ブランチ命名規約

- `feat/<#>-<slug>` … 新機能・新ページ
- `fix/<#>-<slug>` … バグ修正
- `chore/<#>-<slug>` … リファクタ・整理
- `docs/<#>-<slug>` … ドキュメントのみ
- `content/<#>-<slug>` … MDX コンテンツのみ

## ローカル開発

```bash
pnpm install
pnpm dev          # http://localhost:3000（占有時は -p 3010 等）
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm build        # 本番ビルド
```

> Node.js 20 LTS / pnpm 10 を推奨。

## コンテンツを追加するときの順番

1. `docs/04_content.md` の **要点設計** を確認（必要なら更新）
2. `docs/16_content-recipe.md` のテンプレで **書き方の型** を確認
3. `src/content/{learn|tutorials|tools|cases|workflow}/<slug>.mdx` に本文を書く
4. 必要なら `docs/15_components.md` の MDX コンポーネントを使う
5. `pnpm build` でルートが追加されたか確認
6. PR を出して Codex / Antigravity / Gemini に役割別レビューを依頼

## ページ間の役割分担（守ってほしい）

| URL | 役割 |
|---|---|
| `/learn/{topic}` | 概念をやさしく理解する |
| `/tutorials/{topic}` | 実際に手を動かす |
| `/tools/{slug}` | 開発フローの中での使い方 |
| `/cases/{slug}` | このサイト制作での実例 |

同じ説明を 4 か所に書かないように。

## 共通 4 ブロック（教材ページ）

詳細・教材ページには原則として：

```text
1. ひとことで言うと   … <Glossary> または冒頭1行
2. まずやること        … 5 分で試せるアクション
3. よくある失敗        … ハマりどころ 3〜5 個
4. 次に読むページ      … <RelatedPages> で 1〜3 件
```

Home / About / 一覧ページは導線（CTA / カード）で同じ役割を表現します。

## 危険操作のルール

- **削除 / 大規模書き換え / マイグレーション**は実行前に差分を提示して確認
- **不明点は推測で進めず、質問してから着手**
- **既存ファイルとの衝突は手を止めて報告**
- **`.git/` 配下や secrets には触らない**

## ライセンス

- コード: [MIT](LICENSE)
- コンテンツ: CC BY 4.0
