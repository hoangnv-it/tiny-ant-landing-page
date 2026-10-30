import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import Icon from '../components/icons'
import Illustration from '../components/Illustration'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { audiences } = home
const tabs = audiences.tabs
const indexOfHash = (hash: string) => tabs.findIndex((t) => `#${t.anchor}` === hash)

// "Mỗi người một màn hình, chung một dữ liệu" — tab theo mẫu ARIA (kích hoạt tự động).
// Cả 4 panel đều có trong HTML prerender, panel không chọn ẩn bằng thuộc tính hidden.
export default function Audiences() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const select = (i: number, focus = false) => {
    setActive(i)
    if (focus) tabRefs.current[i]?.focus({ preventScroll: true })
  }

  // Thanh tab trượt ngang trên mobile: mỗi lần đổi tab (bấm, phím, link neo) đưa tab đó vào tầm nhìn.
  // Chỉ cuộn ngang thanh tab, không đụng tới vị trí cuộn dọc của trang.
  useEffect(() => {
    const tab = tabRefs.current[active]
    const list = tab?.parentElement
    if (tab && list && list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - list.offsetLeft - 16, behavior: 'smooth' })
    }
  }, [active])

  // Link /#nha-truong, /#phu-huynh… (header, menu mobile, tải trang có hash) mở đúng tab.
  // Bắt cả click vì bấm lại cùng một hash thì trình duyệt không phát sự kiện hashchange.
  useEffect(() => {
    const fromHash = (hash: string) => {
      const i = indexOfHash(hash)
      if (i >= 0) setActive(i)
    }
    fromHash(location.hash)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href*="#"]') as HTMLAnchorElement | null
      if (a && a.pathname === location.pathname) fromHash(a.hash)
    }
    const onHash = () => fromHash(location.hash)
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', onHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', onHash)
    }
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    select(next, true)
  }

  return (
    <section id="trung-tam" aria-labelledby="doi-tuong-title" className="relative min-w-0">
      {/* Neo cho link header: cùng vị trí với section */}
      {tabs.slice(1).map((t) => (
        <span key={t.anchor} id={t.anchor} aria-hidden="true" className="absolute top-0" />
      ))}

      <SectionTitle id="doi-tuong-title" lesson={audiences.lesson} className="xl:text-h2-half">
        {audiences.title}
      </SectionTitle>

      <div
        role="tablist"
        aria-label={audiences.tabsLabel}
        onKeyDown={onKeyDown}
        className="js-only relative z-10 -mx-4 mt-6 -mb-2 flex snap-x scroll-px-4 gap-1.5 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0"
      >
        {tabs.map((t, i) => {
          const selected = i === active
          return (
            <button
              key={t.anchor}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${t.anchor}`}
              aria-selected={selected}
              aria-controls={`panel-${t.anchor}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className="relative flex min-w-36 shrink-0 snap-start items-center justify-center gap-1.5 rounded-t-panel border border-b-0 border-border bg-paper-dark px-3 py-3 font-semibold whitespace-nowrap text-ink transition-colors hover:bg-card aria-selected:border-ink-500 aria-selected:bg-ink-500 aria-selected:text-white aria-selected:after:absolute aria-selected:after:top-full aria-selected:after:left-1/2 aria-selected:after:-translate-x-1/2 aria-selected:after:border-x-8 aria-selected:after:border-t-8 aria-selected:after:border-x-transparent aria-selected:after:border-t-ink-500 md:min-w-0 xl:px-2 xl:text-sm"
            >
              <Icon name={t.icon} className="size-6 shrink-0" />
              {t.label}
            </button>
          )
        })}
      </div>

      {tabs.map((t, i) => {
        const next = tabs[(i + 1) % tabs.length]
        return (
          <div
            key={t.anchor}
            role="tabpanel"
            id={`panel-${t.anchor}`}
            aria-labelledby={`tab-${t.anchor}`}
            tabIndex={0}
            hidden={i !== active}
            className="relative rounded-b-panel border border-border bg-card p-4 shadow-card md:p-6 xl:p-5"
          >
            {/* Chỉ hiện khi tắt JavaScript (mọi panel cùng hiện, không có thanh tab) */}
            <p className="nojs-only mb-3 flex items-center gap-2 font-semibold text-ink">
              <Icon name={t.icon} className="size-5" />
              {t.label}
            </p>
            <div className="grid gap-5 md:grid-cols-[13rem_1fr] md:gap-7 xl:grid-cols-[11rem_1fr] xl:gap-6">
              <Illustration
                name={t.image}
                sizes="(min-width: 768px) 208px, calc(100vw - 66px)"
                pictureClassName="block md:h-full"
                className="print-frame aspect-16/10 w-full object-cover object-[center_25%] md:aspect-auto md:h-full md:min-h-56"
              />
              <div>
                <h3 className="text-h3 font-bold xl:text-h3-lg">{t.title}</h3>
                <ul className="mt-4 flex flex-col gap-3 pr-8">
                  {t.points.map((p) => (
                    <li key={p.lead} className="flex gap-3 text-sm leading-relaxed">
                      <Icon name="checkCircle" className="mt-0.5 size-5 shrink-0 text-ink-500" />
                      <span>
                        <strong className="font-semibold text-ink">{p.lead}</strong> {p.text}
                        {'strong' in p && (
                          <>
                            {' '}
                            <strong className="font-semibold text-ink">{p.strong}</strong>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => select(tabs.indexOf(next), true)}
              aria-label={`${audiences.nextPrefix} ${next.label}`}
              className="js-only absolute right-2 bottom-2 grid size-11 place-items-center rounded-full text-ink-500 hover:bg-paper-dark"
            >
              <Icon name="arrowForward" className="size-6" />
            </button>
          </div>
        )
      })}
    </section>
  )
}
