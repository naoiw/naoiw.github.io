import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const projects = JSON.parse(readFileSync(new URL('../app/projects.json', import.meta.url), 'utf8'))

test('projects have unique identifiers and valid destinations', () => {
  assert.ok(projects.length > 0)
  const ids = new Set()
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9-]+$/)
    assert.equal(ids.has(project.id), false, `Duplicate project: ${project.id}`)
    ids.add(project.id)
    assert.ok(project.name.trim())
    assert.ok(project.description.trim())
    assert.ok(['dashboard', 'tool', 'experiment'].includes(project.category))
    assert.match(project.initials, /^[A-Z0-9]{1,3}$/)
    assert.equal(new URL(project.url).protocol, 'https:')
    assert.match(project.repository, /^https:\/\/github\.com\/naoiw\/[^/]+$/)
  }
})

test('external project URLs are not repeated', () => {
  assert.equal(new Set(projects.map((project) => project.url)).size, projects.length)
})
