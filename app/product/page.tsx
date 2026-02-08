import Image from 'next/image'
import { products } from 'app/product/products'

export const metadata = {
  title: 'Product',
  description: '他リポジトリで開発したアプリケーション一覧',
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 font-semibold text-2xl tracking-tighter">
        Products
      </h1>
      <div className="grid gap-4">
        {products.map((product) => (
          <a
            key={product.url}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex flex-col gap-2">
              {product.image && (
                <div className="relative w-full aspect-video overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 576px"
                  />
                </div>
              )}
              <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                {product.name}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {product.summary}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
