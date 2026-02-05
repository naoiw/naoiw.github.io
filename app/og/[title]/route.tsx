import { ImageResponse } from 'next/og'
import { getBlogPosts } from 'app/blog/utils'

export const dynamic = 'force-static'

export function generateStaticParams() {
  let posts = getBlogPosts()
  let titles = posts.map((p) => ({ title: p.metadata.title }))
  return [...titles, { title: 'naoiw' }]
}

export function GET(
  _request: Request,
  { params }: { params: { title: string } }
) {
  let title = decodeURIComponent(params.title) || 'naoiw'

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
          <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
            {title}
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
