## このPRで何をしたか

（人間が書く。1〜3 行）

## 関連 Issue

Closes #N

## Claude Code への指示（再現用）

実際に Claude Code に投げたプロンプトをそのまま貼ります。
`docs/11_prompts.md` の P○-○ を使った場合は、そのIDを記載。

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
