// Chụp các route ở 4 độ rộng, lưu vào shots/ để so với design/.
// Dùng:
//   npm run shots                     -> toàn trang mọi route
//   npm run shots -- --section=hero   -> chỉ chụp phần tử #hero (trên route nào có nó)
import { mkdir } from 'node:fs/promises'
import { preview } from 'vite'
import { chromium } from 'playwright'

const ROUTES = [['home', '/']]
const WIDTHS = [375, 768, 1280, 1440]
const OUT = 'shots'

const section = process.argv.find((a) => a.startsWith('--section='))?.slice('--section='.length)

await mkdir(OUT, { recursive: true })
const server = await preview({ preview: { port: 4173, strictPort: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch()
let shot = 0

try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    for (const [name, path] of ROUTES) {
      await page.goto(base + path, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)

      if (section) {
        const el = page.locator(`#${section}`)
        if ((await el.count()) === 0) continue
        // Header dính sẽ đè lên ảnh chụp section: tắt dính khi chụp riêng section
        await page.addStyleTag({ content: 'header{position:static!important}' })
        // Ảnh lazy dưới màn hình đầu chỉ tải khi cuộn tới
        await el.scrollIntoViewIfNeeded()
        await page.waitForLoadState('networkidle')
        const file = `${OUT}/${section}-${width}.png`
        await el.screenshot({ path: file })
        console.log(file)
      } else {
        const file = `${OUT}/${name}-${width}.png`
        // Cuộn hết trang để ảnh lazy (loading="lazy") tải trước khi chụp toàn trang
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
            scrollTo({ top: y, behavior: 'instant' })
            await new Promise((r) => setTimeout(r, 60))
          }
          scrollTo({ top: 0, behavior: 'instant' })
        })
        await page.waitForLoadState('networkidle')
        await page.screenshot({ path: file, fullPage: true })
        console.log(file)
      }
      shot++
    }
    await page.close()
  }
} finally {
  await browser.close()
  await server.close()
}

if (shot === 0) {
  console.error(`Không tìm thấy #${section} trên route nào.`)
  process.exit(1)
}
