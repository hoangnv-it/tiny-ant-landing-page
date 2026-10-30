import Icon from '../components/icons'
import Illustration from '../components/Illustration'
import PaperCard from '../components/PaperCard'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { problems } = home

// "Quen thuộc với thầy cô không?" — 4 thẻ vấn đề.
// Mobile: trượt ngang có snap, thẻ rộng 80% để lộ mép thẻ sau (gợi ý còn nữa) và giữ section ngắn.
// Tablet: lưới 2×2. Máy tính (≥1280, nằm cạnh section tab): 4 cột.
export default function Problems() {
  return (
    <section id="van-de" aria-labelledby="van-de-title" className="min-w-0">
      <SectionTitle id="van-de-title" lesson={problems.lesson} className="xl:text-h2-half">
        {problems.title}
      </SectionTitle>

      <ol
        aria-label={problems.listLabel}
        // Vùng cuộn được phải nhận focus bàn phím (mobile)
        tabIndex={0}
        className="-mx-4 mt-6 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4 xl:gap-3"
      >
        {problems.items.map((item, i) => (
          <PaperCard
            as="li"
            key={item.title}
            // Giấy ngả vàng như thiết kế: nền aged, viền nâu xám, mép tối nhẹ (vignette)
            className="flex w-[80%] shrink-0 snap-start flex-col overflow-hidden rounded-xl! border-aged-edge! bg-aged! shadow-[inset_0_0_28px_rgb(200_161_101/0.18)] md:w-auto"
          >
            <Illustration
              name={item.image}
              sizes="(min-width: 1280px) 160px, (min-width: 768px) 45vw, 80vw"
              pictureClassName="block"
              // Tranh tràn mép trên thẻ, hoà vào nền giấy ở mép trên
              className="aspect-16/9 w-full [mask-image:linear-gradient(to_bottom,transparent,black_18%)] object-cover xl:aspect-4/3"
            />
            <div className="flex flex-1 flex-col gap-2 px-4 pt-3 pb-5 xl:px-3">
              <h3 className="flex items-start gap-2 font-heading text-h3 leading-snug font-semibold xl:text-sm">
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-red font-sans text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-text xl:leading-normal">{item.text}</p>
            </div>
          </PaperCard>
        ))}
      </ol>

      <a
        href="#trung-tam"
        className="mt-3 flex min-h-11 items-start gap-3 py-2.5 font-semibold text-ink hover:underline"
      >
        <Icon name="arrowForward" className="mt-0.5 size-5 shrink-0" />
        {problems.conclusion}
      </a>
    </section>
  )
}
