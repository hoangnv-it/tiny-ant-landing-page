// Kiểm tra HTML đã prerender trong dist: thẻ SEO, JSON-LD, và nội dung FAQ + tab có trong HTML.
// Dùng: npm run build && npm run check:seo
import { readFile, access } from 'node:fs/promises'
import { home, privacy, site } from '../src/content/vi.ts'

const KEYWORDS = [
  'phần mềm quản lý lớp học thêm',
  'quản lý trung tâm',
  'điểm danh, giao bài, báo phụ huynh',
]
const PAGES = [
  {
    file: 'dist/index.html',
    path: '/',
    meta: home.meta,
    schema: ['Organization', 'SoftwareApplication', 'FAQPage'],
  },
]

let failed = 0
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${label}${detail ? ` — ${detail}` : ''}`)
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

for (const page of PAGES) {
  console.log(`\n== ${page.file}`)
  const html = await readFile(page.file, 'utf8')
  const url = site.url + page.path
  const title = decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '')
  const desc = attr(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)

  check(/<html[^>]*lang="vi"/.test(html), 'html lang="vi"')
  check(title === page.meta.title, 'title', `${[...title].length} ký tự`)
  check(desc === page.meta.description, 'meta description', `${[...desc].length} ký tự`)
  for (const k of KEYWORDS) check((title + ' ' + desc).toLowerCase().includes(k), `có cụm "${k}"`)
  check(attr(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) === url, 'canonical', url)
  for (const [p, want] of [
    ['og:type', 'website'],
    ['og:url', url],
    ['og:title', title],
    ['og:description', desc],
    ['og:image', `${site.url}/og-image.png`],
    ['og:image:width', '1200'],
    ['og:image:height', '630'],
    ['og:site_name', 'Tiny Ant'],
    ['og:locale', 'vi_VN'],
  ])
    check(attr(html, new RegExp(`<meta[^>]*property="${p}"[^>]*content="([^"]*)"`)) === want, p)
  for (const [n, want] of [
    ['twitter:card', 'summary_large_image'],
    ['twitter:title', title],
    ['twitter:image', `${site.url}/og-image.png`],
  ])
    check(attr(html, new RegExp(`<meta[^>]*name="${n}"[^>]*content="([^"]*)"`)) === want, n)
  check(/<meta[^>]*name="theme-color"/.test(html), 'theme-color')
  for (const href of ['/favicon.ico', '/apple-touch-icon.png', '/site.webmanifest'])
    check(html.includes(`href="${href}"`), `link ${href}`)
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, 'đúng 1 <h1>')

  // JSON-LD
  const blocks = [
    ...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ]
  check(blocks.length === 1, 'có 1 khối JSON-LD')
  let graph = []
  try {
    graph = JSON.parse(blocks[0][1])['@graph']
  } catch (e) {
    check(false, 'JSON-LD parse được', e.message)
  }
  const types = graph.map((n) => n['@type'])
  for (const t of page.schema) check(types.includes(t), `JSON-LD ${t}`)
  const app = graph.find((n) => n['@type'] === 'SoftwareApplication')
  if (app) {
    check(
      app.applicationCategory === 'EducationalApplication' && app.operatingSystem === 'Web',
      'SoftwareApplication: category + OS',
    )
    check(
      !('offers' in app) && !('aggregateRating' in app),
      'SoftwareApplication: không có giá / rating',
    )
  }
  const org = graph.find((n) => n['@type'] === 'Organization')
  if (org)
    check(
      org.email && org.telephone && org.logo,
      'Organization: email, SĐT, logo',
      `${org.telephone}`,
    )
  const faq = graph.find((n) => n['@type'] === 'FAQPage')
  if (faq)
    check(
      faq.mainEntity.length === home.faq.items.length,
      'FAQPage: đủ câu hỏi',
      `${faq.mainEntity.length}`,
    )

  // Nội dung FAQ + tab phải có trong HTML prerender
  if (page.path === '/') {
    const text = visibleText(html)
    const missing = []
    for (const { q, a } of home.faq.items)
      for (const s of [q, a]) if (!text.includes(norm(s))) missing.push(s)
    check(
      missing.length === 0,
      `FAQ: đủ ${home.faq.items.length} câu hỏi + trả lời trong HTML`,
      missing[0],
    )
    for (const t of home.audiences.tabs) {
      const parts = [
        t.label,
        t.title,
        ...t.points.flatMap((p) => [p.lead, p.text, p.strong ?? '']),
      ].filter(Boolean)
      const miss = parts.filter((s) => !text.includes(norm(s)))
      check(miss.length === 0, `Tab "${t.label}": đủ tiêu đề + 4 dòng trong HTML`, miss[0])
    }
    check(
      (html.match(/role="tabpanel"/g) ?? []).length === home.audiences.tabs.length,
      'đủ 4 tabpanel',
    )
    // Pop-up Chính sách bảo mật: nội dung phải có sẵn trong HTML (đọc được khi tắt JS)
    const pParts = [privacy.title, ...privacy.sections.flatMap((s) => [s.heading, ...s.paragraphs])]
    const pMiss = pParts.filter((s) => !text.includes(norm(s)))
    check(pMiss.length === 0, 'Chính sách bảo mật: đủ nội dung trong HTML', pMiss[0])
    check(!text.includes('CẦN XÁC NHẬN: số ngày'), 'Chính sách: không còn chỗ chờ số ngày phản hồi')
  }
}

console.log('\n== tệp tĩnh')
for (const f of [
  'robots.txt',
  'sitemap.xml',
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
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
for (const p of PAGES)
  check(sitemap.includes(`<loc>${site.url}${p.path}</loc>`), `sitemap có ${p.path}`)
check(
  (await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${site.url}/sitemap.xml`),
  'robots.txt trỏ tới sitemap',
)

console.log(failed ? `\n${failed} mục KHÔNG đạt` : '\nTất cả đạt')
process.exit(failed ? 1 : 0)
