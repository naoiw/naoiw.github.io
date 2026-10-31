'use client'

import { useState } from 'react'
import { categories, projects, type ProjectCategory } from '../projects'

type Filter = 'all' | ProjectCategory

export function ProjectGallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const visibleProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter)

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="section-header">
        <div>
          <p className="eyebrow">WORKS</p>
          <h2 id="projects-title">制作物</h2>
        </div>
        <p className="project-count" aria-live="polite">
          {visibleProjects.length} 件
        </p>
      </div>

      <div className="filters" role="group" aria-label="制作物の分類">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={filter === category.id ? 'filter is-active' : 'filter'}
            aria-pressed={filter === category.id}
            onClick={() => setFilter(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {visibleProjects.map((project) => (
          <article className="project-card" key={project.id}>
            <a
              className="project-card__main"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name}を開く（新しいタブ）`}
            >
              <div className="project-card__top">
                <span className={`project-card__mark project-card__mark--${project.category}`} aria-hidden="true">
                  {project.initials}
                </span>
                <span className="external-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-card__content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </a>
            <div className="project-card__footer">
              <span className="project-card__category">
                {categories.find((category) => category.id === project.category)?.label}
              </span>
              {project.status && <span className="project-card__status">{project.status}</span>}
              <a
                className="source-link"
                href={project.repository}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name}のソースコードをGitHubで開く（新しいタブ）`}
              >
                GitHub ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
