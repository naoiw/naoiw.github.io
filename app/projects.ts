import rawProjects from './projects.json'

// Category labels and filter options share a single source of truth.
export const categoryLabels = {
  dashboard: 'ダッシュボード',
  tool: 'ツール',
  game: 'ゲーム',
  experiment: '実験・その他',
} as const

export const developmentStatus = '開発中'

export type ProjectCategory = keyof typeof categoryLabels
export type ProjectFilter = 'all' | ProjectCategory | 'in-development'

export type Project = Readonly<{
  id: string
  name: string
  description: string
  category: ProjectCategory
  additionalCategories?: readonly ProjectCategory[]
  initials: string
  url: string
  repository: string
  status?: string
}>

function isProjectCategory(value: string): value is ProjectCategory {
  return Object.prototype.hasOwnProperty.call(categoryLabels, value)
}

export const projects: readonly Project[] = rawProjects.map((project) => {
  if (!isProjectCategory(project.category)) {
    throw new Error(`Unknown category for project "${project.id}": ${project.category}`)
  }

  const additionalCategories: ProjectCategory[] = (
    'additionalCategories' in project ? project.additionalCategories : []
  ).map((category: string) => {
    if (!isProjectCategory(category)) {
      throw new Error(`Unknown additional category for project "${project.id}": ${category}`)
    }
    return category
  })

  const allCategories = [project.category, ...additionalCategories]
  if (new Set(allCategories).size !== allCategories.length) {
    throw new Error(`Duplicate category for project "${project.id}"`)
  }

  return { ...project, category: project.category, additionalCategories }
})

export function matchesProjectFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'in-development') return project.status === developmentStatus
  return project.category === filter || (project.additionalCategories?.includes(filter) ?? false)
}

export const categories: ReadonlyArray<{
  id: ProjectFilter
  label: string
}> = [
  { id: 'all', label: 'すべて' },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({
    id,
    label: categoryLabels[id],
  })),
  { id: 'in-development', label: developmentStatus },
]
