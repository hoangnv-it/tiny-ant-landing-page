import { Link } from 'react-router-dom'
import Img from './Img'
import antMark from '../assets/favicon.png?w=48;96&responsive'
import { site } from '../content/vi'

// Logo = icon con kiến (ảnh trang trí) + chữ "Tiny Ant" bằng HTML.
export default function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link
      to="/"
      aria-label={site.homeLabel}
      className="flex min-h-11 shrink-0 items-center gap-2 font-heading text-2xl font-bold text-ink"
    >
      <Img
        src={antMark}
        alt=""
        sizes="36px"
        className="h-9 w-auto"
        pictureClassName="max-[359px]:hidden"
        priority={priority}
      />
      <span>{site.name}</span>
    </Link>
  )
}
