import rawProjects from './projects.json'

// The labels are the single source of truth for category names and filter options.
export const categoryLabels = {
  dashboard: 'ダッシュボード',
  tool: 'ツール',
  game: 'ゲーム',
  experiment: '実験・その他',
} as const

export type ProjectCategory = keyof typeof categoryLabels

export type Project = Readonly<{
  id: string
  name: string
  description: string
  category: ProjectCategory
  initials: string
  url: string
  repository: string
  status?: string
}>

function isProjectCategory(value: string): value is ProjectCategory {
  return Object.prototype.hasOwnProperty.call(categoryLabels, value)
}

// Avoid asserting the JSON's category type without checking its value.
export const projects: readonly Project[] = rawProjects.map((project) => {
  if (!isProjectCategory(project.category)) {
    throw new Error(`Unknown category for project "${project.id}": ${project.category}`)
  }

  return { ...project, category: project.category }
})

export const categories: ReadonlyArray<{
  id: 'all' | ProjectCategory
  label: string
}> = [
  { id: 'all', label: 'すべて' },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({
    id,
    label: categoryLabels[id],
  })),
]
