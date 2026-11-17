export const SITE_ORIGIN = 'https://naoiw.github.io'
export const IS_PREVIEW = process.env.NEXT_PUBLIC_BASE_PATH === '/develop'
export const BASE_PATH = IS_PREVIEW ? '/develop' : ''
export const HOME_HREF = `${BASE_PATH}/`
export const BLOG_HREF = `${BASE_PATH}/blog/`
export const HOME_URL = `${SITE_ORIGIN}${HOME_HREF}`
export function postHref(slug: string) {
  return `${BLOG_HREF}${slug}/`
}
