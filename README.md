# naoiw Portfolio & Tech Notes

個人制作のWebアプリケーション一覧と、Markdownによる技術メモを公開する静的サイトです。

## 機能

- 制作物のカード一覧・カテゴリ絞り込み（`app/projects.json`で管理）
- 技術メモ一覧（日付の降順）と記事ページ（`content/posts/*.md`で管理）
- Markdownの見出し、リスト、リンク、画像、表、引用、コードブロック表示
- PC・スマートフォン対応。Next.js静的エクスポートによりサーバーやDBは不要
- mainの本番とdevelopの開発プレビューを1つのGitHub Pages上で公開

## 公開先

| 環境 | ポートフォリオ | 技術メモ |
| --- | --- | --- |
| main（本番） | https://naoiw.github.io/ | https://naoiw.github.io/blog/ |
| develop（プレビュー） | https://naoiw.github.io/develop/ | https://naoiw.github.io/develop/blog/ |

## 記事の書き方

`content/posts/` に `example.md` のようなファイルを追加するだけで、次のデプロイ時に
`/blog/example/` ページと記事一覧が生成されます。公開日時はファイルの作成日ではなく、
記事先頭の `date` を使用します（同日はファイル名順）。

~~~~markdown
---
title: "技術メモのタイトル"
date: "2026-11-17"
updated: "2026-11-17"
description: "一覧で表示する概要"
tags:
  - Next.js
  - TypeScript
---

## はじめに

Markdownで本文を書きます。

```ts
console.log('hello')
```
~~~~

- ファイル名は小文字英数字とハイフン（`example-post.md`）。ファイル名をURLに利用
- `title`、`date`、`description`は必須。`updated`と`tags`は任意
- 日付は`YYYY-MM-DD`、更新日を指定する場合は公開日以降
- 画像は`public/images/posts/`へ置き、Markdownでは`![説明](/images/posts/name.png)`の形式で参照
- 生HTMLは描画しません。ネストしたリスト、Markdown拡張の全構文には未対応
- 記事が不正な場合はテスト・ビルドで検出。記事の追加・削除に手動登録は不要

詳細は [開発手順](docs/DEVELOPMENT.md) を参照してください。

## 技術と開発

TypeScript / React 19 / Next.js 16 / Node.js 26 / pnpm 9 / GitHub Actions / GitHub Pages。
Markdownパーサーは外部依存を増やさない軽量実装です。

```bash
npm install --global pnpm@9
pnpm install --frozen-lockfile
pnpm test
pnpm dev
pnpm build
```

`out/`へ静的サイトを出力。develop向けの静的ビルドは
`NEXT_PUBLIC_BASE_PATH=/develop pnpm build` で確認できます。
実装は`develop`で行い、確認後に`main`向けPRを作成してマージします。

## 主なファイル

- `app/page.tsx` — 制作物トップページ
- `app/blog/page.tsx` — 記事一覧
- `app/blog/[slug]/page.tsx` — 記事詳細ページ
- `app/blog/markdown-content.tsx` — Markdown本文の描画
- `lib/posts.mjs` — メタデータ検証・日付順ソート・記事取得
- `content/posts/` — Markdown記事
- `app/components/site-layout.tsx` — 共通ヘッダー／フッター／ナビゲーション
- `app/projects.json` — 掲載作品
- `app/global.css` — 共通デザイン
- `tests/` — 作品・記事データの検証
- `docs/` — 詳細仕様・運用手順

## ドキュメント

- [仕様書](docs/SPEC.md)
- [開発・記事追加](docs/DEVELOPMENT.md)
- [デプロイ構成](docs/DEPLOYMENT.md)
- [UI共通仕様](docs/UI_CONSISTENCY.md)

## ライセンス

ソースコードは [MIT License](LICENSE) に基づき公開しています。
