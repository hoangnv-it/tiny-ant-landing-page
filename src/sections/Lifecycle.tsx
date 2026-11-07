import Icon from '../components/icons'
import Media from '../components/Media'
import PaperCard from '../components/PaperCard'
import SectionTitle, { LessonTag } from '../components/SectionTitle'
import { home } from '../content/vi'

const { lifecycle } = home
type Block = (typeof lifecycle.blocks)[number]

// Bố cục: khối nổi bật (Tuyển sinh, Học phí) chiếm cả hàng, có viền đậm và nhãn "Điểm khác biệt".
// Khối thường đứng cạnh nhau từng cặp; khối lẻ một mình thì cũng chiếm cả hàng (ảnh nằm bên phải).
function layoutOf(blocks: readonly Block[]) {
  const out: ('featured' | 'wide' | 'half')[] = []
  let pairOpen = false
  blocks.forEach((block, i) => {
    const next = blocks[i + 1]
    if (block.featured) out.push('featured')
    else if (pairOpen) {
      out.push('half')
      pairOpen = false
      return
    } else if (next && !next.featured) {
      out.push('half')
      pairOpen = true
      return
    } else out.push('wide')
    pairOpen = false
  })
  return out
}
const layouts = layoutOf(lifecycle.blocks)

// "Vòng đời một học viên tại trung tâm": 6 khối theo thứ tự tuyển sinh -> chủ trung tâm,
// mỗi khối có h2, 3–4 ý, ảnh và link "Xem chi tiết" sang trang tính năng.
export default function Lifecycle() {
  return (
    <section id="vong-doi" aria-labelledby="vong-doi-title" className="min-w-0">
      <SectionTitle id="vong-doi-title" lesson={lifecycle.lesson}>
        {lifecycle.title}
      </SectionTitle>
      <p className="mt-3 max-w-3xl text-lead">{lifecycle.lead}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:gap-8">
        {lifecycle.blocks.map((b, i) => (
          <LifecycleBlock key={b.id} block={b} layout={layouts[i]} />
        ))}
      </div>
    </section>
  )
}

function LifecycleBlock({
  block: b,
  layout,
}: {
  block: Block
  layout: 'featured' | 'wide' | 'half'
}) {
  const featured = layout === 'featured'
  const content = (
    <div className="min-w-0">
      <LessonTag>{b.step}</LessonTag>
      {featured && (
        <span className="ml-3 inline-block rounded-full bg-accent-red px-2.5 py-0.5 align-top text-xs font-bold text-white">
          {lifecycle.highlight}
        </span>
      )}
      <h2 className={`font-bold ${featured ? 'text-h2 lg:text-h2-lg' : 'text-h3 lg:text-h3-lg'}`}>
        {b.title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {b.points.map((p) => (
          <li key={p} className="flex gap-3 leading-relaxed text-text">
            <Icon name="checkCircle" className="mt-0.5 size-5 shrink-0 text-ink-500" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-x-6">
        {b.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-ink hover:underline"
          >
            {l.label}
            <Icon name="arrowForward" className="size-4" />
          </a>
        ))}
      </div>
    </div>
  )
  const media = (
    <Media
      media={b.media}
      sizes="(min-width: 768px) 40vw, 90vw"
      className={b.media.kind === 'screen' ? '' : 'mx-auto w-full max-w-md'}
    />
  )

  if (featured) {
    return (
      <article
        id={b.id}
        className="grid gap-8 rounded-[1.25rem] border-2 border-ink-500 bg-card p-5 shadow-card md:col-span-2 md:grid-cols-[1.15fr_1fr] md:items-center md:p-8 xl:p-10"
      >
        {content}
        {media}
      </article>
    )
  }
  return (
    <PaperCard
      as="article"
      id={b.id}
      className={`p-5 shadow-card md:p-6 ${
        layout === 'wide'
          ? 'grid gap-6 md:col-span-2 md:grid-cols-[1.4fr_1fr] md:items-center'
          : 'flex flex-col gap-6'
      }`}
    >
      {content}
      {media}
    </PaperCard>
  )
}
