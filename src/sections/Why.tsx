import Icon from '../components/icons'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { why } = home

// "Vì sao thầy cô chọn Tiny Ant" theo thiết kế: 4 dòng, dấu tích tròn lớn màu ink, tiêu đề đậm + mô tả.
export default function Why() {
  return (
    <section id="ly-do" aria-labelledby="ly-do-title" className="relative z-10 min-w-0">
      <SectionTitle
        id="ly-do-title"
        lesson={why.lesson}
        className="xl:text-h2-why xl:whitespace-nowrap"
      >
        {why.title}
      </SectionTitle>

      <ul className="mt-6 grid gap-5 md:grid-cols-2 xl:mt-8 xl:grid-cols-1 xl:gap-6">
        {why.items.map((item) => (
          <li key={item.title} className="flex gap-3.5">
            <Icon name="checkCircle" className="size-9 shrink-0 text-ink" />
            <div>
              <h3 className="font-sans text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-0.5 text-text-muted">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
