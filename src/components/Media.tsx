import Illustration from './Illustration'
import type { IllustrationName } from './illustrations'
import PhoneFrame from './PhoneFrame'
import { findScreen, type ScreenName } from './screens'

/** Ảnh đi kèm một khối nội dung: tranh minh hoạ (trang trí), ảnh chụp app, hoặc khung chờ ảnh thật. */
export type MediaSpec =
  | { kind: 'illustration'; name: IllustrationName }
  | { kind: 'screen'; name: ScreenName; alt: string }
  // Chưa có ảnh: khung cố định tỉ lệ (không xô lệch bố cục khi thay ảnh thật), ghi rõ ảnh cần chụp
  | { kind: 'todo'; label: string; ratio?: string }

type Props = {
  media: MediaSpec
  /** Ảnh trên màn hình đầu (hero): tải ngay */
  priority?: boolean
  sizes?: string
  className?: string
}

// Tranh: khung ảnh dán vở (viền giấy, nghiêng nhẹ). Ảnh app: khung điện thoại.
export default function Media({
  media,
  priority,
  sizes = '(min-width: 1024px) 40vw, 90vw',
  className = '',
}: Props) {
  if (media.kind === 'screen') {
    return (
      <div className={`flex justify-center ${className}`}>
        <PhoneFrame
          src={findScreen(media.name)}
          alt={media.alt}
          placeholder={media.name}
          sizes="(min-width: 768px) 208px, 52vw"
          priority={priority}
          className="w-[52vw] max-w-52 rotate-2"
        />
      </div>
    )
  }
  if (media.kind === 'todo') {
    return (
      <div
        style={{ aspectRatio: media.ratio ?? '4 / 3' }}
        className={`grid w-full place-items-center rounded-caption border-2 border-dashed border-border bg-paper-dark p-4 text-center font-mono text-sm text-text ${className}`}
      >
        {media.label}
      </div>
    )
  }
  return (
    <div
      className={`rotate-1 rounded-[1.25rem] border border-border bg-caption p-2 shadow-card ${className}`}
    >
      <Illustration
        name={media.name}
        sizes={sizes}
        priority={priority}
        pictureClassName="block"
        className="print-frame aspect-[4/3] h-auto w-full object-cover"
      />
    </div>
  )
}
