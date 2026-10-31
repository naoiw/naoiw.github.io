# サイト共通UIガイド

対象: `naoiw.github.io`、`market-tracker`、`switchbot-logger`、`big3-record`、`sudoku-solver`。

5つの独立したサイトで、ヘッダー・フッター・ページ幅などの基本的な見栄えを揃えるための基準です。配色、ロゴの意匠、グラフや数独の盤面などアプリ固有のUIは対象外です。

## 共通デザイントークン

各リポジトリのルートCSS（下表）には、同じ `--chrome-*` カスタムプロパティを定義しています。共通部分を変更するときは、**5リポジトリを同時に確認・更新**してください。

| トークン | 値 | 用途 |
| --- | --- | --- |
| `--chrome-font` | `Inter, "Noto Sans JP", "Hiragino Kaku Gothic ProN", Meiryo, system-ui, sans-serif` | フォント |
| `--chrome-width` | `1180px` | ページ最大幅 |
| `--chrome-gutter` | `28px`（620px以下: `17px`） | ページ左右の余白 |
| `--chrome-header-height` | `78px`（620px以下: `67px`） | ヘッダー最小高さ |
| `--chrome-brand-size` | `16px` | ヘッダーのサイト名 |
| `--chrome-caption-size` | `11px` | ヘッダーの補助ラベル |
| `--chrome-footer-size` | `12px` | フッターの文字 |

## 共通の見せ方

- サイト名は原則 `font-weight: 800`、`letter-spacing: .02em`。ブランドアイコンは36×36pxを基準にする。
- ヘッダーとフッターの区切り線は残し、線色は各サイトのテーマに合わせる。
- **区切り線は画面端・ページコンテナ端まで伸ばさず、コンテンツの内側に引く。** 最大幅1180pxのコンテナから左右 `--chrome-gutter` ずつ内側の位置を両端とする（PC 28px / 幅620px以下 17px）。
- ページコンテナ自身に `padding-inline` がある場合、ヘッダー・フッター内部に `border` を引くか、`::before` / `::after` を使って `left/right: var(--chrome-gutter)` とする。**コンテナ自体に `border-top` / `border-bottom` を引かない。**
- `market-tracker` は本文下余白40pxを基準とし、コンテンツが短い場合でもフッターを画面下部に置く。
- フッターは上28px・下32pxの余白、`font-weight: 500`、`letter-spacing: .02em`。
- 右側のGitHubリンクは `GitHub ↗`。リンク先は各リポジトリ。
- `sudoku-solver` のライトテーマは維持する。背景やアクセントカラーまで強制的に揃えない。
- 各ページの本文見出し・カード・チャートのタイポグラフィは、情報の性質に応じて個別に決めてよい。

## 対応するスタイルシート

| リポジトリ | スタイル |
| --- | --- |
| `naoiw.github.io` | `app/global.css` |
| `market-tracker` | `src/styles.css` |
| `switchbot-logger` | `src/index.css` |
| `big3-record` | `src/index.css` |
| `sudoku-solver` | `src/index.css` |

React/Next.jsとViteなど構成が異なるため、現段階ではCSSを共通パッケージ化せず、同じトークンを各アプリに保持します。

## 変更・確認手順

1. 対象5リポジトリの `develop` を更新し、トークンの値・使用箇所を照合する。
2. 各リポジトリでテスト・ビルドし、GitHub Actionsの `Validate develop` を確認する。
3. 各リポジトリの `/develop/` プレビューをPC・スマートフォンで見比べる。
4. 本番に適用する場合は、リポジトリごとにPull Requestを作成して `main` にマージする。
