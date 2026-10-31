import './global.css'
import type { Metadata, Viewport } from 'next'

const siteUrl = 'https://naoiw.github.io'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'naoiw | 制作物一覧',
  description: 'naoiwが制作・公開しているWebアプリケーションの一覧。',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'naoiw | 制作物一覧',
    description: '個人で制作・公開しているWebアプリケーションの一覧。',
    url: siteUrl,
    siteName: 'naoiw',
    locale: 'ja_JP',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
