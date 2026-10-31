import { ProjectGallery } from './components/project-gallery'

const homeHref = process.env.NEXT_PUBLIC_BASE_PATH === '/develop' ? '/develop/' : '/'

export default function Page() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="site-brand" href={homeHref} aria-label="naoiw ホーム">
            <span className="brand-mark" aria-hidden="true">n</span>
            <span>naoiw</span>
          </a>
        </div>
      </header>

      <main className="site-main">
        <section className="intro" aria-labelledby="site-title">
          <p className="eyebrow">PORTFOLIO</p>
          <h1 id="site-title">naoiw</h1>
          <p className="intro-description">
            個人で制作・公開しているWebアプリケーションをまとめています。
          </p>
        </section>
        <ProjectGallery />
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} naoiw</span>
        <a href="https://github.com/naoiw/naoiw.github.io" target="_blank" rel="noopener noreferrer">
          Source on GitHub ↗
        </a>
      </footer>
    </div>
  )
}
