// Lighthouse (mobile, cấu hình mặc định) trên bản build. Dùng: npm run build && npm run check:lighthouse
// Báo cáo đầy đủ: shots/lighthouse-<nhãn>.html|json (nhãn mặc định "latest", truyền --label=ten)
import { writeFile, mkdir } from 'node:fs/promises'
import { preview } from 'vite'
import { chromium } from 'playwright'
import * as chromeLauncher from 'chrome-launcher'
import lighthouse from 'lighthouse'

const label = process.argv.find((a) => a.startsWith('--label='))?.slice(8) ?? 'latest'
const server = await preview({ preview: { port: 4192, strictPort: false } })
const url = server.resolvedUrls.local[0]
const chrome = await chromeLauncher.launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox'],
})

try {
  const { lhr, report } = await lighthouse(url, {
    port: chrome.port,
    output: ['json', 'html'],
    logLevel: 'error',
  })
  await mkdir('shots', { recursive: true })
  await writeFile(`shots/lighthouse-${label}.json`, report[0])
  await writeFile(`shots/lighthouse-${label}.html`, report[1])

  const score = (k) => Math.round(lhr.categories[k].score * 100)
  console.log(
    'Điểm:',
    ['performance', 'accessibility', 'best-practices', 'seo']
      .map((k) => `${k} ${score(k)}`)
      .join(' | '),
  )
  for (const id of [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
  ]) {
    console.log(`  ${id}: ${lhr.audits[id].displayValue}`)
  }
  console.log('Audit chưa đạt:')
  for (const cat of Object.values(lhr.categories)) {
    for (const ref of cat.auditRefs) {
      const a = lhr.audits[ref.id]
      if (
        a.score !== null &&
        a.score < 0.9 &&
        a.scoreDisplayMode !== 'informative' &&
        a.scoreDisplayMode !== 'manual'
      ) {
        console.log(`  [${cat.id}] ${a.id} (${a.score}) ${a.displayValue ?? ''} — ${a.title}`)
      }
    }
  }
} finally {
  await chrome.kill()
  await server.close()
}
