# GitHub Pagesへの公開

## 構成

このリポジトリは`naoiw.github.io`のユーザーページ（ルートサイト）として配信する。Next.jsを`output: 'export'`で静的出力し、`out/`をPagesにアップロードする。

ワークフロー: `.github/workflows/deploy.yml`

| イベント | テスト・ビルド | 公開 |
| --- | --- | --- |
| `develop`へのpush | 実行 | しない |
| `main`宛のPR | 実行 | しない |
| `main`へのpush | 実行 | GitHub Pagesへ反映 |
| Actionsの手動実行 | 実行 | `main`選択時のみ |

## 初回確認

1. リポジトリのSettings → PagesのSourceを`GitHub Actions`にする。
2. ワークフローでpnpm 9 / Node.js 22を使用する。
3. `pnpm install --frozen-lockfile`、`pnpm test`、`pnpm build`の成功を確認する。
4. `out/.nojekyll`を用意し、Next.jsの`_next`資材を配信する。
5. `https://naoiw.github.io/`のカード・リンクとスマートフォン表示を確認する。

## 運用上の注意

- `naoiw.github.io`はGitHub Pagesのルートサイト。子リポジトリの`/sudoku-solver/`等のProject PagesとURL構造が異なる。
- 本番サイト全体の静的ファイルをこのワークフローでアップロードする。別リポジトリの公開物はそれぞれのGitHub Pagesで管理する。
- このリポジトリでは`develop`の別URLへのデプロイをしない。必要になった時点でルートサイトとの共存を設計する。
- 旧`/blog/`などの削除ページは新しく配信されず、以後のリンクを持たない。
