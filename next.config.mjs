/** @type {import('next').NextConfig} */
// The preview is built independently and published below /develop/.
// Next.js embeds basePath in _next asset URLs during the build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH === '/develop' ? '/develop' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
