// Kiểm tra HTML đã prerender trong dist cho MỌI URL trong sitemap (+ trang 404):
// title/description riêng, canonical, OG/Twitter, đúng 1 <h1>, heading không nhảy cóc, JSON-LD hợp lệ,
// FAQPage khớp nội dung hiển thị, ảnh có width/height, lazy đúng chỗ.
// Dùng: npm run build && npm run check:seo
import { readFile, access } from 'node:fs/promises'
import { home, site } from '../src/content/vi.ts'

let failed = 0
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${label}${detail !== '' ? ` — ${detail}` : ''}`)
  if (!ok) failed++
}
const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
const attr = (html, re) => decode(html.match(re)?.[1] ?? '')
/** Chữ hiển thị: bỏ script/style, comment React, thẻ; gộp khoảng trắng. */
const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ')
const norm = (s) => s.replace(/\s+/g, ' ').trim()
const len = (s) => [...s].length
const fileOf = (path) => (path === '/' ? 'dist/index.html' : `dist${path}.html`)

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const paths = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map(
  (m) => m[1].slice(site.url.length) || '/',
)
check(paths.length >= 14, 'sitemap có đủ trang', `${paths.length} URL`)
check(
  (sitemap.match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g) ?? []).length === paths.length,
  'sitemap: mọi URL có lastmod',
)

const titles = new Map()
const descs = new Map()

for (const path of [...paths, '/404']) {
  const file = fileOf(path)
  console.log(`\n== ${path}  (${file})`)
  const html = await readFile(file, 'utf8')
  const is404 = path === '/404'
  const url = site.url + path
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '')
  const desc = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)

  check(/<html[^>]*lang="vi"/.test(html), 'html lang="vi"')
  check(title && len(title) <= 66, 'title', `${len(title)} ký tự: ${title}`)
  const dMin = path === '/' ? 140 : 90
  const dMax = path === '/' ? 155 : 160
  check(len(desc) >= dMin && len(desc) <= dMax, `description ${dMin}–${dMax} ký tự`, len(desc))
  if (!is404) {
    check(!titles.has(title), 'title không trùng trang khác', titles.get(title) ?? '')
    check(!descs.has(desc), 'description không trùng trang khác', descs.get(desc) ?? '')
    titles.set(title, path)
    descs.set(desc, path)
    check(attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) === url, 'canonical', url)
    check(!/name="robots"[^>]*noindex/.test(html), 'không noindex')
  } else {
    check(/<meta[^>]*name="robots"[^>]*content="noindex"/.test(html), '404: noindex')
    check(!/rel="canonical"/.test(html), '404: không có canonical')
    check(!sitemap.includes('/404'), '404: không có trong sitemap')
  }
  for (const [p, want] of [
    ['og:url', url],
    ['og:title', title],
    ['og:description', desc],
    ['og:image', `${site.url}/og-image.png`],
    ['og:site_name', 'Tiny Ant'],
    ['og:locale', 'vi_VN'],
  ])
    check(attr(html, new RegExp(`<meta[^>]*property="${p}"[^>]*content="([^"]*)"`)) === want, p)
  for (const [n, want] of [
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', title],
    ['twitter:description', desc],
  ])
    check(attr(html, new RegExp(`<meta[^>]*name="${n}"[^>]*content="([^"]*)"`)) === want, n)

  // Heading: đúng 1 h1, không nhảy cóc (h1 -> h3)
  const body = html.slice(html.indexOf('<body'))
  const levels = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  check(levels.filter((l) => l === 1).length === 1, 'đúng 1 <h1>')
  check(levels[0] === 1, '<h1> là heading đầu tiên')
  const jumps = levels.flatMap((l, i) =>
    i && l > levels[i - 1] + 1 ? [`h${levels[i - 1]}→h${l}`] : [],
  )
  check(jumps.length === 0, 'heading không nhảy cóc', jumps.join(', '))

  // Ảnh: width/height; chỉ ảnh màn hình đầu (eager) có fetchpriority=high; ảnh nào cũng có alt
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
  const noSize = imgs.filter((t) => !/\swidth="\d+"/.test(t) || !/\sheight="\d+"/.test(t))
  check(noSize.length === 0, 'mọi <img> có width + height', `${imgs.length} ảnh`)
  check(
    // alt rỗng (ảnh trang trí) có thể được rút gọn thành thuộc tính `alt` trơn
    imgs.every((t) => /\salt(="|[\s>])/.test(t)),
    'mọi <img> có alt',
  )
  const eager = imgs.filter((t) => !/loading="lazy"/.test(t))
  check(
    eager.every((t) => /fetchpriority="high"/.test(t)),
    'ảnh không lazy đều là ảnh ưu tiên (màn hình đầu)',
    `${eager.length} eager / ${imgs.length - eager.length} lazy`,
  )

  // JSON-LD
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ]
  if (is404) {
    check(blocks.length === 0, '404: không có JSON-LD')
    continue
  }
  check(blocks.length === 1, 'có 1 khối JSON-LD')
  let graph = []
  try {
    graph = JSON.parse(blocks[0][1])['@graph']
    check(true, 'JSON-LD parse được')
  } catch (e) {
    check(false, 'JSON-LD parse được', e.message)
  }
  const types = graph.map((n) => n['@type'])
  const want =
    path === '/'
      ? ['Organization', 'SoftwareApplication', 'FAQPage']
      : ['Organization', 'WebPage', 'BreadcrumbList']
  if (path.startsWith('/huong-dan/')) want.push('Article')
  for (const t of want) check(types.includes(t), `JSON-LD ${t}`)
  const ld = blocks[0][1]
  check(!/aggregateRating|"Review"/.test(ld), 'không có aggregateRating / Review')
  check(!/"offers"/.test(ld) || !ld.includes('TODO'), 'không có offers khi giá còn TODO')

  const app = graph.find((n) => n['@type'] === 'SoftwareApplication')
  if (app)
    check(
      app.applicationCategory === 'EducationalApplication' && app.operatingSystem === 'Web',
      'SoftwareApplication: category + OS',
    )
  const crumbs = graph.find((n) => n['@type'] === 'BreadcrumbList')
  if (crumbs) {
    const items = crumbs.itemListElement
    check(
      items[0].item === `${site.url}/` && items.at(-1).item === url,
      'BreadcrumbList: Trang chủ -> trang này',
      items.map((i) => i.name).join(' › '),
    )
  }
  const art = graph.find((n) => n['@type'] === 'Article')
  if (art)
    check(
      art.datePublished && art.author?.name === 'Tiny Ant' && art.headline,
      'Article: ngày xuất bản, tác giả Tiny Ant',
    )

  // FAQPage phải khớp FAQ hiển thị trên trang (câu hỏi + trả lời có trong HTML prerender)
  const text = visibleText(html)
  const faq = graph.find((n) => n['@type'] === 'FAQPage')
  const details = (html.match(/<details[\s>]/g) ?? []).length
  if (faq) {
    const miss = faq.mainEntity
      .flatMap((q) => [q.name, q.acceptedAnswer.text])
      .filter((s) => !text.includes(norm(s)))
    check(
      miss.length === 0 && faq.mainEntity.length === details,
      'FAQPage khớp FAQ hiển thị',
      `${faq.mainEntity.length} câu, ${details} <details>${miss[0] ? '; thiếu: ' + miss[0] : ''}`,
    )
  } else check(details === 0, 'trang có FAQ thì phải có FAQPage')

  if (path === '/') {
    check(home.faq.items.length === faq?.mainEntity.length, 'Trang chủ: FAQPage đủ câu trong vi.ts')
    check(
      /phần mềm quản lý trung tâm/i.test(title) && /lớp học thêm/i.test(title),
      'Trang chủ: title có "phần mềm quản lý trung tâm" + "lớp học thêm"',
    )
  }
}

console.log('\n== tệp tĩnh')
for (const f of [
  'robots.txt',
  'sitemap.xml',
  '404.html',
  'og-image.png',
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'icon-192.png',
  'icon-512.png',
]) {
  const ok = await access(`dist/${f}`).then(
    () => true,
    () => false,
  )
  check(ok, `dist/${f}`)
}
check(
  (await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${site.url}/sitemap.xml`),
  'robots.txt trỏ tới sitemap',
)

console.log(failed ? `\n${failed} mục KHÔNG đạt` : '\nTất cả đạt')
process.exit(failed ? 1 : 0)
