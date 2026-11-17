import { Fragment, type ReactNode } from 'react'
import { BASE_PATH } from '../site-config'

function safeUrl(value: string): string | null {
  const url = value.trim()
  if (url.startsWith('/') && !url.startsWith('//')) return BASE_PATH + url
  if (url.startsWith('#') && /^#[\w-]+$/.test(url)) return url
  if (/^https?:\/\/[^\s]+$/i.test(url) || /^mailto:[^\s@]+@[^\s@]+$/i.test(url)) return url
  return null
}

function inline(source: string): ReactNode[] {
  const nodes: ReactNode[] = []
  // Raw HTML is never interpreted. React escapes plain text by default.
  const tokens = /(!?\[[^\]]+\]\([^)]+\)|`[^`\n]+`|\*\*[^*\n]+\*\*|~~[^~\n]+~~|\*[^*\n]+\*)/g
  let last = 0
  for (const match of source.matchAll(tokens)) {
    const index = match.index
    if (index > last) nodes.push(source.slice(last, index))
    const value = match[0]
    const key = String(index)
    if (value.startsWith('`')) {
      nodes.push(<code key={key}>{value.slice(1, -1)}</code>)
    } else if (value.startsWith('**')) {
      nodes.push(<strong key={key}>{inline(value.slice(2, -2))}</strong>)
    } else if (value.startsWith('~~')) {
      nodes.push(<del key={key}>{inline(value.slice(2, -2))}</del>)
    } else if (value.startsWith('*')) {
      nodes.push(<em key={key}>{inline(value.slice(1, -1))}</em>)
    } else {
      const linked = /^(!?)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]+")?\)$/.exec(value)
      const target = linked && safeUrl(linked[3])
      if (!linked || !target) {
        nodes.push(value)
      } else if (linked[1] === '!') {
        nodes.push(<img key={key} src={target} alt={linked[2]} loading="lazy" />)
      } else {
        nodes.push(<a key={key} href={target} rel="noopener noreferrer">{linked[2]}</a>)
      }
    }
    last = index + value.length
  }
  if (last < source.length) nodes.push(source.slice(last))
  return nodes
}

function cells(line: string) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
}

function tableSeparator(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

function fence(line: string) {
  return /^ {0,3}(`{3,}|~{3,})([\w+-]*)\s*$/.exec(line)
}

function listMarker(line: string) {
  return /^ {0,3}([-*+]|\d+\.)\s+(.+)$/.exec(line)
}

function blockStart(line: string) {
  return /^ {0,3}(#{1,6})\s+/.test(line) ||
    /^ {0,3}>\s?/.test(line) ||
    /^ {0,3}(?:---+|\*\*\*+|___+)\s*$/.test(line) ||
    Boolean(fence(line) || listMarker(line))
}

function renderBlocks(source: string): ReactNode[] {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const elements: ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    if (!lines[i].trim()) {
      i++
      continue
    }
    const key = String(i)
    const current = lines[i]

    const opening = fence(current)
    if (opening) {
      const marker = opening[1][0]
      const min = opening[1].length
      const language = opening[2]
      i++
      const code: string[] = []
      const closing = new RegExp('^ {0,3}' + (marker === '`' ? '`' : '~') + '{' + min + ',}\\s*$')
      while (i < lines.length) {
        if (closing.test(lines[i])) { i++; break }
        code.push(lines[i++])
      }
      elements.push(
        <pre key={key}><code className={language ? 'language-' + language : undefined}>
          {code.join('\n')}
        </code></pre>,
      )
      continue
    }

    const heading = /^ {0,3}(#{1,6})\s+(.+)$/.exec(current)
    if (heading) {
      const level = heading[1].length
      const content = inline(heading[2].replace(/\s+#+\s*$/, ''))
      const Tag = ('h' + level) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      elements.push(<Tag key={key}>{content}</Tag>)
      i++
      continue
    }

    if (/^ {0,3}(?:---+|\*\*\*+|___+)\s*$/.test(current)) {
      elements.push(<hr key={key} />)
      i++
      continue
    }

    if (i + 1 < lines.length && current.includes('|') && tableSeparator(lines[i + 1])) {
      const headings = cells(current)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) {
        rows.push(cells(lines[i++]))
      }
      elements.push(
        <div className="markdown-table-wrap" key={key}>
          <table>
            <thead><tr>{headings.map((v, n) => <th key={n} scope="col">{inline(v)}</th>)}</tr></thead>
            <tbody>{rows.map((row, n) => (
              <tr key={n}>{headings.map((_, col) => <td key={col}>{inline(row[col] ?? '')}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>,
      )
      continue
    }

    if (/^ {0,3}>\s?/.test(current)) {
      const quote: string[] = []
      while (i < lines.length && /^ {0,3}>\s?/.test(lines[i])) {
        quote.push(lines[i++].replace(/^ {0,3}>\s?/, ''))
      }
      elements.push(<blockquote key={key}>{renderBlocks(quote.join('\n'))}</blockquote>)
      continue
    }

    const marker = listMarker(current)
    if (marker) {
      const ordered = /^\d/.test(marker[1])
      const start = ordered ? Number.parseInt(marker[1], 10) : 1
      const items: string[] = []
      while (i < lines.length) {
        const m = listMarker(lines[i])
        if (!m || /^\d/.test(m[1]) !== ordered) break
        items.push(m[2])
        i++
      }
      const children = items.map((item, n) => <li key={n}>{inline(item)}</li>)
      elements.push(ordered
        ? <ol key={key} start={start}>{children}</ol>
        : <ul key={key}>{children}</ul>)
      continue
    }

    const paragraph = [current.trim()]
    i++
    while (i < lines.length && lines[i].trim() && !blockStart(lines[i]) &&
      !(i + 1 < lines.length && lines[i].includes('|') && tableSeparator(lines[i + 1]))) {
      paragraph.push(lines[i++].trim())
    }
    elements.push(<p key={key}>{inline(paragraph.join(' '))}</p>)
  }
  return elements
}

export function MarkdownContent({ source }: { source: string }) {
  return <div className="markdown-content">{renderBlocks(source).map((block, index) => (
    <Fragment key={index}>{block}</Fragment>
  ))}</div>
}
