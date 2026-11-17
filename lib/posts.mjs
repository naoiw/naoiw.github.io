import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const POSTS_DIR = join(process.cwd(), 'content', 'posts')
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

function textValue(raw) {
  const value = raw.trim()
  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }
  return value
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(value + 'T00:00:00Z')
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

/**
 * Intentionally supports a small, documented YAML front matter subset:
 * string scalars and a dash-prefixed list of tags. No code execution or YAML objects.
 */
export function parsePost(source, slug) {
  if (!SLUG_PATTERN.test(slug)) throw new Error('Invalid post slug: ' + slug)
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source)
  if (!match) throw new Error(slug + ': missing YAML front matter')

  const fields = {}
  let inTags = false
  const tags = []
  for (const rawLine of match[1].split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue
    const tagItem = /^\s+-\s+(.+)$/.exec(rawLine)
    if (inTags && tagItem) {
      const tag = textValue(tagItem[1])
      if (!tag) throw new Error(slug + ': empty tag')
      tags.push(tag)
      continue
    }
    const entry = /^([a-z]+):\s*(.*)$/.exec(rawLine)
    if (!entry) throw new Error(slug + ': unsupported front matter line: ' + rawLine)
    const [, key, raw] = entry
    if (!['title', 'date', 'updated', 'description', 'tags'].includes(key)) {
      throw new Error(slug + ': unknown field ' + key)
    }
    if (Object.hasOwn(fields, key)) throw new Error(slug + ': duplicate field ' + key)
    if (key === 'tags') {
      if (raw.trim()) throw new Error(slug + ': tags must be a list with - entries')
      fields[key] = true
      inTags = true
    } else {
      fields[key] = textValue(raw)
      inTags = false
    }
  }

  for (const key of ['title', 'date', 'description']) {
    if (typeof fields[key] !== 'string' || !fields[key].trim()) {
      throw new Error(slug + ': missing ' + key)
    }
  }
  if (!validDate(fields.date)) throw new Error(slug + ': invalid date')
  if (fields.updated !== undefined && !validDate(fields.updated)) {
    throw new Error(slug + ': invalid updated date')
  }
  if (fields.updated && fields.updated < fields.date) {
    throw new Error(slug + ': updated date is earlier than published date')
  }
  if (new Set(tags).size !== tags.length) throw new Error(slug + ': duplicate tags')
  const body = source.slice(match[0].length).trim()
  if (!body) throw new Error(slug + ': empty article body')
  return {
    slug,
    title: fields.title,
    date: fields.date,
    updated: fields.updated ?? null,
    description: fields.description,
    tags,
    body,
  }
}

export function getAllPosts() {
  return readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => {
      const slug = entry.name.slice(0, -3)
      return parsePost(readFileSync(join(POSTS_DIR, entry.name), 'utf8'), slug)
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
}

export function getPost(slug) {
  if (!SLUG_PATTERN.test(slug)) return null
  return getAllPosts().find((post) => post.slug === slug) ?? null
}
