# 02. 計画書（Day 単位スケジュールと進め方）― v2

> **v2 改訂**: `09_claude-brief.md` を反映。MVP を 6 ページに絞り込み、
> `/learn/github` と `/workflow` に厚く時間を割く構成に再編。
> ブログ B1〜B4 は `/cases` に置換。Pagefind/RSS/ダーク等は Phase 2 へ。

## 全体方針

- **入口は `/learn/github`、中心は `/workflow`、教材は `/cases`**
- **ツールページは脇役**（使いどころ中心、過剰に深掘りしない）
- **Issue → PR → マージ運用** で全作業を進め、その過程を `/cases` に記録
- **MVP 主義**: 1〜2 週間で 6 ページを完成させ、副次機能は後送り

## 役割分担

| ツール | 役割 | 利用タイミング |
|---|---|---|
| Claude Code | 実装、テスト、初稿コミット | 各 Issue に対して |
| GitHub Copilot | エディタ内補完 | コーディング中 |
| Codex | PR の自動コードレビュー | PR 提出時 |
| Antigravity | ブラウザでの実表示確認 | レビュー後半 |
| Gemini など | 文章校正、要約、補助 | Cases 執筆時 |
| Vercel | プレビュー / 本番デプロイ | PR ごと自動 |

## 14 Day スケジュール

### Week 1：骨組みと中核ページ

#### Day 1：プロジェクト初期化
- [ ] GitHub リポジトリ作成（Public）
- [ ] Vercel プロジェクト作成、リポジトリ連携、プレビュー有効化
- [ ] `.gitignore` / `README.md` / `LICENSE`
- [ ] Issue / PR テンプレを `.github/` 配下に配置
- [ ] **CLAUDE.md** に方針メモを置く（`09_claude-brief.md` の要点）
- [ ] 最初の Issue（#1: プロジェクト雛形）を起票

#### Day 2：Next.js 雛形
- [ ] `create-next-app` で Next.js 16 + TypeScript + Tailwind v4
- [ ] MDX 連携（`@next/mdx` + `gray-matter`）
- [ ] 共通 Layout（Header / Footer）
- [ ] StatusBadge / 用語ハイライト用コンポーネントの最小実装
- [ ] PR #1 → Codex レビュー → マージ

#### Day 3：`/learn/github` 雛形（前半 4 セクション）
- [ ] `/learn/github` ページとセクション分割
- [ ] 1. GitHub って何？ / 2. リポジトリ / 3. Issue / 4. Branch
- [ ] 用語に「ひとことで言うと」を全て付ける
- [ ] PR #2 → レビュー → マージ

#### Day 4：`/learn/github` 後半 + ミニ課題
- [ ] 5. PR / 6. Review / 7. Merge / 8. Vercel Preview / 9. AI ツールの差し込み
- [ ] **ミニ課題**: 「自己紹介カードを追加する」を最後に通す
- [ ] PR #3 → レビュー → マージ

#### Day 5：`/workflow` 中心ページ
- [ ] 8 ステップ（Issue → Branch → Claude Code → PR → Codex → Antigravity → Vercel → Merge）
- [ ] Mermaid 図で全体可視化
- [ ] 各ステップに：何 / なぜ / ハマりどころ / AI の使い方 / 試す課題
- [ ] PR #4 → レビュー → マージ

#### Day 6：トップ + About
- [ ] `/` ホームページ（「まずはここから」誘導 + ワークフロー要約 + 7 ツール早見 + 最新 Cases）
- [ ] `/about` ページ
- [ ] PR #5 → レビュー → マージ

#### Day 7：Week 1 振り返り + デプロイ
- [ ] Antigravity で全ページの動作確認
- [ ] アクセシビリティ・モバイルの最終確認
- [ ] Vercel 本番ドメインへ昇格
- [ ] Week 1 振り返りメモ → これが **Case 1 の素材**

### Week 2：ツール詳細と Cases

#### Day 8：`/tools` 一覧 + GitHub / Claude Code 詳細
- [ ] `/tools` 一覧ページ
- [ ] `/tools/github` （🟢）
- [ ] `/tools/claude-code` （🟢）
- [ ] PR #6 → レビュー → マージ

#### Day 9：Codex / Copilot / 他 AI 詳細
- [ ] `/tools/codex` （🟢）
- [ ] `/tools/copilot` （🟢）
- [ ] `/tools/other-ai` （🔵）
- [ ] PR #7 → レビュー → マージ

#### Day 10：Antigravity / Vercel 詳細
- [ ] `/tools/antigravity` （🟡）
- [ ] `/tools/vercel` （🟡）
- [ ] PR #8 → レビュー → マージ

#### Day 11：`/cases` 雛形 + Case 1（Claude Code に UI 実装を任せた）
- [ ] `/cases` 一覧ページ
- [ ] `/cases/case-1-claude-code-ui` 執筆
- [ ] PR #9 → Codex/Gemini レビュー → マージ

#### Day 12：Case 2 + Case 3
- [ ] `/cases/case-2-codex-pr-review`（🟢）
- [ ] `/cases/case-3-antigravity-screen-check`（🟡）
- [ ] PR #10, #11 → レビュー → マージ

#### Day 13：Case 4 + 通しレビュー
- [ ] `/cases/case-4-vercel-preview`（🟡）
- [ ] Antigravity で全ページの最終巡回
- [ ] Codex で全コード最終レビュー
- [ ] Lighthouse 90+ 確認
- [ ] アクセシビリティ最終確認

#### Day 14：公開とフィードバック
- [ ] 本番公開
- [ ] SNS で告知
- [ ] 駆け出しエンジニアにフィードバックをもらう
- [ ] 振り返り → 次スプリント Issue を起票

## マイルストーン

| マイルストーン | 期日 | 完了条件 |
|---|---|---|
| M1: 雛形稼働 | Day 2 | プレビュー URL でレイアウトが見える |
| M2: GitHub 入門完成 | Day 4 | `/learn/github` が読み切れる |
| M3: ワークフロー完成 | Day 5 | `/workflow` で 8 ステップが伝わる |
| M4: Week 1 リリース | Day 7 | 本番ドメインで主要 4 ページ |
| M5: ツール 7 本完成 | Day 10 | `/tools/*` が全て埋まる |
| M6: Cases 4 本完成 | Day 13 | `/cases/*` が 4 本揃う |
| M7: 本番公開 | Day 14 | Lighthouse 90+ で公開、SNS 告知 |

## リスクと対策

| リスク | 影響 | 対策 |
|---|---|---|
| `/learn/github` が冗長になる | 駆け出しが離脱 | 「ひとことで言うと」と「具体例」だけで通す、深掘りは外部リンク |
| `/workflow` が抽象的すぎる | 真似できない | 必ず Case と紐付ける、ミニ課題を 1 つ通す |
| Cases の素材不足 | Case 4 本書けない | Day 7 までの作業ログを毎日メモ |
| ツール7本書ききれない | 公開遅延 | Gemini / 他 AI ページは🔵で薄く済ませる |
| Antigravity 体験記の素材不足 | Case 3 が薄い | 実際に何度か Antigravity を使ってログを残す |
| 1〜2 週間で全部終わらない | 公開遅延 | Pagefind/RSS/ダーク等は Phase 2、ツールページの薄さは許容 |

## 第 1 期完了サマリ（PR #1〜#15）

第 1 期の MVP は 1 日で 16 ルートまで実装、Vercel 公開、a11y polish まで完了。
詳細は [README.md](../README.md#制作経過) と [/cases](https://field-guide-for-ai-dev.vercel.app/cases) を参照。

## 第 2 期完了サマリ（PR #16〜#25、合言葉「次の一歩を踏める」）

| Phase | PR | 概要 | merge |
|---|---|---|---|
| 0 | #16 | Codex PR #9 P1 critical 修正（`Object.hasOwn`） | ✅ |
| 1 | #17 | AX foundation（CLAUDE / AGENTS / CONTRIBUTING / 15_components / 16_content-recipe / PR template） | ✅ |
| 2 | #18 | UX core 5 components（Callout / RelatedPages / Breadcrumb / CodeBlock / ReadingTime）+ Codex P1/P2 ×4 対応 | ✅ |
| 3 | #19 | `/tutorials/` 骨組み + 3 tutorial 雛形 + TutorialFrontmatter | ✅ |
| 4 | #20 | GitHub 2 ページ厚塗り（`/tutorials/github` 270 行 / `/learn/github` 338 行） | ✅ |
| 5 | #21 | Vercel + Antigravity の tutorial / tools 厚塗り | ✅ |
| 6 | #22 | `/workflow` 厚塗り（251 → 432 行） | ✅ |
| 7 | #23 | `/cases` 4 本厚塗り（プロンプト全公開 + Lessons + 再現手順） | ✅ |
| 8 | #24 | 残り 5 ツール厚塗り（共通 4 ブロック） | ✅ |
| 9 | #25 | Home（推奨ルート + FAQ + ミニ課題 CTA）+ About タイムライン + 一覧 Breadcrumb | ✅ |

第 2 期で達成したこと：
- 教材ページに **共通 4 ブロック**（ひとこと / まずやる / 失敗 / 次へ）
- ページ間の **役割分担**（`/learn` 概念、`/tutorials` 操作、`/tools` フローの中で、`/cases` 実例）
- **`/tutorials` サブツリー**（GitHub / Vercel / Antigravity の 3 ハンズオン、各 15〜35 分）
- **AX 基盤**（CLAUDE / AGENTS / CONTRIBUTING / 15_components / 16_content-recipe）
- **UX core 5 components**（Callout / RelatedPages / Breadcrumb / CodeBlock / ReadingTime）
- 全 PR で **Codex レビュー対応運用**（PR description に「対応済み / 対応しない理由 / Issue 化」を明記）

## Phase 3（後送り、公開後にやりたいこと）

- AnchorHeading（h2/h3 ホバー `#`）
- Reading progress バー
- Pagefind 全文検索
- 動的 OG 画像（next/og + 日本語 font）
- ダークモード
- ツール比較表ページ
- 多言語対応（英語版）
- 読者からのフィードバック反映
- Cases の追加（毎週 1 本ペース）
- Antigravity を本サイトで実運用 → Case 3 を 🟡 → 🟢 に

## ハッカソン GitHub 資料の扱い

- 公開可否を確認した上で、`/learn/github` の **下敷き**として使う
- そのまま転載はしない
- 大学1年生が読めるように、自分の言葉で書き直し
- 出典を About に明記
