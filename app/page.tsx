import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Home
      </h1>
      <p className="mb-8 text-neutral-600 dark:text-neutral-400">
        naoiw のウェブサイトへようこそ。
      </p>
      <div className="my-8">
        <h2 className="mb-4 text-lg font-medium">最近の記事</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
