import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteLayout } from '../../components/site-layout'
import { MarkdownContent } from '../markdown-content'
import { BLOG_HREF, IS_PREVIEW, postHref } from '../../site-config'
import { getAllPosts, getPost } from '../../../lib/posts.mjs'

type PostPageProps = {
  params: Promise<{ slug: string }>
}

// Static export requires an explicit list of slugs at build time.
export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: '記事が見つかりません | naoiw' }
  return {
    title: `${post.title} | naoiw`,
    description: post.description,
    alternates: { canonical: `/blog/${slug}/` },
    robots: IS_PREVIEW ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: `${post.date}T00:00:00+09:00`,
      modifiedTime: post.updated ? `${post.updated}T00:00:00+09:00` : undefined,
      url: `https://naoiw.github.io/blog/${slug}/`,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <SiteLayout active="blog">
      <article className="post-article">
        <a className="post-back" href={BLOG_HREF}>← 技術メモ一覧</a>
        <header className="post-article__header">
          <p className="eyebrow">TECH NOTES</p>
          <h1>{post.title}</h1>
          <p className="post-article__description">{post.description}</p>
          <div className="post-article__meta">
            <time dateTime={post.date}>公開 {post.date}</time>
            {post.updated && post.updated !== post.date && (
              <time dateTime={post.updated}>更新 {post.updated}</time>
            )}
          </div>
          {post.tags.length > 0 && (
            <div className="post-tags" aria-label="タグ">
              {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
        </header>
        <MarkdownContent source={post.body} />
        <footer className="post-article__footer">
          <a href={BLOG_HREF}>← 記事一覧に戻る</a>
        </footer>
      </article>
    </SiteLayout>
  )
}
