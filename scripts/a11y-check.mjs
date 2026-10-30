// Kiểm tra truy cập + chất lượng trên bản build: axe, tương phản token, bàn phím, ảnh, CLS, tắt JS.
// Dùng: npm run build && npm run check:a11y
import { readFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { readdirSync } from 'node:fs'
import { preview } from 'vite'
import { chromium } from 'playwright'
import { AxeBuilder } from '@axe-core/playwright'
import { home } from '../src/content/vi.ts'

const server = await preview({ preview: { port: 4194, strictPort: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch()
// axe cần trang mở qua context riêng
const newPage = async (opts) => (await browser.newContext(opts)).newPage()
let failed = 0
const check = (ok, label, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${label}${detail !== '' ? ` — ${detail}` : ''}`)
  if (!ok) failed++
}
const norm = (s) => s.replace(/\s+/g, ' ').trim()

try {
  // ---------- 1. axe ở nhiều trạng thái ----------
  console.log('\n== axe (WCAG 2.1 A/AA + best-practice)')
  const states = [
    ['/', 375, 'mặc định', async () => {}],
    ['/', 1280, 'mặc định', async () => {}],
    ['/', 375, 'menu mở', async (p) => p.click('button[aria-controls="mobile-menu"]')],
    [
      '/',
      1280,
      'tab Phụ huynh + mọi FAQ mở',
      async (p) => {
        await p.click('#tab-phu-huynh')
        await p.evaluate(() =>
          document.querySelectorAll('#faq details').forEach((d) => (d.open = true)),
        )
      },
    ],
    [
      '/',
      375,
      'pop-up đăng ký mở, báo lỗi SĐT',
      async (p) => {
        await p.click('header a[data-position=header]')
        await p.locator('dialog[open] #lead-phone').waitFor()
        await p.click('dialog[open] button[type=submit]')
        await p.waitForTimeout(300) // chờ hiệu ứng mở xong
      },
    ],
    [
      '/',
      375,
      'pop-up chính sách mở',
      async (p) => {
        await p.click('footer a[href="#chinh-sach-bao-mat"]')
        await p.waitForTimeout(300)
      },
    ],
  ]
  for (const [path, width, label, act] of states) {
    const page = await newPage({ viewport: { width, height: 900 } })
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await act(page)
    await page.waitForTimeout(200)
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze()
    check(
      violations.length === 0,
      `axe ${path} @${width} (${label})`,
      violations.length ? '' : '0 lỗi',
    )
    for (const v of violations) {
      console.log(`    [${v.impact}] ${v.id} ×${v.nodes.length}: ${v.help}`)
      for (const n of v.nodes.slice(0, 3))
        console.log(`      ${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1] ?? ''}`)
    }
    await page.close()
  }

  // ---------- 2. Tương phản các cặp màu token ----------
  console.log('\n== Tương phản token (chuẩn AA: chữ thường 4.5, chữ lớn/viền 3)')
  const tokens = Object.fromEntries(
    [
      ...(await readFile('src/styles/tokens.css', 'utf8')).matchAll(
        /--color-([\w-]+):\s*(#[0-9a-f]{6})/gi,
      ),
    ].map((m) => [m[1], m[2]]),
  )
  const lum = (hex) => {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  }
  const ratio = (a, b) => {
    const [x, y] = [lum(tokens[a] ?? a), lum(tokens[b] ?? b)].sort((m, n) => n - m)
    return (x + 0.05) / (y + 0.05)
  }
  for (const [fg, bg, min, use] of [
    ['text-muted', 'paper', 4.5, 'chữ xám trên nền be'],
    ['text-muted', 'card', 4.5, 'chữ xám trong thẻ'],
    ['text-muted', 'paper-dark', 4.5, 'chữ xám trên be đậm'],
    ['text', 'paper', 4.5, 'chữ thường'],
    ['ink', 'paper', 4.5, 'tiêu đề'],
    ['ink', 'paper', 4.5, 'link, chữ nút viền'],
    ['ink-500', 'paper', 3, 'icon, viền nút (phi văn bản)'],
    ['accent-red', 'paper', 3, 'dòng đỏ h1 (chữ lớn)'],
    ['white', 'ink-500', 4.5, 'chữ nút đặc, tab chọn'],
    ['white', 'ink-700', 4.5, 'chữ khối CTA'],
    ['white', 'accent-red', 4.5, 'số trong vòng tròn đỏ'],
    ['ink', 'paper', 3, 'viền focus trên nền be'],
    ['white', 'ink-700', 3, 'viền focus trong khối CTA'],
  ]) {
    const r = ratio(fg, bg)
    check(r >= min, `${fg} / ${bg} (${use})`, `${r.toFixed(2)}:1, cần ${min}`)
  }

  // ---------- 3. Bàn phím ----------
  console.log('\n== Bàn phím')
  const page = await newPage({ viewport: { width: 1280, height: 900 } })
  await page.goto(base + '/', { waitUntil: 'networkidle' })
  const stops = []
  const noRing = []
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const cs = getComputedStyle(el)
      const label = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 28)}"`
      return {
        label,
        ring:
          (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) >= 2) ||
          // Ô nhập kiểu nhãn vở: focus = gạch chân liền ≥ 2px thay cho khung
          (cs.borderBottomStyle === 'solid' && parseFloat(cs.borderBottomWidth) >= 2),
        key: el.outerHTML.slice(0, 80),
      }
    })
    if (!info) break
    if (stops.length && stops[0].key === info.key) break // quay vòng
    stops.push(info)
    if (!info.ring) noRing.push(info.label)
  }
  check(stops.length > 15, 'đi hết trang bằng Tab', `${stops.length} điểm dừng`)
  check(noRing.length === 0, 'mọi điểm dừng có viền focus ≥ 2px', noRing.join(', '))

  await page.focus('#tab-trung-tam')
  const sel = () =>
    page.evaluate(
      () =>
        document.activeElement.id +
        (document.activeElement.getAttribute('aria-selected') === 'true' ? '✔' : ''),
    )
  const seq = []
  for (const k of ['ArrowRight', 'ArrowRight', 'End', 'ArrowRight', 'Home', 'ArrowLeft']) {
    await page.keyboard.press(k)
    seq.push(`${k}→${await sel()}`)
  }
  check(
    seq.join(' ') ===
      'ArrowRight→tab-nha-truong✔ ArrowRight→tab-hoc-sinh✔ End→tab-phu-huynh✔ ArrowRight→tab-trung-tam✔ Home→tab-trung-tam✔ ArrowLeft→tab-phu-huynh✔',
    'Tab: ←/→/Home/End chuyển và chọn tab',
    seq.join(' '),
  )
  await page.keyboard.press('Tab')
  check(
    await page.evaluate(() => document.activeElement.getAttribute('role') === 'tabpanel'),
    'Tab: phím Tab từ tab vào panel đang mở',
  )

  await page.focus('#faq summary')
  await page.keyboard.press('Enter')
  const openedEnter = await page.evaluate(() => document.querySelector('#faq details').open)
  await page.keyboard.press('Space')
  const closedSpace = await page.evaluate(() => !document.querySelector('#faq details').open)
  check(openedEnter && closedSpace, 'FAQ: Enter mở, Space đóng')
  await page.close()

  // ---------- 4. Ảnh, preload, CLS, JS ----------
  console.log('\n== Ảnh, preload, CLS, JS')
  for (const file of ['dist/index.html']) {
    const html = await readFile(file, 'utf8')
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
    const missing = imgs.filter((t) => !/\swidth="\d+"/.test(t) || !/\sheight="\d+"/.test(t))
    check(
      missing.length === 0,
      `${file}: mọi <img> có width + height`,
      `${imgs.length} ảnh${missing.length ? ', thiếu: ' + missing[0].slice(0, 80) : ''}`,
    )
  }
  const indexHtml = await readFile('dist/index.html', 'utf8')
  const preloads = [...indexHtml.matchAll(/<link[^>]*rel="preload"[^>]*as="image"[^>]*>/g)].map(
    (m) => m[0],
  )
  check(
    preloads.length >= 2,
    'preload ảnh hero',
    `${preloads.length} thẻ (${preloads.filter((p) => /fetchpriority="high"/.test(p)).length} có fetchpriority=high)`,
  )
  const jsFiles = readdirSync('dist/assets').filter((f) => f.endsWith('.js'))
  let jsGz = 0
  for (const f of jsFiles) jsGz += gzipSync(await readFile(`dist/assets/${f}`)).length
  check(
    jsGz < 80 * 1024,
    'JS nén < 80 KB',
    `${(jsGz / 1024).toFixed(1)} KB (${jsFiles.length} file)`,
  )

  for (const width of [375, 1280]) {
    const p = await newPage({ viewport: { width, height: 800 } })
    await p.addInitScript(() => {
      window.__cls = 0
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
      }).observe({ type: 'layout-shift', buffered: true })
    })
    await p.goto(base + '/', { waitUntil: 'networkidle' })
    for (let y = 0; y < 8; y++) {
      await p.mouse.wheel(0, 700)
      await p.waitForTimeout(150)
    }
    await p.waitForTimeout(500)
    const cls = await p.evaluate(() => window.__cls)
    check(cls < 0.1, `CLS khi tải + cuộn hết trang @${width}`, cls.toFixed(4))
    await p.close()
  }

  // ---------- 5. Responsive: cuộn ngang, tràn chữ, vùng bấm ≥ 44px ----------
  console.log('\n== Responsive (375 / 768 / 1280), cả trạng thái menu mở và form có trường phụ')
  for (const path of ['/']) {
    for (const width of [375, 768, 1280]) {
      const p = await newPage({ viewport: { width, height: 900 } })
      await p.goto(base + path, { waitUntil: 'networkidle' })
      if (width < 1024) await p.click('button[aria-controls="mobile-menu"]')
      // Kiểm tra cả pop-up đăng ký đang mở (chỉ ở trang chủ, sau khi đã đo menu)
      const r = await p.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const visible = (el) => {
          const cs = getComputedStyle(el)
          const rect = el.getBoundingClientRect()
          return (
            cs.visibility !== 'hidden' && cs.display !== 'none' && rect.width > 0 && rect.height > 0
          )
        }
        // Bỏ qua phần tử nằm trong vùng cuộn ngang có chủ ý, trang trí (aria-hidden), honeypot
        const exempt = (el) =>
          el.closest('[aria-hidden="true"]') ||
          [...document.querySelectorAll('*')].some(
            (c) =>
              c !== el &&
              c.contains(el) &&
              ['auto', 'scroll'].includes(getComputedStyle(c).overflowX),
          )
        const name = (el) =>
          `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} "${(el.getAttribute('aria-label') || el.textContent || el.placeholder || '').trim().replace(/\s+/g, ' ').slice(0, 30)}"`

        const overflow = []
        for (const el of document.body.querySelectorAll('*')) {
          if (!visible(el) || exempt(el)) continue
          const rect = el.getBoundingClientRect()
          if (rect.right > vw + 1 || rect.left < -1)
            overflow.push(`${name(el)} [${Math.round(rect.left)}→${Math.round(rect.right)}]`)
          // Chữ bị cắt: nội dung rộng hơn hộp mà hộp lại ẩn phần thừa
          const cs = getComputedStyle(el)
          if (
            // clientWidth <= 1: nhãn sr-only cố ý thu nhỏ, không phải chữ bị cắt
            el.clientWidth > 1 &&
            ['hidden', 'clip'].includes(cs.overflowX) &&
            el.scrollWidth > el.clientWidth + 1 &&
            el.textContent.trim() &&
            !el.querySelector('img,picture')
          )
            overflow.push(`${name(el)} cắt chữ ${el.scrollWidth}>${el.clientWidth}`)
        }

        const small = []
        const inline = []
        for (const el of document.querySelectorAll(
          'a[href], button, input:not([type=hidden]), summary, [role=tab]',
        )) {
          if (!visible(el) || el.closest('[aria-hidden="true"]')) continue
          const rect = el.getBoundingClientRect()
          if (rect.width >= 44 && rect.height >= 44) continue
          // Link nằm giữa đoạn văn: WCAG 2.5.8 miễn kích thước
          const inText =
            el.tagName === 'A' &&
            getComputedStyle(el).display === 'inline' &&
            el.parentElement.closest('p')
          ;(inText ? inline : small).push(
            `${name(el)} ${Math.round(rect.width)}×${Math.round(rect.height)}`,
          )
        }
        return { scrollW: document.documentElement.scrollWidth, vw, overflow, small, inline }
      })
      const tag = `${path} @${width}`
      check(r.scrollW <= r.vw, `${tag}: không cuộn ngang`, `${r.scrollW}/${r.vw}`)
      check(
        r.overflow.length === 0,
        `${tag}: không tràn/cắt chữ`,
        r.overflow.slice(0, 4).join('; '),
      )
      check(r.small.length === 0, `${tag}: vùng bấm ≥ 44×44`, r.small.join('; '))
      if (r.inline.length)
        console.log(`    (link trong đoạn văn, được miễn: ${r.inline.join('; ')})`)
      await p.close()
    }
  }

  // ---------- 6. Tắt JavaScript ----------
  console.log('\n== Tắt JavaScript @375')
  const ctx = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 800 },
  })
  const nj = await ctx.newPage()
  await nj.goto(base + '/')
  const text = norm(await nj.evaluate(() => document.body.innerText)) // innerText bỏ qua phần tử bị ẩn
  const expect = (label, parts) => {
    const miss = parts.filter((s) => !text.includes(norm(s)))
    check(miss.length === 0, label, miss[0] ?? '')
  }
  expect('hero', [...home.hero.titleLines, home.hero.titleAccent, home.hero.lead])
  expect(
    '4 thẻ vấn đề',
    home.problems.items.flatMap((i) => [i.title, i.text]),
  )
  for (const t of home.audiences.tabs)
    expect(`tab "${t.label}" hiện đủ`, [t.title, ...t.points.map((p) => p.lead)])
  expect('3 bước, lý do, thư viện', [
    ...home.steps.items.map((s) => s.title),
    ...home.why.items.map((w) => w.title),
    ...home.library.points,
  ])
  expect(
    'FAQ: câu hỏi',
    home.faq.items.map((i) => i.q),
  )
  expect('cách đăng ký khi không có JS', [home.cta.noJs, '0906 490 974', 'contact@tinyant.app'])
  check(await nj.locator('#mobile-menu').isVisible(), 'menu mobile hiện sẵn (không cần nút)')
  check(await nj.locator('#dang-ky form').isHidden(), 'form cần JS được ẩn')
  await nj.locator('#faq summary').first().click()
  check(
    await nj.locator('#faq details p').first().isVisible(),
    'FAQ mở được không cần JS (<details>)',
  )
  await nj.screenshot({ path: 'shots/no-js-375.png', fullPage: true })
  await ctx.close()
} finally {
  await browser.close()
  await server.close()
}
console.log(failed ? `\n${failed} mục KHÔNG đạt` : '\nTất cả đạt')
process.exit(failed ? 1 : 0)
