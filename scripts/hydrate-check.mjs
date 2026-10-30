// Kiểm tra hydrate: HTML prerender (React) và DOM sau khi preact/compat hydrate phải giống nhau,
// không có lỗi console, menu mobile hoạt động. Dùng: npm run check:hydrate (sau khi build)
import { preview } from 'vite'
import { chromium } from 'playwright'

const ROUTES = ['/']
const viewport = { width: 375, height: 800 }

const server = await preview({ preview: { port: 4176, strictPort: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch()
const snap = (p) =>
  p.evaluate(() => ({
    text: document.body.innerText,
    nodes: document.body.querySelectorAll('*').length,
  }))
let failed = false

try {
  for (const path of ROUTES) {
    const noJs = await (await browser.newContext({ javaScriptEnabled: false, viewport })).newPage()
    await noJs.goto(base + path)
    // So HTML prerender với DOM sau hydrate trong cùng điều kiện "có JS" (bản tắt JS cố ý hiện khác)
    await noJs.evaluate(() => document.documentElement.classList.add('js'))
    // Chờ menu mobile chạy xong hiệu ứng thu lại (visibility đổi sau 220ms)
    await noJs.locator('#mobile-menu').waitFor({ state: 'hidden' })
    const ssr = await snap(noJs)

    const page = await (await browser.newContext({ viewport })).newPage()
    const logs = []
    page.on('console', (m) => ['error', 'warning'].includes(m.type()) && logs.push(m.text()))
    page.on('pageerror', (e) => logs.push(e.message))
    // Đánh dấu h1 trước khi hydrate: nếu mất dấu nghĩa là DOM bị dựng lại thay vì hydrate
    await page.addInitScript(() =>
      document.addEventListener('DOMContentLoaded', () => {
        const h = document.querySelector('h1')
        if (h) h.dataset.ssr = '1'
      }),
    )
    await page.goto(base + path, { waitUntil: 'networkidle' })
    const hyd = await snap(page)
    const kept = await page.evaluate(() => document.querySelector('h1')?.dataset.ssr === '1')

    const btn = page.locator('button[aria-controls="mobile-menu"]')
    await btn.click()
    const opened = await page
      .locator('#mobile-menu')
      .waitFor({ state: 'visible', timeout: 1000 })
      .then(
        () => true,
        () => false,
      )
    await page.keyboard.press('Escape')
    // Menu đóng có hiệu ứng: chờ tối đa 1s cho tới khi ẩn hẳn
    const closed = await page
      .locator('#mobile-menu')
      .waitFor({ state: 'hidden', timeout: 1000 })
      .then(
        () => true,
        () => false,
      )

    const checks = {
      'cùng nội dung chữ': ssr.text === hyd.text,
      'cùng số phần tử': ssr.nodes === hyd.nodes,
      'giữ DOM prerender': kept,
      'menu mở': opened,
      'Esc đóng menu': closed,
      'không lỗi console': logs.length === 0,
    }
    for (const [name, ok] of Object.entries(checks)) {
      console.log(`${ok ? '✓' : '✗'} ${path} — ${name}`)
      if (!ok) failed = true
    }
    if (logs.length) console.log(logs.join('\n'))
  }
} finally {
  await browser.close()
  await server.close()
}
process.exit(failed ? 1 : 0)
