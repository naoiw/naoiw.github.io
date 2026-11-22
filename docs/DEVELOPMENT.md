# 開発・作品追加

## 環境

Node.js 26、pnpm 9、Next.js 16を使用。`develop`から短命の作業ブランチを作り、PRで`develop`へ統合する。`main`への反映は別PRで行う。

```bash
npm install --global pnpm@9
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
```

`pnpm build`はNext.jsの静的エクスポートを作成し、`out/`にHTML・CSS・JSを生成する。

## 共通ルール・ブランチ運用

- 優先順位は（1）今回のユーザー指示、（2）このリポジトリのREADME/docs/設定、（3）[naoiw/.github](https://github.com/naoiw/.github) の共通規約。
- [react-vite-template](https://github.com/naoiw/react-vite-template) はAI指示・共通CI・Dependabotの運用参考であり、既存Next.jsサイトをViteに変更しない。
- `AGENTS.md`、Copilot、Cursorの管理領域を共通原本から導入。`AGENTS.md` の本サイト固有指示は同期対象外として保持する。
- AIルール更新は `main` のActions `Sync naoiw AI rules` を手動実行し、生成されるPRで確認する。自動的な定期同期は無効。
- 同期PRの自動作成には Settings → Actions → General の「Allow GitHub Actions to create and approve pull requests」が必要。許可されないときは手動PRで対応。
- Dependabotはpnpmの `package.json` / `pnpm-lock.yaml` を `npm` エコシステムとして扱い、GitHub Actionsも月次確認する。minor/patchのみグループ化、majorは個別PRで確認。自動マージなし。
- Settings → Rules → Rulesets でmain/developへのPR必須、CI必須、強制push禁止等の設定を推奨。**コミットした設定ファイルだけでGitHubのRulesetsは適用されない**。必要なチェック名は実際のChecks画面で確認する。

開発フロー:
1. 関連Issue/PR・ブランチを確認し、最新の `develop` を基点に短命ブランチを作成。
2. テスト・ビルド後に `develop` 宛PRを作成し `Validate develop` を実行。
3. マージ後の `/develop/` プレビューを確認。
4. `develop` → `main` の別PRで差分とCIを確認し、ユーザーのマージ許可を得てから公開。

## 開発プレビューの確認

`develop`にpushすると、`Validate develop`ワークフローがテストと`/develop`向けのビルドを実行する。成功後、`main`に置かれた`Deploy to GitHub Pages`ワークフローが、本番と開発版の両方をビルドして公開する。

- 本番: https://naoiw.github.io/
- 開発版: https://naoiw.github.io/develop/

ローカルで`/develop/`配下のビルドを確認する場合は、ビルド時に`NEXT_PUBLIC_BASE_PATH=/develop`を設定する。

```bash
NEXT_PUBLIC_BASE_PATH=/develop pnpm build
```

Windows PowerShellでは`$env:NEXT_PUBLIC_BASE_PATH='/develop'; pnpm build`とする。通常のルート向けビルドでは環境変数を設定しない。

## 作品を増やす

1. 公開先のHTTPS URLとGitHubリポジトリURLを確認する。
2. `app/projects.json`にオブジェクトを1件追加する。表示順は配列順。
3. タイトル・説明・カテゴリ・略号を設定する。開発中の補足は任意の`status`で表す。
4. `pnpm test`と`pnpm build`を実行し、PC・スマートフォン幅で表示を確認する。
5. 作業ブランチから`develop`宛のPRを作成し、検証・プレビュー確認後に`main`への反映を判断する。

新しい分類を増やす場合は、`app/projects.ts`の型・ラベル定義、`app/global.css`のカード配色、`tests/projects.test.mjs`の許容カテゴリ、`docs/SPEC.md`の仕様も同時に更新する。

## 表示の修正

- 画面レイアウト: `app/page.tsx`
- カテゴリ選択・絞り込み: `app/components/project-gallery.tsx`
- カード表示・公開先リンク: `app/components/project-card.tsx`
- 作品型・カテゴリ表示名: `app/projects.ts`
- 本番・プレビューのURL/パス定義: `app/site-config.ts`
- 配色・列数・ブレークポイント: `app/global.css`

カード全体をリンクで囲って別のリンクを内包することは避け、アプリとソースは独立したリンクにしている。

## チェック

- スマホで左右に横スクロールしないこと
- フィルター切替後もリンク先と件数が正しいこと
- キーボードだけでフィルター・リンクにアクセスできること
- 重複した作品ID・URLがないこと
- `/develop/`でJS・CSSが `/develop/_next/` から取得されること
- ブログ一覧・記事ページのリンクが本番／プレビュー双方で正しいこと


## 技術メモを追加・更新する

1. `content/posts/` に `my-note.md` を作成する（slugは小文字英数字とハイフンのみ）。
2. 先頭にFront Matterの`title`、`date`、`description`を書き、必要なら`updated`と`tags`を追加する。
3. 本文はMarkdownで記載。見出し・段落・強調・リスト・表・引用・リンク・画像・コードブロックに対応。
4. `pnpm test`と`pnpm build`で確認し、短命ブランチから`develop`宛にPRを作成する。
5. `https://naoiw.github.io/develop/blog/`から記事を確認して、承認後に`main`へマージする。

```markdown
---
title: "記事タイトル"
date: "2026-11-17"
description: "短い概要"
tags:
  - Next.js
  - Markdown
---

## 本文の見出し

本文を書きます。
```

- ファイル名で記事URLが決まる。タイトルを変更してもURLを変えたくなければファイル名を維持する
- 日付は明示した`date`順。`updated`は更新表示とサイトマップの更新日時に使う
- 画像を記事内に表示するなら`public/images/posts/`に置き、`![代替テキスト](/images/posts/example.png)`で参照
- 記事を消すと次の静的ビルドからURLもなくなる
- 外部Markdownライブラリは未導入。生HTMLやネストしたリストなど複雑な構文は非対応
- サーバー・DB・GitHub APIは不要。GitHub ActionsがbuildしたHTMLを配信する
