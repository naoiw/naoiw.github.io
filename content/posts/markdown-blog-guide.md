---
title: "Markdownで技術メモを書く"
date: "2026-11-17"
updated: "2026-11-17"
description: "Markdownファイルの追加からGitHub Pagesでの公開まで、ブログ機能の使い方を紹介します。"
tags:
  - Next.js
  - Markdown
  - GitHub Pages
---

この技術メモは、リポジトリ内の **Markdownファイル** から生成されています。

## 記事の追加方法

1. `content/posts/` に `your-article.md` を追加します。
2. 冒頭に `title`・`date`・`description` を記載します。
3. `develop` にPushすると、検証後にプレビューサイトへ反映されます。

ファイル名がそのまま記事URLになります。たとえば `example.md` は `/blog/example/` で公開されます。

## コードブロック

```ts
const published = new Date('2026-11-17')
console.log(published.toISOString())
```

## 表の例

| 項目 | 内容 |
| --- | --- |
| 保存場所 | `content/posts/` |
| 表示順 | 公開日の新しい順 |
| ページ | 静的HTMLを自動生成 |

> ブログ記事はGitHub Pages上で静的に配信されるため、サーバーやデータベースは不要です。

記事の記述ルールは [開発ドキュメント](https://github.com/naoiw/naoiw.github.io/blob/develop/docs/DEVELOPMENT.md) にまとめています。
