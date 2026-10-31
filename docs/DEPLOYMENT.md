# GitHub Pagesへの公開

## 構成

このリポジトリは`naoiw.github.io`のユーザーページ（ルートサイト）として配信する。Next.jsを`output: 'export'`で静的出力し、本番`/`とプレビュー`/develop/`を同じGitHub Pagesアーティファクトへまとめる。

| 環境 | ブランチ | URL | ビルド時のbasePath |
| --- | --- | --- | --- |
| 本番 | `main` | https://naoiw.github.io/ | 空文字（ルート） |
| 開発プレビュー | `develop` | https://naoiw.github.io/develop/ | `/develop` |

参照: `sudoku-solver`、`switchbot-logger`と同じ、検証ワークフローからデプロイワークフローを起動する方式。

## ワークフロー

- `.github/workflows/validate-develop.yml` — `develop`へのpushまたはPRでテスト、`/develop`向けビルド、静的資材のパス検証を実施。Pagesの公開権限は付与しない。
- `.github/workflows/deploy.yml` — デフォルトブランチの`main`で起動。`main`へのpush、検証済みの`develop`へのpush、`main`選択の手動実行で、本番とプレビューの両方を同じアーティファクトに格納しデプロイする。

| イベント | 検証 | デプロイ |
| --- | --- | --- |
| `develop`へのpush | 成功時に通知 | 本番と開発版をまとめて公開 |
| `main`宛のPR | 検証のみ | しない |
| `main`へのpush（マージ後） | デプロイ前に検証 | 本番と開発版をまとめて公開 |
| Actionsの手動実行 | デプロイ前に検証 | `main`選択時のみ |

## ビルドと配置

1. `main`と`develop`（検証成功の`head_sha`）を別々にチェックアウト。
2. 本番は`pnpm build`、開発版は`NEXT_PUBLIC_BASE_PATH=/develop pnpm build`で静的ビルド。
3. `production/out/`の内容を公開アーティファクトのルートへ、`preview/out/`の内容を`develop/`以下へコピー。
4. `publish/.nojekyll`を置き、`_next/`の静的アセットがGitHub Pagesで配信されるようにする。
5. `publish/index.html`と`publish/develop/index.html`およびプレビュー内の`/develop/_next/`参照を検証する。
6. 単一の`github-pages`環境で`actions/deploy-pages`を実行する。

`workflow_run`のトリガーは、成功した同一リポジトリの`develop` pushのみを採用する。PRの検証結果では公開しない。デプロイの多重実行を防ぐため、Pagesワークフローはconcurrencyを共有する。

## 初回確認

1. リポジトリのSettings → PagesでSourceを`GitHub Actions`にする。
2. `main`へ新しいワークフローをマージする（`workflow_run`はデフォルトブランチの定義を使う）。
3. `main`へのpushによるデプロイが成功したことを確認する。
4. `https://naoiw.github.io/`、`https://naoiw.github.io/develop/`双方のHTMLとJS/CSSが読み込めるか確認する。
5. 次に`develop`のみを変更・pushし、検証成功後に`/develop/`だけ内容が新しくなることを確認する。

## 運用上の注意

- `naoiw.github.io`はGitHub Pagesのルートサイト。子リポジトリの`/sudoku-solver/`等のProject PagesとURL構造が異なる。
- 本番サイトとプレビューは独立したビルドを統合する。Preview側のNext.js `basePath`設定がないと、`_next/`が本番の資材を参照するため、`NEXT_PUBLIC_BASE_PATH`でビルド時に切り替える。
- プレビューHTMLには`noindex`を付与し、検索エンジンに開発版をインデックスさせない。
- Pagesへの更新では毎回1つのアーティファクトを置き換える。実行時は本番版と開発版の両方が含まれるため、どちらか一方が消えることはない。
- 旧`/blog/`などの削除ページは新しく配信されず、以後のリンクを持たない。
