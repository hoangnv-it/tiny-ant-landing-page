import { ViteReactSSG } from 'vite-react-ssg'
import { loadClarity } from './lib/clarity'
import { routes } from './routes'
import './fonts'
import './index.css'

// useLegacyRender: trình duyệt chạy preact/compat (xem vite.config.ts), vốn có ReactDOM.hydrate
// nhưng không có hydrateRoot trên đối tượng react-dom.
export const createRoot = ViteReactSSG({ routes }, undefined, { useLegacyRender: true })

// Chỉ chạy trên trình duyệt ở bản build (không chạy lúc prerender, không chạy ở npm run dev)
if (!import.meta.env.SSR && import.meta.env.PROD) loadClarity()
