import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import type { FeatureContent } from './content/types'

// Mỗi trang con là một chunk riêng (lazy): trình duyệt chỉ tải JS + nội dung của trang đang xem.
// vite-react-ssg nạp sẵn chunk lazy trước khi hydrate, nên HTML prerender vẫn đầy đủ nội dung.
// Xuất phẳng: /quan-ly-hoc-phi -> dist/quan-ly-hoc-phi.html

// Trang tính năng / đối tượng: mỗi file src/content/features/<duong-dan>.ts là một trang
const features = import.meta.glob<{ default: FeatureContent }>('./content/features/*.ts')
const featureRoutes: RouteRecord[] = Object.entries(features).map(([file, load]) => ({
  path: file.replace(/^.*\/(.+)\.ts$/, '$1'),
  lazy: async () => {
    const [{ default: content }, { default: FeaturePage }] = await Promise.all([
      load(),
      import('./pages/FeaturePage'),
    ])
    return { Component: () => <FeaturePage content={content} /> }
  },
}))

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...featureRoutes,
      { path: 'bang-gia', lazy: () => import('./pages/Pricing') },
      { path: 'chinh-sach-bao-mat', lazy: () => import('./pages/Privacy') },
      // Mọi đường dẫn khác: trang 404 (prerender ra dist/404.html, xem includedRoutes trong vite.config.ts)
      { path: '*', lazy: () => import('./pages/NotFound') },
    ],
  },
]
