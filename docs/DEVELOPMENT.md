# 開発・作品追加

## 環境

Node.js 22、pnpm 9、Next.js 16を使用。変更前に`main`の最新状態を取り込み、`develop`で作業する。

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
```

`pnpm build`はNext.jsの静的エクスポートを作成し、`out/`にHTML・CSS・JSを生成する。

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
5. `develop`で変更し、`main`向けPRを作成する。

新しい分類を増やす場合のみ、`app/projects.ts`の型・ラベル定義とCSSの対応を追加する。

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
- ブログ・RSS・タグの新しいリンクが残っていないこと
