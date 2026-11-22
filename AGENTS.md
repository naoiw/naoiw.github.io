<!-- naoiw:managed:start -->
# naoiw 共通AI開発規約（管理領域）

**特別な指示がない場合は naoiw/.github の開発規約を既定値として適用する。**
優先順位は (1)今回のユーザー指示 (2)このリポジトリ固有のREADME/docs/設定/既存実装 (3)naoiw/.githubの標準。すべて確認できない場合は推測せず未確認と報告する。

共通規約原本:
- https://github.com/naoiw/.github/blob/main/standards/AI_DEVELOPMENT.md
- https://github.com/naoiw/.github/blob/main/standards/GITHUB_FLOW.md
- https://github.com/naoiw/.github/blob/main/standards/TECH_STACK.md
- https://github.com/naoiw/.github/blob/main/standards/UI_STYLE.md
- https://github.com/naoiw/.github/blob/main/standards/REPOSITORY_STRUCTURE.md

## 守ること
1. 着手前に関連Issue・PR・ブランチ、README/docs、既存実装を調べ、重複作業を避ける。
2. mainは本番。原則短命ブランチ→PR→関連テスト/ビルド→ユーザーが認めたマージ。developは既に存在し用途が明示された場合だけ使用する。
3. 「Issueのみ」「実装しない」「mainにマージしない」「developだけ」などの範囲指定を優先する。
4. 依存・ライセンス・CSS・構成は個別プロジェクトの既存方針を勝手に変更しない。
5. アプリUIに開発状況・次のTODO・GitHubリンク等を依頼なく追加しない。
6. 未実施の検証を成功と報告しない。差分、PR、残課題、公開状態を明示する。
7. 参考ファイルや機密情報をPRへ混入させず、mainの差分を確認する。
8. **新規Reactアプリはpnpmを標準**とする（現行雛形は9.14.2、`pnpm-lock.yaml`）。既存アプリのnpm/pnpm/yarnは変更しない。

これは同期される指示の抜粋。詳細は上記の原本を参照する。外部リンクを取得できないAIは、取得済みと主張せずこの抜粋と対象リポジトリの規約を優先する。
<!-- naoiw:managed:end -->

## リポジトリ固有の指示
<!-- このセクションは同期ツールが変更しません。プロジェクト固有の設計・コマンド・例外を記載してください。 -->

## naoiw.github.io 固有の指示

- 本サイトは React / Next.js 16 の静的エクスポート。Viteへ移行したり react-vite-template のアプリ実装をコピーしたりしない。
- `main` は本番 https://naoiw.github.io/、`develop` はプレビュー https://naoiw.github.io/develop/。短命の作業ブランチ → develop向けPR・CI・プレビュー確認 → ユーザー承認後に develop → main のPRで公開する。
- 作品の管理は `app/projects.json`、カテゴリーは `app/projects.ts`、検証は `tests/projects.test.mjs` を参照する。
- ブログは `content/posts/*.md` から静的生成する。関連仕様は `docs/SPEC.md` と `docs/DEVELOPMENT.md` を優先する。
- `Validate develop` は共有Node CIに加え、Next.jsの `/develop` 向けビルドを検証する。workflow_runのトリガーに使われているため**ワークフロー名を変更しない**。
- `deploy.yml` は本番ルートと `/develop/` を同一Pagesアーティファクトとして公開する。Vite専用 `reusable-vite-pages.yml` に置き換えない。
- 変更に応じて `pnpm test`、`pnpm build`、`NEXT_PUBLIC_BASE_PATH=/develop pnpm build` を確認する。未確認の検証を成功と報告しない。
- 既存のpnpm運用・CSS・ライセンス・本番URL・コンテンツ構造を無断変更しない。
