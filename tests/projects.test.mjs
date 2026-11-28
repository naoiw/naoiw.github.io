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

    if (project.additionalCategories !== undefined) {
      assert.ok(Array.isArray(project.additionalCategories), `Invalid additionalCategories: ${project.id}`)
      assert.ok(project.additionalCategories.length > 0, `Empty additionalCategories: ${project.id}`)
      const uniqueCategories = new Set([project.category])
      for (const category of project.additionalCategories) {
        assert.ok(categories.has(category), `Unknown additional category: ${project.id}`)
        assert.ok(!uniqueCategories.has(category), `Duplicate category: ${project.id}`)
        uniqueCategories.add(category)
      }
    }
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

test('TD4 retains both category tags without development status', () => {
  const td4 = projects.find((project) => project.id === 'td4')
  assert.ok(td4)
  assert.equal(td4.category, 'experiment')
  assert.deepEqual(td4.additionalCategories, ['tool'])
  assert.equal(td4.status, undefined)

  const inDevelopment = projects.filter((project) => project.status === '開発中')
  assert.ok(!inDevelopment.some((project) => project.id === 'td4'))
  assert.ok(inDevelopment.some((project) => project.id === 'c17-code-generator'))
})

test('QR Maker and Music Video Maker have the expected tags and links', () => {
  const qr = projects.find((project) => project.id === 'qr-maker')
  const mv = projects.find((project) => project.id === 'music-video-maker')
  assert.ok(qr)
  assert.ok(mv)
  assert.equal(qr.category, 'tool')
  assert.equal(qr.additionalCategories, undefined)
  assert.equal(qr.status, undefined)
  assert.equal(qr.url, 'https://naoiw.github.io/qr-maker/')
  assert.equal(mv.category, 'tool')
  assert.equal(mv.additionalCategories, undefined)
  assert.equal(mv.status, '開発中')
  assert.equal(mv.url, mv.repository)
})

test('Projects with tool and experiment tags are discoverable in both categories', () => {
  for (const id of ['cycling-map', 'japan-geometry', 'web-native-lab']) {
    const project = projects.find((item) => item.id === id)
    assert.ok(project, `Missing project: ${id}`)
    assert.equal(project.category, 'tool')
    assert.deepEqual(project.additionalCategories, ['experiment'])
  }
})
