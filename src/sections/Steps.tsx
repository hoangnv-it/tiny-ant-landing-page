import Illustration from '../components/Illustration'
import { home } from '../content/vi'

const { steps } = home

// Thẻ có tranh cảnh rộng: tranh tràn mép trên và hai bên thẻ, mờ dần xuống phần chữ (bước 3 trong thiết kế)
const FULL_BLEED: ReadonlySet<string> = new Set(['step-3'])

// Tranh nhỏ ở giữa thẻ: mờ 4 cạnh cho hoà vào nền giấy
const centeredImg =
  'h-full w-auto max-w-[70%] [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent),linear-gradient(to_bottom,transparent,black_10%,black_88%,transparent)] [mask-composite:intersect] object-contain'

/** Mũi tên mảnh giữa các thẻ (trang trí) */
function StepArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 24"
      aria-hidden="true"
      fill="none"
      className={`shrink-0 text-text-muted ${className}`}
    >
      <path
        d="M2 12h26M20 5l8 7-8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// "Bắt đầu trong 3 bước" theo thiết kế: gạch đỏ + tiêu đề; 3 thẻ giấy rộng, số tròn góc trái,
// tranh ở giữa, tiêu đề đậm + dòng phụ; mũi tên mảnh giữa các thẻ. Mobile: xếp dọc, mũi tên xuống.
export default function Steps() {
  return (
    <section id="bat-dau" aria-labelledby="bat-dau-title" className="min-w-0">
      <h2 id="bat-dau-title" className="flex items-center gap-4 text-h2 font-bold lg:text-h2-lg">
        <span aria-hidden="true" className="h-[3px] w-10 shrink-0 bg-accent-red" />
        {steps.title}
      </h2>

      <ol className="mt-7 flex flex-col items-center gap-2 md:flex-row md:items-stretch md:gap-3">
        {steps.items.map((s, i) => (
          <li key={s.title} className="contents">
            <div className="relative flex w-full max-w-sm flex-1 flex-col items-center overflow-hidden rounded-xl border border-border bg-step-card px-5 pt-5 pb-6 text-center shadow-card md:max-w-none">
              <span
                aria-hidden="true"
                className="absolute top-4 left-4 z-10 grid size-9 place-items-center rounded-full bg-ink text-lg font-bold text-white"
              >
                {i + 1}
              </span>
              {FULL_BLEED.has(s.image) ? (
                <Illustration
                  name={s.image}
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 32vw, 384px"
                  pictureClassName="-mx-5 -mt-5 block w-[calc(100%+2.5rem)]"
                  className="aspect-[638/366] w-full [mask-image:linear-gradient(to_bottom,black_72%,transparent)] object-cover md:aspect-auto md:h-[11.25rem] lg:h-[13.25rem]"
                />
              ) : (
                <Illustration
                  name={s.image}
                  sizes="(min-width: 768px) 260px, 70vw"
                  pictureClassName="flex h-40 w-full items-center justify-center lg:h-48"
                  className={centeredImg}
                />
              )}
              <h3 className="mt-4 font-sans text-xl font-semibold text-ink lg:text-2xl">
                {s.title}
              </h3>
              <p className="mt-1.5 text-text lg:text-lg">{s.text}</p>
            </div>
            {i < steps.items.length - 1 && (
              <StepArrow className="w-7 rotate-90 self-center md:w-8 md:rotate-0" />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
