export type Post = Readonly<{
  slug: string
  title: string
  date: string
  updated: string | null
  description: string
  tags: readonly string[]
  body: string
}>

export declare function parsePost(source: string, slug: string): Post
export declare function getAllPosts(): Post[]
export declare function getPost(slug: string): Post | null
