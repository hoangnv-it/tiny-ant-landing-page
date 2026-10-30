import Illustration from '../components/Illustration'
import { LessonTag } from '../components/SectionTitle'
import { home } from '../content/vi'

const { faq } = home

// Câu hỏi thường gặp: <details>/<summary>, câu trả lời luôn có trong HTML prerender.
// Dấu + : thanh dọc xoay 90° khi mở, chồng lên thanh ngang thành dấu −.
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="min-w-0">
      <h2 id="faq-title" className="font-bold">
        <LessonTag className="pr-6 lg:text-lg">{faq.lesson}</LessonTag>
        <span className="mt-2 block text-h2 lg:text-[2.75rem] lg:leading-tight xl:whitespace-nowrap">
          {faq.title}
        </span>
      </h2>
      <p className="mt-1 font-heading text-xl text-ink lg:text-2xl">{faq.subtitle}</p>

      <div className="mt-5 grid gap-5 rounded-[1.25rem] border border-border bg-caption p-4 sm:grid-cols-[10rem_1fr] sm:p-6 xl:grid-cols-[11rem_1fr]">
        {/* Tranh "Đàn gà mới nở" trong khung ảnh viền giấy */}
        <div className="hidden self-start rounded-caption border border-border bg-white p-2 shadow-card sm:block">
          <Illustration
            name="faq-boy"
            sizes="176px"
            pictureClassName="block"
            className="w-full rounded-card [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]"
          />
        </div>

        <div className="min-w-0 border-b border-border">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-border last:border-b-0">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-text hover:text-ink hover:underline [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="relative size-3.5 shrink-0 text-ink-500">
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 rounded-full bg-current transition-transform duration-200 group-open:rotate-90 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="pr-8 pb-4 text-sm leading-relaxed text-text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
