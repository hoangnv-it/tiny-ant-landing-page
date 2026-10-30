import Button from './Button'
import Icon from './icons'
import { contact } from '../content/vi'

type Props = { size?: 'md' | 'sm'; position: string; className?: string }

// Nút "Nhắn Zalo": viền ink, mở zalo.me theo số điện thoại liên hệ ở tab mới.
// data-position để biết khách bấm từ đâu (giống các nút đăng ký).
export default function ZaloButton({ size = 'md', position, className = '' }: Props) {
  return (
    <Button
      href={contact.zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="outline"
      size={size}
      data-position={position}
      data-zalo=""
      className={className}
    >
      <Icon name="chat" className={size === 'sm' ? 'size-4' : 'size-5'} />
      {contact.zaloCta}
      <span className="sr-only">{contact.newTab}</span>
    </Button>
  )
}
