export type Product = {
  name: string
  summary: string
  url: string
  image?: string // 例: "/products/my-app.png"
}

export const products: Product[] = [
  {
    name: '精進の記録',
    summary: 'BIG3と体重を記録して表示するアプリ',
    url: 'https://naoiw.github.io/big3-record/',
  },
  {
    name: 'switchbot-logger',
    summary: '自室の温湿度データが見れるアプリ',
    url: 'https://naoiw.github.io/switchbot-logger/',
  },
  {
    name: 'CoffeeScript Time Art',
    summary: '時刻を良い感じに表示するアプリ',
    url: 'https://naoiw.github.io/coffee-clock-view/',
  },
  {
    name: 'sudoku-solver',
    summary: '数独を解くツール',
    url: 'https://naoiw.github.io/sudoku-solver/',
  },
  {
    name: 'React GUI Tool',
    summary: 'シリアル通信で取得した値をプロットするツール',
    url: 'https://naoiw.github.io/react-gui-tool/',
  },
  {
    name: 'c17 code generator(開発中)',
    summary: 'エプソン製マイコンc17シリーズの開発を補助するためのツール',
    url: 'https://c17-code-generator.vercel.app/',
  },
]
