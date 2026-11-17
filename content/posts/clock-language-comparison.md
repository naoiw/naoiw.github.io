---
title: "同じブラウザ時計を4言語で実装して比較した"
date: "2026-11-17"
description: "CoffeeScript・LiveScript・Nim・Rustで同じCanvas時計を実装し、ソース行数、JavaScriptとWebAssemblyの実行方式、開発・テスト構成を比較します。"
tags:
  - CoffeeScript
  - LiveScript
  - Nim
  - Rust
  - WebAssembly
---

同じ画面・同じ機能のWebアプリを複数の言語で実装すると、言語ごとの特徴が見えやすくなる。今回は **CoffeeScript、LiveScript、Nim、Rust** でブラウザ時計を作り、コード量と実装構成を比較した。

結論を先に書くと、**今回の実装で最も短かったのはLiveScriptの159行**。一方、静的型付けやWebAssemblyの採用など、行数だけでは比較できない違いもある。

## 比較対象と共通仕様

4つとも、GitHub Pagesで公開する静的Webアプリ。描画先はブラウザ標準の **Canvas 2D** で、次の機能を共通の目標として実装した。

- 時・分・秒を示す3本の円弧と、ミリ秒を考慮した滑らかな進行
- 時刻に応じて変化する色相と、毎分切り替わりで発生する60個の粒子
- 端末のローカル時刻と日本語の日付表示
- スマートフォン、HiDPIディスプレイ、画面リサイズへの対応
- `prefers-reduced-motion` 対応と、非表示タブでの描画停止・再開

実装と公開ページはこちら。

| 言語 | 実装リポジトリ | デモ |
| --- | --- | --- |
| CoffeeScript | [coffee-clock-view](https://github.com/naoiw/coffee-clock-view) | [Coffee Clock](https://naoiw.github.io/coffee-clock-view/) |
| LiveScript | [livescript-clock-view](https://github.com/naoiw/livescript-clock-view) | [LiveScript Clock](https://naoiw.github.io/livescript-clock-view/) |
| Nim | [nim-clock-view](https://github.com/naoiw/nim-clock-view) | [Nim Clock](https://naoiw.github.io/nim-clock-view/) |
| Rust | [rust-clock-view](https://github.com/naoiw/rust-clock-view) | [Rust Clock](https://naoiw.github.io/rust-clock-view/) |

## ソースコード量の比較

2026年11月17日時点の各リポジトリの `main` ブランチを集計した。

| 言語 | 時計本体の対象ファイル | 行数 | CoffeeScript比 |
| --- | --- | ---: | ---: |
| **LiveScript** | `src/clock.ls` | **159** | **約19%減** |
| CoffeeScript | `src/clock.coffee` | 196 | 基準 |
| Nim | `src/clock.nim` + `src/clock_math.nim` | 269 | 約37%増 |
| Rust | `src/lib.rs` の本体部分 + `src/main.js` | 392 | 2倍 |

集計ルールは、空行・コメントを含む**物理行数**。HTML、CSS、テスト、生成後のJavaScript・WebAssembly、設定ファイルは除外した。Rustは `src/lib.rs` に単体テストが同居しているため、`#[cfg(test)]` 以降を除いた353行と、起動用JavaScriptの39行を合算している。

LiveScriptはCoffeeScriptから **37行削減**できた。ただし、同じ振る舞いを目指した4つの実装は構造や記述方針が完全に同一ではない。行数は今回の実装結果であり、言語の優劣をそのまま表すものではない。

## ブラウザでの実行方式

ビルド後の仕組みは大きく2種類に分かれる。

```text
CoffeeScript ── coffee ──→ JavaScript ──→ Canvas 2D
LiveScript   ── lsc ────→ JavaScript ──→ Canvas 2D
Nim          ── nim js ─→ JavaScript ──→ Canvas 2D
Rust         ── wasm-pack → WebAssembly
                               ↕ wasm-bindgen / JS
                            Canvas 2D
```

**CoffeeScriptとLiveScript** はJavaScriptへ変換する言語で、ブラウザのDOMやCanvas APIを比較的直接的に記述できる。

**Nim** も今回はJavaScriptバックエンドを選択した。時計の計算を `clock_math.nim` に分離し、CanvasやDOMへの接続は `importjs` を使っている。静的型付けの一方で、ブラウザAPIの橋渡しコードが必要になった。

**Rust** はWebAssemblyへコンパイルする。時計ロジックとCanvas描画をRust側に置き、JavaScriptを主に起動とイベント管理に使用している。`wasm-bindgen`、`web-sys` などを利用するため、今回の規模では構成が大きくなる。

いずれも描画処理そのものは最終的にブラウザのCanvas 2D APIを呼び出す。**WebAssemblyだから自動的に描画が速くなるわけではない**点に注意したい。

## 開発環境と品質チェック

| 項目 | CoffeeScript | LiveScript | Nim | Rust |
| --- | --- | --- | --- | --- |
| 出力 | JavaScript | JavaScript | JavaScript | Wasm + JavaScript |
| ビルド | `coffee` | `lsc` | `nim js` | `wasm-pack` |
| 型付け | 動的 | 動的 | 静的 | 静的 |
| 単体テスト | 5ケース | 4ケース | 6ケース | 6ケース |
| 生成JSの起動スモークテスト | なし | あり | あり | なし |
| 追加のCIチェック | ビルド・テスト | ビルド・テスト | ビルド・テスト | rustfmt・clippy |

CoffeeScriptは `pnpm-lock.yaml`、LiveScriptは `package-lock.json`、Rustは `Cargo.lock` で依存関係を固定している。Nim版は外部Nimパッケージを使わず、CIでNim 2.4.2を指定している。

それぞれの基本的な確認コマンドは次のとおり。

```bash
# CoffeeScript
pnpm run check

# LiveScript
npm run check

# Nim
nim c -r tests/test_clock_math.nim
bash scripts/build.sh
node tests/browser-smoke.cjs

# Rust
cargo fmt --all -- --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked --lib
bash scripts/build.sh
```

4つとも `main` を本番、`develop` をプレビューとして運用し、GitHub ActionsからGitHub Pagesに静的ファイルを公開している。

## 実装して感じた違い

### CoffeeScript：ブラウザ向けコードを素直に短く書ける

Canvas APIの呼び出しをほぼそのまま記述でき、JavaScriptより記号や定型構文を減らせる。時計のような小規模なブラウザアプリには扱いやすい。動的型付けなので、型の不整合はテストで補う必要がある。

### LiveScript：今回のコード量では最短

CoffeeScript系の簡潔な構文を活用し、159行に収まった。動作もJavaScriptに変換して実行するため、構成はシンプル。ただし、短い記法には慣れが必要で、可読性と行数の少なさは必ずしも一致しない。

### Nim：静的型付けと簡潔な構文の中間

Pythonに近いインデント主体の記述と静的型付けを組み合わせられる。純粋な計算ロジックをブラウザなしでテストできる点も良い。今回のコードでは `importjs` によるブラウザAPI連携がかなりの割合を占めた。

### Rust：最も厳格で、ビルド構成も大きい

型システム、所有権と借用、`clippy` による静的解析などが特徴。計算量の多い処理に発展させる場合や、Wasmを学ぶ題材としては有意義。一方、Canvas中心の小さな時計を作るだけなら準備とコード量が増える。

## 性能面で、まだ結論を出していないこと

今回は **FPS、CPU使用率、メモリ消費量、初回ロード時間、生成物の転送サイズを統一環境で実測していない**。そのため、「Rustが最速」「LiveScriptが軽量」といった性能の順位付けはできない。

特にCanvas中心のアプリでは、JavaScriptとWasmの境界を越える回数や描画APIの呼び出し方が結果に影響する。公平に比較するには、同じブラウザ・端末・表示条件で、少なくとも次の指標を測る必要がある。

- 生成されたJS/Wasmと関連ファイルの転送サイズ（圧縮前・転送時）
- 起動から最初のフレームまでの時間
- 60秒間の平均FPS、フレーム時間、CPU使用率
- メモリ使用量と粒子エフェクト発生時の負荷

また、CIの単体テストとブラウザAPIのスモークテストは、すべてのブラウザで描画が完全一致することまでは保証しない。

## まとめ

**少ないコードで完成させるならLiveScript、ブラウザ開発の素直さならCoffeeScript、静的型付けとのバランスならNim、Wasmや厳密な実装を経験するならRust**、という違いが見えた。

今回の用途ではコード量と実装の手軽さでJavaScript出力方式が有利だった。ただし、これは時計という小規模なCanvasアプリでの比較結果。次は実行時の計測を加えて、記述量の違いが実際の性能や配信サイズにどう表れるかを確かめたい。
