import { ProjectGallery } from './components/project-gallery'
import { SiteLayout } from './components/site-layout'

export default function Page() {
  return (
    <SiteLayout active="works">
      <section className="intro" aria-labelledby="site-title">
        <p className="eyebrow">PORTFOLIO</p>
        <h1 id="site-title">naoiw</h1>
        <p className="intro-description">
          個人で制作・公開しているアプリケーションをまとめています。
        </p>
      </section>
      <ProjectGallery />
    </SiteLayout>
  )
}
