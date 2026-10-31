# naoiw Portfolio

個人で制作・公開しているWebアプリケーションの一覧サイトです。ブログを持たない1ページ構成で、作品カードから公開アプリとGitHubリポジトリへ移動できます。

## 主な機能

- 作品をカード形式で一覧表示
- ダッシュボード・ツール・実験のカテゴリで絞り込み
- PC（3列/2列）・スマートフォン（1列）のレスポンシブレイアウト
- GitHub Pages向け静的サイト、各作品の登録はJSON編集のみ

## 公開先

| 環境 | ブランチ | URL |
| --- | --- | --- |
| 本番 | `main` | https://naoiw.github.io/ |
| 開発プレビュー | `develop` | https://naoiw.github.io/develop/ |

本番と開発プレビューは、1つのGitHub Pagesサイト（`github-pages`環境）の別々のパスで公開します。開発版へのpush後、検証成功を条件に両方をビルドして再デプロイします。

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

1. 通常の変更は `develop` ブランチで行い、`main` は本番公開用とします。
2. `develop` へのpushはテストとプレビュー用ビルドを実行し、成功すると `main` 側のデプロイワークフローが起動します。
3. デプロイ時には `main` をルート `/`、検証済みの `develop` を `/develop/` に配置し、**1つのGitHub Pagesサイトとして公開**します。
4. 本番反映は **`develop` → `main` のPull Request** で行います。PRでは検証のみ実行し、デプロイしません。
5. マージ後も `develop` は残し、`main` と同期して使います。

## ディレクトリ構成

- `app/page.tsx` — 1ページのトップ画面
- `app/components/project-gallery.tsx` — カテゴリ切り替えと一覧
- `app/components/project-card.tsx` — 作品カードの表示
- `app/projects.json` — 掲載作品のデータ
- `app/projects.ts` — 作品データの型とカテゴリ定義
- `app/site-config.ts` — 共通サイトURLと開発プレビューのパス
- `app/global.css` — 共通・レスポンシブスタイル
- `tests/` — 作品データのバリデーション
- `.github/workflows/` — `develop`検証と本番・プレビュー統合デプロイ
- `docs/` — 仕様・開発・デプロイの詳細

## ドキュメント

- [画面・作品データ仕様](docs/SPEC.md)
- [開発・作品追加手順](docs/DEVELOPMENT.md)
- [デプロイ構成](docs/DEPLOYMENT.md)
