import type { ReactNode } from 'react'
import { BLOG_HREF, HOME_HREF } from '../site-config'

export function SiteLayout({ active, children }: {
  active: 'works' | 'blog'
  children: ReactNode
}) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="site-brand" href={HOME_HREF} aria-label="naoiw ホーム">
            <span className="brand-mark" aria-hidden="true">n</span>
            <span>naoiw</span>
          </a>
          <nav className="site-navigation" aria-label="サイト内ナビゲーション">
            <a href={HOME_HREF} aria-current={active === 'works' ? 'page' : undefined}>制作物</a>
            <a href={BLOG_HREF} aria-current={active === 'blog' ? 'page' : undefined}>技術メモ</a>
          </nav>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} naoiw</span>
        <a href="https://github.com/naoiw/naoiw.github.io" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </footer>
    </div>
  )
}
