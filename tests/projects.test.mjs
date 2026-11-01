import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const projects = JSON.parse(
  readFileSync(new URL('../app/projects.json', import.meta.url), 'utf8'),
)
const categories = new Set(['dashboard', 'tool', 'game', 'experiment'])

function httpsUrl(value) {
  assert.equal(typeof value, 'string')
  const parsed = new URL(value)
  assert.equal(parsed.protocol, 'https:')
  assert.equal(parsed.username, '')
  assert.equal(parsed.password, '')
  return parsed
}

test('project catalog has unique IDs and valid metadata', () => {
  assert.ok(projects.length > 0)
  const ids = new Set()

  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(!ids.has(project.id), `Duplicate project ID: ${project.id}`)
    ids.add(project.id)

    for (const key of ['name', 'description']) {
      assert.equal(typeof project[key], 'string')
      assert.ok(project[key].trim(), `Missing ${key}: ${project.id}`)
    }
    assert.ok(categories.has(project.category), `Unknown category: ${project.id}`)
    assert.match(project.initials, /^[A-Z0-9]{1,3}$/)

    if (project.status !== undefined) {
      assert.equal(typeof project.status, 'string')
      assert.ok(project.status.trim(), `Empty status: ${project.id}`)
    }
  }
})

test('project links are valid HTTPS URLs and are not duplicated', () => {
  const destinations = new Set()
  const sources = new Set()

  for (const project of projects) {
    const destination = httpsUrl(project.url).href
    const repository = httpsUrl(project.repository)

    assert.match(
      repository.href,
      /^https:\/\/github\.com\/naoiw\/[a-zA-Z0-9._-]+\/?$/,
    )
    assert.ok(!destinations.has(destination), `Duplicate destination: ${project.id}`)
    assert.ok(!sources.has(repository.href), `Duplicate repository: ${project.id}`)
    destinations.add(destination)
    sources.add(repository.href)
  }
})
