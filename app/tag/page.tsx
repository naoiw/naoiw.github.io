import Link from 'next/link'
import { getAllTags } from 'app/blog/utils'

export const metadata = {
  title: 'Tag',
  description: 'Browse posts by tag.',
}

export default function Page() {
  const tags = [...getAllTags()].sort((a, b) => a.localeCompare(b))

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">tag</h1>
      {tags.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          タグはまだありません。
        </p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tag/${encodeURIComponent(tag)}`}
                className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 underline underline-offset-2"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
