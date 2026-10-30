import Icon from '../components/icons'
import Illustration from '../components/Illustration'
import { contact, demoAnchor, home } from '../content/vi'

const { cta } = home

// Khối đăng ký demo cuối trang (id #dang-ky): nền xanh mực, viền trong kép như bìa sách.
// Nút là link #dang-ky -> LeadModal mở pop-up. Tắt JS: hiện cách liên hệ trực tiếp.
// Tranh "Cánh đồng mùa thu" dán chồng góc dưới phải (từ xl).
export default function Cta() {
  return (
    <section id="dang-ky" aria-labelledby="dang-ky-title" className="relative min-w-0">
      <div className="rounded-[1.25rem] bg-ink-700 p-3 text-white shadow-card">
        <div className="rounded-xl border-[1.5px] border-white/45 px-6 pt-8 pb-8 md:px-8 xl:px-7">
          <h2
            id="dang-ky-title"
            className="font-heading text-xl leading-snug font-normal text-white sm:max-md:text-2xl"
          >
            {cta.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-white/90">{cta.lead}</p>

          <p className="nojs-only mt-6 rounded-card bg-white/10 p-4 text-white">
            {cta.noJs}{' '}
            <a href={`tel:${contact.phone}`} className="font-semibold underline">
              {contact.phoneDisplay}
            </a>{' '}
            {cta.noJsOr}{' '}
            <a href={`mailto:${contact.email}`} className="font-semibold underline">
              {contact.email}
            </a>
            .
          </p>

          <a
            href={demoAnchor.slice(1)}
            data-position="cta"
            className="js-only mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-[0.625rem] bg-card px-4 py-2 text-center font-bold tracking-wide text-balance text-ink transition-colors hover:bg-white focus-visible:outline-white"
          >
            {cta.button}
            <Icon name="arrowForward" className="size-5" />
          </a>
          <p className="mt-6 text-white/90">{cta.note}</p>
        </div>
      </div>

      {/* Tranh dán chồng góc dưới phải, viền giấy dày như ảnh dán vở */}
      <div className="mx-auto mt-4 w-56 rounded-xl border border-border bg-caption p-1.5 shadow-card xl:absolute xl:-right-[38%] xl:-bottom-24 xl:mt-0 xl:w-[13.75rem]">
        <Illustration
          name="road-bikes"
          sizes="220px"
          pictureClassName="block"
          className="print-frame aspect-[8/5] w-full object-cover"
        />
      </div>
    </section>
  )
}
