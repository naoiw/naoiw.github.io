import './global.css'
import type { Metadata, Viewport } from 'next'
import { HOME_URL, IS_PREVIEW, SITE_ORIGIN } from './site-config'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: 'naoiw | 制作物一覧',
  description: 'naoiwが制作・公開しているWebアプリケーションの一覧。',
  alternates: { canonical: '/' },
  icons: { icon: IS_PREVIEW ? '/develop/favicon.ico' : '/favicon.ico' },
  openGraph: {
    title: 'naoiw | 制作物一覧',
    description: '個人で制作・公開しているWebアプリケーションの一覧。',
    url: HOME_URL,
    siteName: 'naoiw',
    locale: 'ja_JP',
    type: 'website',
  },
  robots: IS_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
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
