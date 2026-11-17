import assert from 'node:assert/strict'
import test from 'node:test'
import { getAllPosts, getPost, parsePost } from '../lib/posts.mjs'

const front = [
  '---',
  'title: "Example"',
  'date: "2026-11-17"',
  'description: "Sample article"',
  'tags:',
  '  - Next.js',
  '  - Markdown',
  '---',
  '',
  '# Heading',
  '',
  'Body.',
].join('\n')

test('reads posts and sorts by published date descending', () => {
  const posts = getAllPosts()
  assert.ok(posts.length > 0, 'Expected at least one example post')
  assert.deepEqual(posts.map((p) => p.slug), [...new Set(posts.map((p) => p.slug))])
  for (let i = 1; i < posts.length; i++) {
    assert.ok(posts[i - 1].date >= posts[i].date)
  }
  for (const post of posts) {
    assert.equal(getPost(post.slug)?.title, post.title)
  }
})

test('parses required metadata, optional tags, and content', () => {
  const post = parsePost(front, 'example')
  assert.equal(post.date, '2026-11-17')
  assert.deepEqual(post.tags, ['Next.js', 'Markdown'])
  assert.match(post.body, /# Heading/)
  assert.equal(post.updated, null)
})

test('rejects bad slug, missing front matter, invalid dates, and duplicate tags', () => {
  assert.throws(() => parsePost(front, '../example'), /slug/)
  assert.throws(() => parsePost('# no metadata', 'example'), /front matter/)
  assert.throws(() => parsePost(front.replace('2026-11-17', '2026-02-30'), 'example'), /date/)
  assert.throws(() => parsePost(front.replace('  - Markdown', '  - Next.js'), 'example'), /duplicate tags/)
})

test('does not expose non-slug paths', () => {
  assert.equal(getPost('../README'), null)
  assert.equal(getPost('NOT-ALLOWED'), null)
})
