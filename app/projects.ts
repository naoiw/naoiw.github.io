import rawProjects from './projects.json'

export type ProjectCategory = 'dashboard' | 'tool' | 'experiment'

export type Project = {
  id: string
  name: string
  description: string
  category: ProjectCategory
  initials: string
  url: string
  repository: string
  status?: string
}

// Add or edit entries in projects.json. This module keeps UI typing in one place.
export const projects = rawProjects as Project[]

export const categories: ReadonlyArray<{
  id: 'all' | ProjectCategory
  label: string
}> = [
  { id: 'all', label: 'すべて' },
  { id: 'dashboard', label: 'ダッシュボード' },
  { id: 'tool', label: 'ツール' },
  { id: 'experiment', label: '実験・その他' },
]
