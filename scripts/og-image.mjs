// Ảnh Open Graph tạm (1200×630) chụp từ phần đầu trang chủ. Thay bằng ảnh thiết kế riêng khi có.
// Dùng: npm run build && node scripts/og-image.mjs
import { preview } from 'vite'
import { chromium } from 'playwright'
import sharp from 'sharp'

// Chụp ở 1440×756 (cùng tỉ lệ 1200:630) để có bố cục hero máy tính đầy đủ, rồi thu về 1200×630
const server = await preview({ preview: { port: 4190, strictPort: false } })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 756 } })
  await page.goto(server.resolvedUrls.local[0], { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const shot = await page.screenshot()
  const out = await sharp(shot)
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
  await sharp(out).toFile('public/og-image.png')
  console.log('public/og-image.png', `${(out.length / 1024).toFixed(0)} KB`)
} finally {
  await browser.close()
  await server.close()
}
