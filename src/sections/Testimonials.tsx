import Container from '../components/Container'
import PaperCard from '../components/PaperCard'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

// Bật khi đã có cảm nhận thật của trung tâm đang dùng (có sự đồng ý), thay hết [[TODO]] trong vi.ts.
// Đang tắt: phần này không render, không có trong HTML.
export const SHOW_TESTIMONIALS: boolean = false

const { testimonials } = home

export default function Testimonials() {
  if (!SHOW_TESTIMONIALS) return null
  return (
    <Container className="pb-section">
      <section id="cam-nhan" aria-labelledby="cam-nhan-title">
        <SectionTitle id="cam-nhan-title" lesson={testimonials.lesson}>
          {testimonials.title}
        </SectionTitle>
        <ul className="mt-7 grid gap-4 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <PaperCard as="li" key={i} className="flex flex-col p-5 shadow-card">
              <blockquote className="flex-1 leading-relaxed text-text">“{t.quote}”</blockquote>
              <p className="mt-4 font-semibold text-ink">{t.name}</p>
              <p className="text-sm text-text-muted">{t.center}</p>
            </PaperCard>
          ))}
        </ul>
      </section>
    </Container>
  )
}
