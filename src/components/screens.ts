import parentHome from '../assets/screenshots/cropped/parent-home.png?w=240;480&responsive'

// Ảnh chụp màn hình app: src/assets/screenshots/<tên>.png|webp, hiển thị ~240px nên xuất 1x/2x.
const files = import.meta.glob<ResponsivePicture>('../assets/screenshots/app-*.{png,jpg,webp}', {
  eager: true,
  query: '?w=240;480&responsive',
  import: 'default',
})

// Ảnh tạm khi chưa có file đúng tên
const fallbacks: Partial<Record<ScreenName, ResponsivePicture>> = {
  'app-parent-today': parentHome,
}

export type ScreenName = 'app-attendance' | 'app-parent-today'

export function findScreen(name: ScreenName): ResponsivePicture | undefined {
  for (const ext of ['png', 'webp', 'jpg']) {
    const pic = files[`../assets/screenshots/${name}.${ext}`]
    if (pic) return pic
  }
  return fallbacks[name]
}
