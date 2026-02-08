import Link from 'next/link'
import { formatDate, getPostsByTag, getAllTags } from 'app/blog/utils'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `tag: ${decoded}`,
    description: `Articles tagged with "${decoded}".`,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(tag).sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        tag: {decoded}
      </h1>
      {posts.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          該当する記事はありません。
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[150px] shrink-0 tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.metadata.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
