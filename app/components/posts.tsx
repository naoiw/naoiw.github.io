import Link from 'next/link'
import { formatDate, getBlogPosts, tagToSlug } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <div key={post.slug} className="flex flex-col space-y-1 mb-4">
            <Link
              className="flex flex-col space-y-1"
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
            {(post.metadata.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2 ml-[150px] md:ml-[158px]">
                {(post.metadata.tags ?? []).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className="text-xs text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 underline underline-offset-2"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
