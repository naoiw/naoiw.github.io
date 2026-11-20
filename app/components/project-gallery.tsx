'use client'

import { useState } from 'react'
import { categories, matchesProjectFilter, projects, type ProjectFilter } from '../projects'
import { ProjectCard } from './project-card'

export function ProjectGallery() {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const visibleProjects = projects.filter((project) => matchesProjectFilter(project, filter))

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

      <div className="filters" role="group" aria-label="制作物の分類・開発状況">
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
