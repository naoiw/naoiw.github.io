export type Product = {
  name: string
  summary: string
  url: string
  image?: string // 例: "/products/my-app.png"
}

export const products: Product[] = []
