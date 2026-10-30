import { readdir, writeFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
// Nạp type augmentation cho `ssgOptions` trong UserConfig
import type {} from 'vite-react-ssg/node'
import { site } from './src/content/vi.ts'

/** sitemap.xml từ các trang đã prerender trong dist (index.html -> /, abc.html -> /abc). */
async function writeSitemap(dir: string) {
  const pages = (await readdir(dir))
    .filter((f) => f.endsWith('.html') && f !== '404.html')
    .map((f) => (f === 'index.html' ? '/' : `/${f.replace(/\.html$/, '')}`))
    .sort()
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = pages
    .map((p) => `  <url><loc>${site.url}${p}</loc><lastmod>${lastmod}</lastmod></url>`)
    .join('\n')
  await writeFile(
    `${dir}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
}

export default defineConfig(({ command, isSsrBuild }) => ({
  plugins: [
    // Prerender (SSR) và `npm run dev` chạy bằng React thật vì vite-react-ssg tự gọi react-dom/server.
    // Chỉ bundle production cho trình duyệt dùng preact/compat để giữ JS < 80 KB nén.
    // Kiểm tra hydrate sau khi build: npm run check:hydrate
    command === 'build' && !isSsrBuild
      ? preact({ reactAliasesEnabled: true, prerender: { enabled: false } })
      : react(),
    tailwindcss(),
    imagetools({
      // Ảnh import kèm ?responsive sẽ ra AVIF + WebP ở nhiều kích thước.
      // Có thể ghi đè độ rộng: `anh.png?w=120;240&responsive`. Không phóng to quá ảnh gốc.
      defaultDirectives: (url) => {
        if (url.searchParams.has('responsive')) {
          return new URLSearchParams({
            format: 'avif;webp',
            // Bước nhỏ ở đầu để mobile (DPR ~1.75–3) không phải tải ảnh lớn hơn cần
            w: url.searchParams.get('w') ?? '320;480;640;800;1200',
            as: 'picture',
          })
        }
        return new URLSearchParams()
      },
    }),
  ],
  ssgOptions: {
    // /chinh-sach-bao-mat -> dist/chinh-sach-bao-mat.html. Cloudflare Pages và vite preview
    // đều phục vụ file này ở URL không có "/" cuối (khớp với link trong trang).
    dirStyle: 'flat',
    // react-helmet chèn title/meta lên đầu <head>, đẩy <meta charset> ra sau 1 KB đầu: đưa nó về đầu
    onPageRendered: (_route, html) => {
      const charset = html.match(/<meta charset=[^>]*>/i)?.[0]
      return charset ? html.replace(charset, '').replace(/<head>/i, `<head>${charset}`) : html
    },
    onFinished: writeSitemap,
    // Có cài `beasties`: CSS cần cho màn hình đầu được nhúng vào HTML, file CSS đầy đủ tải bất đồng bộ
    // (preload + onload, kèm <noscript> cho trình duyệt tắt JS)
    beastiesOptions: { preload: 'swap', noscriptFallback: true },
  },
}))
