# naoiw Portfolio

個人で制作・公開しているWebアプリケーションの一覧サイトです。ブログを持たない1ページ構成で、作品カードから公開アプリとGitHubリポジトリへ移動できます。

## 主な機能

- 作品をカード形式で一覧表示
- ダッシュボード・ツール・実験のカテゴリで絞り込み
- PC（3列/2列）・スマートフォン（1列）のレスポンシブレイアウト
- GitHub Pages向け静的サイト、各作品の登録はJSON編集のみ

## 公開先

- 本番: https://naoiw.github.io/ （`main` ブランチ）
- ソースコード: https://github.com/naoiw/naoiw.github.io

## 技術スタック

- **TypeScript / React 19 / Next.js 16** — 画面・静的サイト生成
- **CSS** — レスポンシブデザイン
- **Node.js 22 / pnpm 9** — 開発・テスト・ビルド
- **GitHub Actions / GitHub Pages** — 検証・デプロイ

## ローカル開発

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev     # ローカル開発
pnpm test    # 作品データの検証
pnpm build   # 静的ファイルを out/ に生成
```

`pnpm dev` で起動した開発サーバーのURLをブラウザで開きます。`out/` は生成物でGit管理しません。

## ブランチ運用

1. 変更は `develop` ブランチで行い、`main` は本番公開用とします。
2. `develop` へのpushとPull Requestではテストとビルドのみ実行します。
3. 本番反映は **`develop` → `main` のPull Request** で行います。マージ後も `develop` を残し、`main` と同期します。
4. `main` の更新時のみGitHub Pagesへ公開します。開発用の別URLは現時点では設けません。

## ディレクトリ構成

- `app/page.tsx` — 1ページのトップ画面
- `app/components/project-gallery.tsx` — カードとカテゴリ切り替え
- `app/projects.json` — 掲載作品のデータ
- `app/projects.ts` — 作品データの型とカテゴリ定義
- `app/global.css` — 共通・レスポンシブスタイル
- `tests/` — 作品データのバリデーション
- `.github/workflows/` — 検証と公開
- `docs/` — 仕様・開発・デプロイの詳細

## ドキュメント

- [画面・作品データ仕様](docs/SPEC.md)
- [開発・作品追加手順](docs/DEVELOPMENT.md)
- [デプロイ構成](docs/DEPLOYMENT.md)
