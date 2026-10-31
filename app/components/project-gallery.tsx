'use client'

import { useState } from 'react'
import { categories, projects, type ProjectCategory } from '../projects'
import { ProjectCard } from './project-card'

type ProjectFilter = 'all' | ProjectCategory

export function ProjectGallery() {
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const visibleProjects = filter === 'all'
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
