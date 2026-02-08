export type Product = {
  name: string
  summary: string
  url: string
  image?: string // 例: "/products/my-app.png"
}

export const products: Product[] = [
  {
    name: 'sudoku-solver',
    summary: '数独を解くツール',
    url: 'https://naoiw.github.io/sudoku-solver/',
  },
  {
    name: 'c17 code generator(開発中)',
    summary: 'エプソン製マイコンc17シリーズの開発を補助するためのツール',
    url: 'https://c17-code-generator.vercel.app/',
  },
]
