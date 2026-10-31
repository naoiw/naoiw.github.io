import { categoryLabels, type Project } from '../projects'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <a
        className="project-card__main"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name}を開く（新しいタブ）`}
      >
        <div className="project-card__top">
          <span
            className={`project-card__mark project-card__mark--${project.category}`}
            aria-hidden="true"
          >
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
          {categoryLabels[project.category]}
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
  )
}
