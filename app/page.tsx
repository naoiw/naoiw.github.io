import Image from 'next/image'
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
      <div className="mb-8 w-full">
        <Image
          src="/welcome.jpg"
          alt="ホーム画像"
          width={576}
          height={324}
          className="w-full h-auto rounded-lg"
          sizes="(max-width: 640px) 100vw, 576px"
          priority
        />
      </div>
      <div className="my-8">
        <h2 className="mb-4 text-lg font-medium">最近の記事</h2>
        <BlogPosts />
      </div>
    </section>
  )
}
