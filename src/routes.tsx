import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import CenterManagement from './pages/CenterManagement'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Xuất phẳng: dist/phan-mem-quan-ly-trung-tam.html (centerPagePath trong vi.ts)
      { path: 'phan-mem-quan-ly-trung-tam', element: <CenterManagement /> },
    ],
  },
]
