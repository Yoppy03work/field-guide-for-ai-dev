# 09. Claude Code への共有メモ

## このアプリで作りたいもの

このアプリは、単なる AI ツール紹介サイトではなく、大学1年生から駆け出しジュニアエンジニアが「AI を使った開発フロー」を真似できる教材アプリとして作りたい。

授業で使った GitHub の使い方資料があるため、それを最初の学習導線として活用する。

読者は、GitHub / Issue / Branch / Pull Request / Review / Merge などにまだ慣れていない可能性がある。そのため、いきなり AI ツールの説明に入るのではなく、まず GitHub の基本を理解してから、AI 開発フローに進める構成にしたい。

## アプリの目的

読者が以下の流れを理解し、自分でも真似できるようになることを目指す。

1. GitHub Issue を立てる
2. Branch を切る
3. Claude Code に実装を依頼する
4. Pull Request を作る
5. Codex にレビューしてもらう
6. Antigravity でブラウザ確認する
7. Vercel Preview で確認する
8. Merge して公開する

## 重要な構成方針

トップページでは、いきなりツール一覧を見せるのではなく、「まずはここから」として GitHub 入門と AI 開発フローの全体像に誘導する。

ツール紹介は主役ではなく、ワークフローの各ステップで使う道具として扱う。

各ツールの位置づけは以下。

| ツール | 役割 |
|---|---|
| GitHub | Issue / Branch / Pull Request / Review / Merge の管理 |
| Claude Code | 実装担当 |
| Codex | PR レビュー担当 |
| Antigravity | ブラウザでの実表示確認 |
| Vercel | Preview / 本番デプロイ |
| 他 AI | 文章校正、要約、比較、補助的な相談 |

特に大事なのは、ツール紹介を主役にしないこと。

このアプリの主役は「AI ツール一覧」ではなく、「AI を開発フローのどこに差し込むか」である。

## 推奨ページ構成

```text
/
├── まずはここから
│   └── GitHub の基本と AI 開発の流れ
├── /learn/github
│   └── GitHub 入門
├── /workflow
│   └── Issue → Branch → PR → Review → Deploy
├── /tools
│   └── Claude Code / Codex / Antigravity / GitHub / Vercel / 他 AI
├── /tools/[tool]
│   └── 各ツールの使いどころ・試した機能・効果・注意点
├── /cases
│   └── 実際にこのアプリを作った記録
└── /about
    └── 授業課題としての目的・使った技術
```

## `/learn/github` の方針

大学1年生でも読めるように、専門用語には必ず「ひとことで言うと」を付ける。

例：

| 用語 | ひとことで言うと |
|---|---|
| Repository | プロジェクトを置く場所 |
| Issue | やることメモ |
| Branch | 作業用の分岐 |
| Pull Request | 変更を見てもらう提出箱 |
| Review | 変更内容の確認 |
| Merge | 本番の流れに合流させること |

内容の順番は以下。

1. GitHub って何？
2. リポジトリとは？
3. Issue とは？
4. Branch とは？
5. Pull Request とは？
6. Review とは？
7. Merge とは？
8. Vercel Preview で確認するとは？
9. AI 開発ではどこで Claude Code / Codex / Antigravity を使う？

## 具体例として通すミニ課題

抽象説明だけで終わらせず、1つの小さな例を最後まで通す。

例：

```text
Issue: トップページに自己紹介カードを追加する
Branch: feature/profile-card
Claude Code: 実装を依頼する
PR: 変更内容を提出する
Codex: レビューしてもらう
Antigravity: 画面を見てもらう
Vercel: Preview URL で確認する
Merge: 完成したら main に入れる
```

この流れを見せることで、読者が GitHub と AI ツールの関係を理解しやすくなる。

## `/workflow` の方針

`/workflow` は、このアプリの中心ページとして扱う。

単に GitHub の操作を説明するのではなく、開発の流れの中で AI をどこに使うかを説明する。

```text
Issue を立てる
↓
Branch を切る
↓
Claude Code に実装を依頼する
↓
PR を作る
↓
Codex にレビューしてもらう
↓
Antigravity で画面確認する
↓
Vercel Preview で確認する
↓
Merge して公開する
```

各ステップには以下を入れる。

- 何をするのか
- なぜ必要なのか
- 初心者がハマりやすいところ
- AI ツールをどう使うのか
- 自分で試すための小さな課題

## `/tools` の方針

`/tools` はツール図鑑として作るが、説明の中心は「すごい機能紹介」ではなく「どの場面で使うか」にする。

各ツールページに入れたい内容は以下。

1. このツールをひとことで言うと
2. 開発フローのどこで使うか
3. 実際に試したこと
4. 効果があったこと
5. 微妙だったこと
6. 駆け出しが最初に試すなら何をするか
7. 関連する Case / Issue / PR

## `/cases` の方針

`/cases` では、このアプリ自体を作る過程を教材にする。

各ケースは以下の形にする。

```text
やりたかったこと
使った AI / ツール
実際に投げた指示
返ってきた結果
良かった点
微妙だった点
駆け出しへのアドバイス
関連 Issue / PR
```

例：

- Case 1: Claude Code に UI 実装を任せた
- Case 2: Codex に PR レビューさせた
- Case 3: Antigravity に画面確認させた
- Case 4: Vercel Preview で確認した

## 授業資料を使うときの注意

授業で使った GitHub 資料をそのまま外部公開する場合は、公開してよい資料か確認する。

公開が難しい場合は、授業資料をベースに自分の言葉で再構成する。

その場合も、内容は大学1年生が読めるように、短い説明と具体例を中心にする。

## 最初に作る MVP

最初は以下に絞る。

1. トップページ
2. `/learn/github`
3. `/workflow`
4. `/tools`
5. `/cases`
6. `/about`

以下は後回しでよい。

- Pagefind
- RSS
- ダークモード
- 記事別 OG 画像
- 細かいアニメーション
- 高度な検索や絞り込み

## 目指す読後感

読者が読み終わったあとに、次のように思える状態を目指す。

> GitHub Issue を1つ立てて、AI に実装を頼み、PR レビューを受けて、Vercel で公開する流れを自分でも試せそう。

この読後感を作るために、専門用語の説明、具体例、実際の制作ログを重視する。

