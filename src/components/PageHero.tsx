import type { ReactNode } from 'react'
import Button from './Button'
import Container from './Container'
import Media, { type MediaSpec } from './Media'
import { LessonTag } from './SectionTitle'
import ZaloButton from './ZaloButton'
import { demoAnchor, home, subpage } from '../content/vi'

export type Crumb = { name: string; href: string }

/** Đường dẫn "Trang chủ › … › Trang này"; mục cuối là trang hiện tại (không phải link) */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label={subpage.breadcrumbLabel}>
      <ol className="flex flex-wrap items-center gap-x-2 text-sm text-text-muted">
        {items.map((c, i) =>
          i < items.length - 1 ? (
            <li key={c.href} className="flex items-center gap-x-2">
              <a
                href={c.href}
                className="inline-flex min-h-11 items-center hover:text-ink hover:underline"
              >
                {c.name}
              </a>
              <span aria-hidden="true">›</span>
            </li>
          ) : (
            <li key={c.href} aria-current="page" className="py-3 font-semibold text-ink">
              {c.name}
            </li>
          ),
        )}
      </ol>
    </nav>
  )
}

type Props = {
  crumbs: Crumb[]
  lesson: string
  title: string
  lead: ReactNode
  media?: MediaSpec
  /** Ẩn 2 nút đăng ký / Zalo (trang chính sách, 404) */
  noCta?: boolean
  /** Vị trí nút cho data-position, ví dụ "quan-ly-hoc-phi-hero" */
  position: string
}

// Phần mở đầu của trang con: breadcrumb, nhãn bài, h1, đoạn mở đầu, 2 nút, ảnh bên phải (từ lg).
export default function PageHero({ crumbs, lesson, title, lead, media, noCta, position }: Props) {
  return (
    <Container
      className={`grid gap-10 pt-2 pb-section ${media ? 'lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12' : ''}`}
    >
      <div className="min-w-0">
        <Breadcrumbs items={crumbs} />
        <LessonTag className="mt-3">{lesson}</LessonTag>
        <h1 className="text-h1 font-bold md:text-h1-lg">{title}</h1>
        <div className="mt-5 max-w-3xl text-lead lg:text-lead-lg">{lead}</div>
        {!noCta && (
          <>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={demoAnchor} data-position={position}>
                {home.hero.primaryCta}
              </Button>
              <ZaloButton position={position} />
            </div>
            <p className="mt-5 text-sm text-text-muted">{home.hero.note}</p>
          </>
        )}
      </div>
      {media && (
        <Media
          media={media}
          priority
          className={media.kind === 'screen' ? '' : 'mx-auto w-full max-w-lg'}
        />
      )}
    </Container>
  )
}
