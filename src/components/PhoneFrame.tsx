import Img from './Img'

type Props = {
  /** Chưa có ảnh thì hiện placeholder ghi `placeholder` */
  src?: ResponsivePicture
  alt: string
  placeholder?: string
  sizes?: string
  className?: string
  priority?: boolean
}

// Khung điện thoại vẽ bằng CSS, bên trong là ảnh chụp màn hình app.
export default function PhoneFrame({
  src,
  alt,
  placeholder = '',
  sizes = '240px',
  className = '',
  priority,
}: Props) {
  return (
    <div className={`relative rounded-phone bg-bezel p-1.5 shadow-phone ${className}`}>
      <span
        aria-hidden="true"
        className="absolute top-3 left-1/2 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-bezel"
      />
      {/* pt-5: chừa chỗ thanh trạng thái để tai thỏ không che nội dung app */}
      <div className="overflow-hidden rounded-phone-screen bg-white pt-5">
        {src ? (
          <Img
            src={src}
            alt={alt}
            sizes={sizes}
            priority={priority}
            pictureClassName="block"
            className="block h-auto w-full"
          />
        ) : (
          <div
            aria-hidden="true"
            data-placeholder={placeholder}
            className="grid aspect-330/719 place-items-center bg-paper-dark font-mono text-xs text-text"
          >
            {placeholder}
          </div>
        )}
      </div>
    </div>
  )
}
