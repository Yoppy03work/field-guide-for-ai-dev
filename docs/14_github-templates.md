# 14. GitHub Issue / PR テンプレート

このファイルは、GitHub の Issue / PR に使うテンプレ集です。
**プロジェクトの `.github/` 配下にコピーして配置してください。**

---

## ディレクトリ配置

```
.github/
├── ISSUE_TEMPLATE/
│   ├── feature.md          ← 新機能 / 新ページ
│   ├── bug.md              ← バグ報告
│   └── content.md          ← 記事 / コンテンツ追加
├── PULL_REQUEST_TEMPLATE.md
└── workflows/
    └── ci.yml              ← lint / typecheck / build
```

---

## `.github/ISSUE_TEMPLATE/feature.md`

```markdown
---
name: 新機能 / 新ページ
about: 新しい機能やページの追加を提案する
title: "[feat] "
labels: ["enhancement"]
---

## やりたいこと

何を実装したいかを 1〜3 行で。

## 動機 / なぜ必要か

なぜこれが必要なのか、誰のためになるか。

## 受け入れ基準

完成と判断するためのチェックリスト。

- [ ] ...
- [ ] ...
- [ ] アクセシビリティ要件を満たす
- [ ] モバイル幅で崩れない
- [ ] CI がグリーン

## 関連ドキュメント

- 2回目/01_spec.md の該当セクション
- 2回目/03_pages.md の該当ページ
- 2回目/04_content.md の文言

## AI ツールの使い方（任意）

このタスクで使う AI ツールと、その役割。

- Claude Code: 実装
- Codex: PR レビュー
- Antigravity: 画面確認
```

---

## `.github/ISSUE_TEMPLATE/bug.md`

```markdown
---
name: バグ報告
about: 不具合を報告する
title: "[bug] "
labels: ["bug"]
---

## 何が起きているか

期待と現実のギャップを 1〜3 行で。

## 再現手順

1. ...
2. ...
3. ...

## 期待される挙動

## 実際の挙動

## 環境

- OS:
- ブラウザ:
- 画面幅:

## スクショ / ログ

可能であれば添付。

## 影響範囲

- [ ] 致命的（公開を止めるレベル）
- [ ] 重大（早急に直したい）
- [ ] 軽微（時間ができたら）
```

---

## `.github/ISSUE_TEMPLATE/content.md`

```markdown
---
name: コンテンツ追加 / 修正
about: ブログ記事 / Case / 用語解説の追加・修正
title: "[content] "
labels: ["content"]
---

## どのコンテンツか

- [ ] /learn/github のセクション
- [ ] /workflow のステップ
- [ ] /tools/[slug]
- [ ] /cases/[slug]
- [ ] /about
- [ ] その他: ___

## やりたいこと

追加 / 修正したい内容を 3〜5 行で。

## ソース

- [ ] 🟢 実体験ベース
- [ ] 🟡 一部実体験
- [ ] 🔵 調査ベース

## 公開可否の確認

引用・転載がある場合、出典の公開可否を確認したか:

- [ ] 確認済み
- [ ] 不要（自作のみ）

## 受け入れ基準

- [ ] 文言が「ひとことで言うと」スタイルに準拠
- [ ] 大学1年生でも読める
- [ ] バッジが正しい
- [ ] 関連 Case / Issue / PR がリンクされている
```

---

## `.github/PULL_REQUEST_TEMPLATE.md`

```markdown
## このPRで何をしたか

（人間が書く。1〜3 行）

## 関連 Issue

Closes #N

## Claude Code への指示（再現用）

実際に Claude Code に投げたプロンプトをそのまま貼ります。
2回目/11_prompts.md の P○-○ を使った場合は、そのIDを記載。

```
（プロンプト全文 or プロンプトIDのみ）
```

## Codex への指示

このPRをレビューしてほしい観点:

- [ ] TypeScript strict 違反が無いか
- [ ] Tailwind v4 の `@apply` が混入していないか
- [ ] インラインスタイルが混入していないか
- [ ] `<Glossary>` を使うべき用語が生テキストになっていないか
- [ ] `<StatusBadge>` がページ先頭に置かれているか
- [ ] アクセシビリティ要件（alt / aria-* / フォーカス可視化）を満たすか
- [ ] テストが既存の振る舞いを壊していないか

## Antigravity への指示（任意）

プレビュー URL を渡して以下を確認してほしい:

- [ ] モバイル幅 (375px) で横スクロールが出ない
- [ ] /learn/github が読み切れる
- [ ] /workflow の Mermaid 図が描画される
- [ ] その他: ___

## 検証

- [ ] `pnpm lint` がグリーン
- [ ] `pnpm typecheck` がグリーン
- [ ] `pnpm build` が通る
- [ ] Vercel Preview で動作確認済み
- [ ] アクセシビリティ最低限チェック済み

## スクリーンショット（任意）

| Before | After |
|---|---|
| ... | ... |

## 補足

レビュアーへの一言、トレードオフ、将来課題など。
```

---

## `.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Build
        run: pnpm build
```

---

## ブランチ戦略

- `main`: 本番ブランチ。Vercel が自動で本番デプロイ
- 作業ブランチ: `<type>/<issue#>-<short-desc>`
  - `<type>`: `feat` / `fix` / `chore` / `docs` / `content` / `refactor` / `test`
  - 例: `feat/3-learn-github-page`、`fix/12-mobile-overflow`、`content/8-case-1-claude-code`

## コミットメッセージ規約

Conventional Commits をゆるく適用:

```
<type>(<scope>): <subject>

<body>

<footer>
```

例:

```
feat(learn-github): add 9 sections with Glossary component

- Section 1〜9 を MDX で実装
- Glossary コンポーネントで「ひとことで言うと」を表示
- 目次を lg 以上で表示

Refs #3
```

## マージ戦略

- **Squash and merge** を基本に
- 例外: 大きな機能で履歴を残したい場合は通常 merge
- Rebase は使わない（履歴が読みにくくなる）

## レビューフロー

```
1. Issue を起票
2. ブランチを切る
3. Claude Code に実装を依頼（2回目/11_prompts.md のプロンプトを使う）
4. PR を作る（このテンプレを埋める）
5. CI（lint/typecheck/build）が通るのを待つ
6. Codex の自動レビューが付く
7. 必要に応じて Antigravity に画面確認を依頼
8. 人間レビュー（自分自身でも OK）
9. 指摘を取り込む
10. Vercel Preview で最終確認
11. Squash and merge
12. main から自動で本番デプロイ
13. Cases に作業ログを記録
```
