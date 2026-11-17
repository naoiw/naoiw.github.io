import type { Metadata } from 'next'
import { SiteLayout } from '../components/site-layout'
import { IS_PREVIEW, postHref } from '../site-config'
import { getAllPosts } from '../../lib/posts.mjs'

export const metadata: Metadata = {
  title: '技術メモ | naoiw',
  description: '開発中の検証や実装方法をMarkdownでまとめた技術メモ。',
  alternates: { canonical: '/blog/' },
  robots: IS_PREVIEW ? { index: false, follow: false } : undefined,
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <SiteLayout active="blog">
      <section className="blog-intro" aria-labelledby="blog-title">
        <p className="eyebrow">TECH NOTES</p>
        <h1 id="blog-title">技術メモ</h1>
        <p>開発中に試したこと、調べたこと、実装の記録をまとめています。</p>
      </section>

      <section aria-label="記事一覧" className="post-list">
        {posts.length === 0 && <p className="post-empty">まだ記事がありません。</p>}
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <a href={postHref(post.slug)} className="post-card__link">
              <time dateTime={post.date} className="post-date">{post.date}</time>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.tags.length > 0 && (
                <div className="post-tags" aria-label="タグ">
                  {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}
            </a>
          </article>
        ))}
      </section>
    </SiteLayout>
  )
}
