# 11. Claude Code 実プロンプト集

このファイルは **AI Dev Field Guide** を完成させるための、
Claude Code への **コピペで使えるプロンプト集** です。

## 使い方

1. 該当する段階のセクションを開く
2. 「コピペ用プロンプト」をそのまま Claude Code に貼る
3. Claude Code が「これでいい？」と確認してきたら、内容を見て承認
4. 完了後、「完了後の確認」のチェックリストで動作確認
5. PR を出す → Codex レビュー → マージ

## 共通の前提

- **CLAUDE.md** をプロジェクトルートに置いてあること（`12_CLAUDE.md` 参照）
- 各プロンプトは Claude Code が **`2回目/` のドキュメントを読める前提**
- 破壊的操作の前は必ず差分を見せてもらう
- 不明点は「先に質問して」と書く

---

# 🚀  1：プロジェクト初期化

## P1-1. リポジトリ雛形セットアップ

```
【文脈】
新規プロジェクト「AI Dev Field Guide」の 1：プロジェクト初期化 作業を始める。
仕様は 2回目/01_spec.md、計画は 2回目/02_plan.md を読んでから着手して。

【指示】
以下を順に実行する前に、まず作業計画を箇条書きで出して、私の承認を待って。
1. .gitignore（Node.js + Next.js + macOS）
2. README.md（プロジェクト概要、対象読者、ローカル起動手順、ライセンス）
3. LICENSE（MIT）
4. CLAUDE.md（2回目/12_CLAUDE.md の内容をそのまま配置）
5. AGENTS.md（2回目/13_AGENTS.md の内容をそのまま配置）
6. .github/ISSUE_TEMPLATE/feature.md / bug.md / content.md
7. .github/PULL_REQUEST_TEMPLATE.md
8. .github/workflows/ci.yml（pnpm install / lint / typecheck / build）

【制約】
- 各ファイルの内容は 2回目/ 配下のテンプレを必ず確認
- まだ Next.js は init しない（次のプロンプトで実施）
- ファイル作成前に「以下を作る」と一覧してから着手
- 既存ファイルが衝突する場合は手を止めて報告
```

### 完了後の確認
- [ ] `git status` で 8 ファイルが追加されている
- [ ] CLAUDE.md と AGENTS.md の内容が `2回目/12, 13` と一致している
- [ ] CI ワークフローが定義されている

---

## P1-2. 最初の Issue を起票（GitHub 上で手作業）

> このタスクは Claude Code ではなく、人間が GitHub 上で行う。

Issue タイトル例：
```
[chore] Next.js 16 雛形を構築する
```

Issue 本文テンプレ：
```markdown
## やりたいこと
Next.js 16 + TypeScript + Tailwind v4 の雛形を構築する。

## 受け入れ基準
- [ ] `pnpm dev` でローカル起動できる
- [ ] / にページが表示される
- [ ] CI（lint / typecheck / build）がグリーン

## 関連ドキュメント
- 2回目/02_plan.md Day 2
- 2回目/06_tech-stack.md
```

---

# 🚀  2：Next.js 雛形

## P2-1. Next.js プロジェクトを init

```
【文脈】
Issue #1 「Next.js 16 雛形を構築する」を進める。
2回目/06_tech-stack.md の構成に厳密に従う。

【指示】
1. ブランチを feat/1-nextjs-skeleton で切る
2. `pnpm create next-app@latest .` を以下の選択で実行:
   - TypeScript: yes
   - ESLint: yes
   - Tailwind CSS: yes
   - src/ directory: yes
   - App Router: yes
   - Import alias: @/* (デフォルト)
3. 既存の README.md / .gitignore は上書きしないように、競合があったら報告
4. 不要なボイラープレート画像（vercel.svg等）は削除候補としてリスト化

【制約】
- まず実行コマンドだけ出して、私の承認を待つ
- 実行後は変更ファイル一覧を報告
- 動作確認は `pnpm dev` で http://localhost:3000 が開けるところまで
```

### 完了後の確認
- [ ] `pnpm dev` でホームが見える
- [ ] TypeScript strict が有効
- [ ] Tailwind v4 が動く（`text-red-500` 等で確認）

## P2-2. 共通レイアウト + StatusBadge / Glossary コンポーネント

```
【文脈】
2回目/03_pages.md の共通レイアウトと、2回目/05_design.md のデザイン仕様に従って
共通コンポーネントを作る。

【指示】
以下のコンポーネントを順に作成:
1. src/components/Header.tsx
   - ロゴ "AI Dev Field Guide"
   - ナビ: まずはここから / ワークフロー / ツール / Cases / About
   - md 以下はハンバーガーメニュー（Lucide Menu/X、Framer Motion で開閉）
2. src/components/Footer.tsx
   - バッジ凡例（🟢実体験 / 🟡一部実体験 / 🔵調査ベース）
   - GitHub リンク（暫定 #）
   - © 2026 yoppy
3. src/components/StatusBadge.tsx
   - props: status: "green" | "yellow" | "blue"
   - 表示: "🟢 実体験" / "🟡 一部実体験" / "🔵 調査ベース"
   - aria-label でスクリーンリーダー対応
4. src/components/Glossary.tsx
   - props: term: string, oneLine: string, children?: ReactNode
   - 「ひとことで言うと」スタイル（05_design.md 参照）
5. src/app/layout.tsx に Header / Footer を組み込み

【制約】
- TypeScript strict、any 禁止
- Tailwind v4、@apply 禁止、ユーティリティ直書き
- aria-label / role を適切に
- まず作成するファイルの一覧と props 定義案を出して、承認を得てから実装
```

### 完了後の確認
- [ ] 4 コンポーネントが import できる
- [ ] / ヘッダ・フッタが表示される
- [ ] モバイル幅でハンバーガーメニューが動く
- [ ] StatusBadge / Glossary を一時的にホームに置いて表示確認

## P2-3. MDX 連携（@next/mdx + gray-matter）

```
【文脈】
src/content/ 配下の .mdx ファイルを読み込む基盤を作る。
2回目/06_tech-stack.md の方針に従う。

【指示】
1. 必要パッケージをインストール:
   - @next/mdx, @mdx-js/react, @mdx-js/loader
   - gray-matter
   - rehype-mermaid（後で使う）
2. next.config.ts で MDX を有効化（@next/mdx）
3. src/lib/mdx.ts を作成:
   - getContentBySlug(category, slug) で MDX を読む
   - getAllContentMeta(category) で frontmatter 一覧を取る
   - frontmatter の TypeScript 型を src/lib/content-types.ts に定義
4. src/content/ ディレクトリを作成（learn/, workflow/, tools/, cases/）

【制約】
- 型は厳密に: status は "green" | "yellow" | "blue" のリテラル型
- ビルド時に存在しない category を要求したらエラーで落ちる設計
- まず関数シグネチャだけ提示して、実装は承認後
```

### 完了後の確認
- [ ] サンプル `.mdx` を 1 ファイル置いて、frontmatter が型付きで取れる
- [ ] `pnpm build` が通る

---

# 🚀  3：/learn/github 前半

## P3-1. /learn/github のページ枠 + 用語集データ

```
【文脈】
2回目/03_pages.md と 2回目/04_content.md の /learn/github 仕様に厳密に従う。
9 セクション、各セクションは「ひとことで言うと / 具体例 / なぜ / 試してみよう」。

【指示】
1. src/app/learn/github/page.tsx を作成
2. src/content/learn/github.mdx を作成（中身は次のステップで埋める）
3. 9 セクションのうち、まず以下の 4 つを書く（2回目/04_content.md の文言を使用）:
   - セクション 1: GitHub って何？
   - セクション 2: リポジトリとは？
   - セクション 3: Issue とは？
   - セクション 4: Branch とは？
4. <Glossary> コンポーネントを使って「ひとことで言うと」を表示
5. ページ先頭に <StatusBadge status="green" /> を置く
6. ページの目次（Table of Contents）を右サイドに（lg 以上のみ表示）

【制約】
- 文言は 2回目/04_content.md からそのままコピー、勝手に書き換え禁止
- 大学1年生でも読めるように、難しい単語は必ず Glossary 化
- TypeScript strict
- 残り 5 セクションは次のプロンプトで書くので今回は触らない
- 完了したら、目次のリンクが各セクションへスクロールするか動作確認
```

### 完了後の確認
- [ ] /learn/github が表示される
- [ ] 4 セクションが見える
- [ ] バッジが「🟢 実体験」と表示される
- [ ] lg 以上で目次が右に出る

---

# 🚀  4：/learn/github 後半 + ミニ課題

## P4-1. /learn/github 残り 5 セクション

```
【文脈】
P3-1 の続き。残り 5 セクションを書く。

【指示】
2回目/04_content.md の文言で以下を追記:
- セクション 5: Pull Request とは？
- セクション 6: Review とは？
- セクション 7: Merge とは？
- セクション 8: Vercel Preview で確認するとは？
- セクション 9: AI 開発ではどこで Claude Code / Codex / Antigravity を使う？

各セクションは P3-1 と同じ4ブロック構成（ひとことで言うと / 具体例 / なぜ / 試してみよう）。

【制約】
- 既存の 4 セクションには触らない（差分を最小に）
- 目次にも 5 項目を追加
- セクション 9 の最後に「詳細は /workflow へ」のリンクを付ける
```

## P4-2. ミニ課題セクションを追加

```
【文脈】
2回目/04_content.md の「最後のミニ課題」を /learn/github の末尾に追加する。

【指示】
1. 「お題: 自己紹介カードを追加する」を 8 ステップで表示
2. 各ステップに以下を含めるカードコンポーネントを新規作成 (src/components/StepCard.tsx):
   - 番号 (1〜8)
   - タイトル（"Issue を立てる" 等）
   - 1 行説明
   - リンク先（/workflow#step-N）
3. /workflow ページはまだ未実装なので、リンクは設置するだけで OK
4. ミニ課題の前に「やってみよう」のヒーローブロック

【制約】
- StepCard はモバイルで縦並び、md 以上で 2 列、lg で 4 列
- アイコンは Lucide から適切なものを選ぶ（Pencil / GitBranch / Bot / GitPullRequest 等）
- アクセシビリティ: 番号は数字のみでなく "ステップ 1" と読み上げ可能に
```

### 完了後の確認
- [ ] /learn/github の最下部にミニ課題が表示される
- [ ] StepCard が 8 個並ぶ
- [ ] モバイルで縦、lg で 4 列になる

---

# 🚀  5：/workflow 中心ページ

## P5-1. /workflow ページ枠 + Mermaid 図

```
【文脈】
2回目/03_pages.md と 2回目/04_content.md の /workflow 仕様に従う。
このページがサイトの中心。8 ステップを丁寧に書く。

【指示】
1. src/app/workflow/page.tsx を作成
2. src/content/workflow/steps.mdx を作成
3. ページ冒頭:
   - <StatusBadge status="green" />
   - h1: 「AI 開発フローの全体像」
   - 「このページで学べること」（3 行）
4. Mermaid 図で 8 ステップの全体像を表示
   - rehype-mermaid を有効化
   - flowchart TD で縦に流れる
5. 8 ステップそれぞれにアンカー (#step-1〜#step-8)

【制約】
- Mermaid のラベルは日本語 OK
- ライト版のみ
- 文言は 2回目/04_content.md からそのままコピー
- まずページの骨組みと Mermaid 図だけ作る、各ステップの中身は次のプロンプト
```

## P5-2. /workflow 8 ステップの中身

```
【文脈】
P5-1 の続き。8 ステップそれぞれの本文を書く。
2回目/04_content.md の「Step 1〜8」の文言を使う。

【指示】
各ステップに以下を含める:
- h2: "Step N: ..."
- 「何をするのか」
- 「なぜ必要なのか」
- 「初心者がハマりやすいところ」
- 「AI ツールをどう使うのか」
- 「自分で試すための小さな課題」
- 「関連: /learn/github の該当セクション / /tools/[該当ツール] / /cases/[該当Case]」

【制約】
- 各ステップは独立した <section> でラップ、id="step-N"
- 関連リンクは Card コンポーネントで横並びに 3 つ
- /tools/* /cases/* はまだ未実装なので、リンクは設置だけ
- 文言は勝手に書き換えない、04_content.md からそのまま
```

### 完了後の確認
- [ ] /workflow が表示される
- [ ] Mermaid 図が描画される
- [ ] 8 ステップが順に並ぶ
- [ ] /learn/github のミニ課題から /workflow#step-1 へジャンプできる

---

# 🚀  6：トップページ + About

## P6-1. ホームページ /

```
【文脈】
2回目/03_pages.md の「ホーム」セクション構成に厳密に従う。
旧仕様の「6ツールグリッド主役」ではなく、「まずはここから」を主役にする。

【指示】
src/app/page.tsx を以下のセクション順で実装:
1. ヒーロー:
   - h1: "AI Dev Field Guide"
   - サブ: "AIで作る、AIに任せる、AIで磨く。"
   - CTA 2 つ: "まずはここから" → /learn/github / "ワークフローを見る" → /workflow
2. このサイトについて（3 行説明）
3. 「まずはここから」大カード（/learn/github への誘導、目立つデザイン）
4. AI 開発フロー要約（Mermaid を縮小版で、/workflow へのリンク）
5. 7 ツール早見グリッド（GitHub / Claude Code / Codex / Copilot / Antigravity / Vercel / 他 AI）
   - 各カードはバッジ付き、クリックで /tools/[slug]
6. 最新 Cases 3 本のカード（Cases データはまだ無いので「準備中」プレースホルダ）
7. About への小さな誘導

【制約】
- 7 ツール早見はあくまで「補助情報」として中段以降に置く、ヒーロー直下にしない
- 「まずはここから」が一番目立つように
- カードのレイアウトは Grid、モバイル 1 列、md 2 列、lg 3〜4 列
- アニメーションは控えめ（フェードインのみ）
```

## P6-2. /about ページ

```
【文脈】
2回目/04_content.md の /about セクションに従う。

【指示】
src/app/about/page.tsx を作成。以下を含める:
- サイトの目的（誰のために、何のために）
- 対象読者（大学1年生〜駆け出し）
- 著者：yoppy（プロフィールは控えめ）
- 授業課題としての文脈
- ライセンス（コードは MIT、コンテンツは CC BY 4.0）
- お問い合わせ：GitHub Issues

【制約】
- 文章は 04_content.md の文言を基にしつつ、自然な日本語に整える
- 著者プロフィールは「学生 / ハッカソン経験者」程度の最小限
- メールアドレスは載せない
```

### 完了後の確認
- [ ] / が完成版に見える
- [ ] /about が表示される
- [ ] 全リンクが有効（404 が無い）

---

# 🚀  7：通しチェック + 本番昇格

## P7-1. 通しチェックと修正

```
【文脈】
Antigravity で通しチェックする前に、Claude Code で内部チェックを実施。

【指示】
以下を順に確認して、問題があれば修正案を提示:
1. 全ページの h1 が 1 つだけか
2. 全ページに <StatusBadge> があるか
3. 内部リンクで 404 になるものはないか（リスト化）
4. モバイル幅 (375px) で横スクロールが出ていないか
5. アクセシビリティ:
   - フォーカス可視化が消されていないか
   - 画像に alt があるか
   - aria-label が必要な箇所に付いているか
6. CLAUDE.md / 2回目/ 仕様書との整合性

【制約】
- 修正は提案のみ、実行は私の承認後
- 致命的問題と軽微なものを分けて報告
```

## P7-2. SEO 最小セット

```
【文脈】
Week 1 公開前の SEO 最小セット。

【指示】
1. src/app/layout.tsx の metadata を整える:
   - title: "AI Dev Field Guide"
   - description: 100〜160 文字
   - openGraph: 共通 OG 画像（public/og-image.png は仮のものでOK）
2. src/app/sitemap.ts を作成（全ページを列挙）
3. public/robots.txt を作成（全許可）

【制約】
- 各ページの metadata はページ別に上書きできるように
- OG 画像は 1200x630px の暫定 PNG（後で差し替え）
```

### 完了後の確認
- [ ] /sitemap.xml が出る
- [ ] /robots.txt が出る
- [ ] OG タグが各ページで生成される

---

# 🚀  8：ツール一覧 + GitHub / Claude Code 詳細

## P8-1. /tools 一覧ページ

```
【文脈】
2回目/03_pages.md /tools 仕様に従う。
主役ではないので、トーンは控えめ、辞書感を意識。

【指示】
1. src/app/tools/page.tsx を作成
2. 上部に注意書き: 「主役は /workflow です。ここはツール辞書として使ってください」
3. 7 ツールのカードを Grid で表示（モバイル 1 列、md 2 列、lg 3 列）
4. 各カード:
   - アイコン（Lucide）
   - ツール名
   - 1 文説明
   - バッジ
   - クリックで /tools/[slug]
5. 上部にフィルタ（「実体験のみ表示」のトグル）

【制約】
- 7 ツールのデータは src/content/tools/ の MDX frontmatter から取得
- フィルタは状態を URL パラメータで保持（例: ?filter=experienced）
```

## P8-2. /tools/github

```
【文脈】
2回目/04_content.md の「3.1 GitHub」セクションの文言を使用。

【指示】
1. src/content/tools/github.mdx を作成（frontmatter で status: green）
2. src/app/tools/[slug]/page.tsx で動的に MDX を読む
3. 共通テンプレに沿って 8 セクション:
   - ヒーロー（h1 + バッジ）
   - このツールをひとことで言うと
   - 開発フローのどこで使うか（/workflow#step-1, 2, 4, 7 へのリンク）
   - 実際に試したこと
   - 効果があったこと
   - 微妙だったこと
   - 駆け出しが最初に試すなら
   - 関連 Case / Issue / PR

【制約】
- 文言は 04_content.md からそのまま
- /tools/[slug] のルーティングが他のツールにも対応できる設計
- /learn/github へのリンクを目立たせる
```

## P8-3. /tools/claude-code

```
【文脈】
2回目/04_content.md の「3.2 Claude Code」セクション。
このページには「CLAUDE.md の書き方」のミニ章を追加する。

【指示】
1. src/content/tools/claude-code.mdx を作成
2. 共通テンプレに加えて、「CLAUDE.md の書き方」セクションを差し込む
3. プロジェクトルートの CLAUDE.md（実際のファイル）をサンプルとして引用

【制約】
- CLAUDE.md の引用は CodeBlock で
- 「ハマりどころ」セクションを必ず入れる
```

### 完了後の確認
- [ ] /tools が表示される
- [ ] /tools/github と /tools/claude-code が読める
- [ ] フィルタが効く

---

# 🚀  9：Codex / Copilot / 他 AI

## P9-1. /tools/codex / /tools/copilot / /tools/other-ai

```
【文脈】
2回目/04_content.md の「3.3 Codex」「3.4 Copilot」「3.7 他 AI」を実装。

【指示】
3 つの MDX ファイルを作成:
1. src/content/tools/codex.mdx (status: green)
2. src/content/tools/copilot.mdx (status: green)
3. src/content/tools/other-ai.mdx (status: blue)

各ページは P8-2 と同じ共通テンプレ。

【制約】
- 文言は 04_content.md から
- /tools/other-ai は調査ベースなので、「未使用です」を明記、公式ドキュメントへの直リンクを多めに
```

---

# 🚀  10：Antigravity / Vercel

## P10-1. /tools/antigravity / /tools/vercel

```
【文脈】
2回目/04_content.md の「3.5 Antigravity」「3.6 Vercel」を実装。

【指示】
1. src/content/tools/antigravity.mdx (status: yellow)
2. src/content/tools/vercel.mdx (status: yellow)

【制約】
- /tools/antigravity は 1 回限りの体験なので、「過剰な一般化を避ける」注意書きを入れる
- /tools/vercel は web3-portfolio 経験を Cases に書く予定なので、リンク予約のプレースホルダを置く
```

### 完了後の確認
- [ ] /tools 一覧に 7 つ全部が出る
- [ ] 各ツール詳細が読める

---

# 🚀  11：/cases 一覧 + Case 1

## P11-1. /cases 一覧

```
【文脈】
2回目/03_pages.md /cases 仕様。

【指示】
1. src/app/cases/page.tsx を作成
2. src/content/cases/ 配下の MDX を frontmatter で取得し、新しい順に並べる
3. カード形式:
   - タイトル / 日付 / バッジ / 関連ツールタグ / 抜粋
4. 上部に注意書き: 「このサイト自体の制作ログです」

【制約】
- ツールタグは frontmatter の tools: [...] から
- 抜粋は本文の最初 100 字
```

## P11-2. /cases/case-1-claude-code-ui

```
【文脈】
最初の Case 記事。Day 6 のヒーロー実装プロンプト（P6-1）を素材に書く。

【指示】
1. src/content/cases/case-1-claude-code-ui.mdx を作成
2. frontmatter:
   - title: "Case 1: Claude Code に UI 実装を任せた"
   - status: green
   - tools: [claude-code, vercel]
   - relatedIssue: 5 (仮)
   - relatedPR: 6 (仮)
3. 共通テンプレ:
   - やりたかったこと
   - 使った AI / ツール
   - 実際に投げた指示（P6-1 のプロンプト全文）
   - 返ってきた結果（実装差分のサマリ）
   - 良かった点
   - 微妙だった点
   - 駆け出しへのアドバイス
   - 関連 Issue / PR

【制約】
- プロンプトは CodeBlock で全文掲載
- 実装差分は「主要ファイルとその変更点」を箇条書きで
- スクショは public/cases/ に置く（暫定でテキスト [スクショ予定] でOK）
```

### 完了後の確認
- [ ] /cases に 1 件表示される
- [ ] /cases/case-1-claude-code-ui が読める

---

# 🚀  12：Case 2 + Case 3

## P12-1. /cases/case-2-codex-pr-review

```
【文脈】
2回目/04_content.md の Case 2。
Codex のレビューコメントを実例として載せる。

【指示】
src/content/cases/case-2-codex-pr-review.mdx を作成。
- やりたかったこと: PR で Codex に型と命名を中心にレビューさせる
- 投げた指示: PR テンプレに「Codex への指示」欄を埋めた内容
- 返ってきた結果: 実際のコメント抜粋（マスクして引用）
- 良かった点 / 微妙だった点
- 駆け出しへのアドバイス

【制約】
- 個人情報（リポジトリ名等）は適宜マスク
- Codex のコメントは引用ルールを守る
```

## P12-2. /cases/case-3-antigravity-screen-check

```
【文脈】
先週 Antigravity で作った Web アプリの体験をベースに記事化。
🟡 一部実体験なので、過剰な一般化を避ける。

【指示】
src/content/cases/case-3-antigravity-screen-check.mdx を作成。
- やりたかったこと
- 投げた指示
- 返ってきた結果
- 1 回しか試していない注意書き

【制約】
- 1 回限りの体験を「N 回使った」のように誇張しない
- スクショは安全な範囲で
```

### 完了後の確認
- [ ] /cases に 3 件表示
- [ ] バッジが正しい（Case 3 は 🟡）

---

# 🚀  13：Case 4 + 通しレビュー

## P13-1. /cases/case-4-vercel-preview

```
【文脈】
Vercel Preview の運用所感を記事化。

【指示】
src/content/cases/case-4-vercel-preview.mdx を作成。
2回目/04_content.md の Case 4 を参考に。

【制約】
- web3-portfolio での経験も併記してよい
- バッジは 🟡（このアプリでは本番昇格直前）
```

## P13-2. 通しチェック（再）

```
【文脈】
公開前の最終チェック。Day 7 の P7-1 と同じだが、今回は全 6 ページ + 7 ツール + 4 Cases が対象。

【指示】
1. 全ページのリンク健全性
2. 全ページの h1 / バッジ
3. モバイル幅での崩れ
4. アクセシビリティ通し
5. Lighthouse スコアの確認方法を提示

【制約】
- 修正は提案のみ
- 致命的 / 軽微で分ける
```

### 完了後の確認
- [ ] Lighthouse Performance 90+
- [ ] Lighthouse Accessibility 90+
- [ ] 全リンクが有効

---

# 🚀  14：本番公開

## P14-1. 本番公開準備

```
【文脈】
 14、本番ドメインへの昇格と SNS 告知準備。

【指示】
1. README.md を完成版に更新（プロジェクト紹介、スクショ、URL、ライセンス）
2. About ページの最終確認
3. SNS 告知用のテキスト案（X 用、約 280 字）を 3 案提示

【制約】
- README.md は GitHub 上で見映えする構成
- SNS 案は煽らない、誠実なトーン
```

---

# 🛠 共通：小タスク用プロンプト

## C-1. 既存コンポーネントを修正

```
【文脈】
src/components/[ComponentName].tsx を修正したい。
理由: [具体的な理由]

【指示】
[具体的な修正内容]

【制約】
- 既存の振る舞いを壊さない
- まず差分（before/after）を提示してから適用
- 関連テストがあれば一緒に更新
```

## C-2. Codex のレビュー指摘を取り込む

```
【文脈】
PR #N で Codex から以下の指摘を受けた:
[指摘の引用]

【指示】
両方を取り込んで修正。

【制約】
- 修正前後を git diff 風に提示してから適用
- 指摘の解釈に疑問があれば、先に質問
```

## C-3. デバッグ依頼

```
【文脈】
[再現手順]を踏むと、[エラー / 期待しない挙動]が発生する。

【指示】
1. 原因の仮説を 3 つ挙げる
2. それぞれの確認方法を提示
3. 私が確認した結果を見て、修正案を出す

【制約】
- 推測で修正を始めない、必ず仮説 → 確認 → 修正の順
```

## C-4. リファクタリング

```
【文脈】
src/[file] が肥大化してきた / 重複が多い。

【指示】
1. 現状の問題点を 3 行で要約
2. リファクタ案を 2〜3 個提示（トレードオフ付き）
3. 私が選んだ案で実装、ただし元の振る舞いは変えない

【制約】
- まず 1, 2 だけ実行、3 は私の承認後
- リファクタ前後でテストが通ることを確認
```

## C-5. テスト追加

```
【文脈】
src/[file] にテストが無い / 不足している。

【指示】
1. テストすべき振る舞いを箇条書きで列挙
2. それぞれ Vitest でテストケースを書く

【制約】
- 振る舞いの列挙だけ先に出して、私の承認を待つ
- モックは最小限、実物で動かせるなら実物
```

## C-6. 設計の壁打ち

```
【文脈】
[実現したい機能] を実装したいが、設計に迷いがある。
候補は [案A] / [案B] / [案C]。

【指示】
1. それぞれのメリット・デメリットを表形式で
2. 1〜2 週間という制約を踏まえた推奨案
3. 私が決めたら実装フェーズへ

【制約】
- まだコードは書かない
- 過去の決定（CLAUDE.md / 2回目/ 仕様書）と矛盾しないこと
```

---

# 🚨 危険プロンプト・避けるべきパターン

| ❌ ダメな例 | なぜダメか |
|---|---|
| 「いい感じにして」 | 主観の余地が広すぎ、的外れな結果 |
| 「全部直して」 | 無関係な箇所まで触られる |
| 「テストも書いて」（仕様なし） | 何を保証すべきか曖昧 |
| 「速くして」（指標なし） | 過剰最適化される |
| 「他の人のコードを参考に」 | ライセンス事故の元 |

## 破壊的操作の前は必ず

各プロンプトの末尾に以下を付ける習慣を:

```
【追加制約】
- ファイル削除 / 大規模書き換え / マイグレーションは、実行前に必ず差分を見せて確認を取る
- 不明点は質問してから着手
```

---

# 📋 プロンプトチェックリスト

毎回プロンプトを書く前に確認:

- [ ] 文脈（プロジェクト・目的）が書かれているか
- [ ] 指示が動詞で始まっているか
- [ ] 完了条件が明確か
- [ ] 関連する 2回目/ ファイルへの参照を入れたか
- [ ] 制約（守ること・避けること）が明記されているか
- [ ] 破壊的操作の確認手順を入れたか
- [ ] 「先に質問して」を必要なら入れたか
