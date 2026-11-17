import type { MetadataRoute } from 'next'
import { getAllPosts } from '../lib/posts.mjs'
import { SITE_ORIGIN } from './site-config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_ORIGIN}/`, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_ORIGIN}/blog/`, changeFrequency: 'weekly', priority: 0.7 },
    ...getAllPosts().map((post) => ({
      url: `${SITE_ORIGIN}/blog/${post.slug}/`,
      lastModified: `new Date(`${post.updated ?? post.date}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
