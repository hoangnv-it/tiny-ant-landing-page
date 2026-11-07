// Quét mọi link nội bộ trong HTML đã prerender (dist/**/*.html):
// - đường dẫn phải trỏ tới trang/tệp có thật (không phải nguồn chuyển hướng trong _redirects)
// - neo #id phải có phần tử id đó trên trang đích
// Dùng: npm run build && npm run check:links
import { readFile, readdir, access } from 'node:fs/promises'

const files = (await readdir('dist', { recursive: true }))
  .map((f) => f.replace(/\\/g, '/'))
  .filter((f) => f.endsWith('.html'))
const pageOf = (f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, ''))
const html = Object.fromEntries(
  await Promise.all(files.map(async (f) => [pageOf(f), await readFile(`dist/${f}`, 'utf8')])),
)
const ids = Object.fromEntries(
  Object.entries(html).map(([p, h]) => [
    p,
    new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  ]),
)
const redirects = (await readFile('public/_redirects', 'utf8'))
  .split('\n')
  .filter((l) => l.trim() && !l.startsWith('#'))
  .map((l) => l.split(/\s+/)[0])
const exists = (p) =>
  access(`dist${p}`).then(
    () => true,
    () => false,
  )

let failed = 0
let count = 0
const seen = new Set()
for (const [page, h] of Object.entries(html)) {
  const body = h.slice(h.indexOf('<body'))
  for (const [, raw] of body.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const href = raw.replace(/&amp;/g, '&')
    if (/^(https?:|mailto:|tel:|\/\/)/.test(href)) continue
    count++
    const [pathPart, hash] = href.split('#')
    const target = pathPart === '' ? page : pathPart.replace(/\/$/, '') || '/'
    const key = `${page} -> ${href}`
    if (seen.has(key)) continue
    seen.add(key)
    let problem = ''
    if (redirects.includes(target)) problem = 'trỏ tới đường dẫn đã chuyển hướng'
    else if (!html[target] && !(await exists(target))) problem = 'trang không tồn tại'
    else if (hash && !ids[target]?.has(hash)) problem = `không có #${hash} trên ${target}`
    if (problem) {
      failed++
      console.log(`✗ ${page}: ${href} — ${problem}`)
    }
  }
}
console.log(
  failed
    ? `\n${failed} link KHÔNG đạt`
    : `✓ ${count} link nội bộ trên ${files.length} trang đều tới đúng trang và neo\n\nTất cả đạt`,
)
process.exit(failed ? 1 : 0)
