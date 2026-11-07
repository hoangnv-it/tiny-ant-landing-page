import Icon from '../components/icons'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { problems } = home

// "Có quen không?" — nỗi vất vả của chủ trung tâm, viết trên trang vở ô ly (mỗi ý một dòng kẻ).
export default function Problems() {
  return (
    <section id="van-de" aria-labelledby="van-de-title" className="min-w-0">
      <SectionTitle id="van-de-title" lesson={problems.lesson} className="xl:text-h2-half">
        {problems.title}
      </SectionTitle>
      <NotebookList items={problems.items} className="mt-6" />
      <a
        href="#vong-doi"
        className="mt-3 flex min-h-11 items-start gap-3 py-2.5 font-semibold text-ink hover:underline"
      >
        <Icon name="arrowForward" className="mt-0.5 size-5 shrink-0" />
        {problems.conclusion}
      </a>
    </section>
  )
}

/** Danh sách đánh số đỏ trên nền vở ô ly; dòng chữ cao đúng 2rem để nằm trên dòng kẻ */
export function NotebookList({
  items,
  className = '',
}: {
  items: readonly string[]
  className?: string
}) {
  return (
    <ol
      className={`notebook rounded-caption border border-border py-8 pr-4 pl-11 shadow-card ${className}`}
    >
      {items.map((item, i) => (
        <li key={item} className="relative leading-8 text-text">
          <span
            aria-hidden="true"
            className="absolute top-1 -left-8 grid size-6 place-items-center rounded-full bg-accent-red text-sm font-bold text-white"
          >
            {i + 1}
          </span>
          {item}
        </li>
      ))}
    </ol>
  )
}
