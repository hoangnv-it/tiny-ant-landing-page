import { useRef } from 'react'
import { Head } from 'vite-react-ssg'
import bitterLatin700 from '@fontsource/bitter/files/bitter-latin-700-normal.woff2?url'
import bitterViet700 from '@fontsource/bitter/files/bitter-vietnamese-700-normal.woff2?url'
import ArtPicture from '../components/ArtPicture'
import Button from '../components/Button'
import { findIllustration } from '../components/illustrations'
import PhoneFrame from '../components/PhoneFrame'
import ZaloButton from '../components/ZaloButton'
import { findScreen } from '../components/screens'
// Bản rất nhỏ của hero-kids cho nền mờ 20% trên mobile (cùng file với slot hero-kids trong illustrations.ts)
import kidsSmall from '../assets/illustrations/Watercolor Schooldays Under Green Leaves.webp?w=240&responsive'
import { demoAnchor, heroVideoUrl, home } from '../content/vi'

const { hero } = home

const kids = findIllustration('hero-kids')
const school = findIllustration('hero-school')
const attendance = findScreen('app-attendance')
const parentToday = findScreen('app-parent-today')

const DESKTOP = '(min-width: 1280px)'
const MOBILE = '(max-width: 1279px)'
const KIDS_SIZES = '30vw'
const KIDS_SMALL_SIZES = '240px'
const SCHOOL_SIZES = '38vw'
const PHONE_SIZES = '(min-width: 768px) 224px, 42vw'

/** <link rel=preload> cho bản AVIF của ảnh hero */
function preloadImage(
  pic: ResponsivePicture | undefined,
  sizes: string,
  media?: string,
  high = false,
) {
  const srcSet = pic?.sources.avif
  if (!srcSet) return null
  return (
    <link
      rel="preload"
      as="image"
      type="image/avif"
      imageSrcSet={srcSet}
      imageSizes={sizes}
      media={media}
      {...(high ? { fetchpriority: 'high' } : {})}
    />
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <Head>
        <link rel="preload" as="font" type="font/woff2" href={bitterLatin700} crossOrigin="" />
        <link rel="preload" as="font" type="font/woff2" href={bitterViet700} crossOrigin="" />
        {preloadImage(kids, KIDS_SIZES, DESKTOP, true)}
        {preloadImage(kidsSmall, KIDS_SMALL_SIZES, MOBILE, true)}
        {preloadImage(school, SCHOOL_SIZES, DESKTOP)}
        {preloadImage(attendance, PHONE_SIZES)}
        {preloadImage(parentToday, PHONE_SIZES)}
      </Head>

      {/* hero-kids — dưới xl: nền mờ 20% góc phải (bản 240px).
          Từ xl: trọn ảnh khổ ngang, rộng 30vw, neo đáy, lấn mép trái 7vw; mờ dần mép trên và mép phải */}
      {kids && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-4 -right-16 h-[26rem] w-[70vw] max-w-md [mask-image:linear-gradient(to_bottom,black_55%,transparent),linear-gradient(to_right,transparent,black_35%)] [mask-composite:intersect] opacity-20 xl:top-auto xl:right-auto xl:bottom-0 xl:-left-[7vw] xl:h-auto xl:w-[30vw] xl:max-w-none xl:[mask-image:linear-gradient(to_bottom,transparent,black_18%),linear-gradient(to_left,transparent,black_22%)] xl:opacity-100"
        >
          <ArtPicture
            large={kids}
            media={DESKTOP}
            largeSizes={KIDS_SIZES}
            small={kidsSmall}
            smallSizes={KIDS_SMALL_SIZES}
            pictureClassName="block h-full xl:h-auto"
            className="print-img h-full w-full object-contain object-top xl:h-auto"
          />
        </div>
      )}

      {/* Máy tính: hero-school đúng tỉ lệ, neo góc dưới phải; viền trái và trên mờ vào nền */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 hidden w-[38vw] [mask-image:linear-gradient(to_right,transparent,black_25%),linear-gradient(to_bottom,transparent,black_20%)] [mask-composite:intersect] xl:block"
      >
        {school && (
          <ArtPicture
            large={school}
            media={DESKTOP}
            largeSizes={SCHOOL_SIZES}
            pictureClassName="block"
            className="print-img h-auto w-full"
          />
        )}
      </div>

      <div className="relative grid gap-10 px-4 pt-10 pb-section md:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8 xl:min-h-hero xl:grid-cols-[20fr_42fr_38fr] xl:gap-0 xl:px-0 xl:py-0">
        {/* Máy tính: cột trống nhường chỗ cho hero-kids */}
        <div aria-hidden="true" className="hidden xl:block" />

        <div className="max-w-xl xl:max-w-none xl:self-center xl:px-8 xl:py-14">
          <h1 className="text-h1 font-bold md:text-h1-lg lg:text-h1-hero">
            {hero.titleLines.map((line) => (
              <span key={line} className="xl:block xl:whitespace-nowrap">
                {line}{' '}
              </span>
            ))}
            <span className="text-accent-red xl:block xl:whitespace-nowrap">
              {hero.titleAccent}
            </span>
          </h1>
          <p className="mt-5 text-lead xl:max-w-[34rem]">{hero.lead}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={demoAnchor.slice(1)} data-position="hero">
              {hero.primaryCta}
            </Button>
            <ZaloButton position="hero" />
            {heroVideoUrl && <VideoButton />}
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-text-muted">
            <DevicesIcon />
            {hero.note}
          </p>
        </div>

        {/* 2 điện thoại chồng lệch, đặt trên hero-school (hero-school chỉ hiện từ xl) */}
        <div className="relative flex items-center justify-center lg:pr-4 xl:justify-start xl:pr-0">
          <div className="relative flex items-start py-4 xl:ml-2 xl:py-8">
            <PhoneFrame
              src={attendance}
              alt={hero.attendanceAlt}
              placeholder="app-attendance"
              sizes={PHONE_SIZES}
              priority
              className="relative z-10 w-[42vw] max-w-phone -rotate-4 md:w-phone xl:w-48"
            />
            <PhoneFrame
              src={parentToday}
              alt={hero.parentAlt}
              sizes={PHONE_SIZES}
              priority
              className="-ml-[12vw] w-[40vw] max-w-phone translate-y-[-6%] rotate-5 md:-ml-16 md:w-52 xl:-ml-12 xl:w-44"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function DevicesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden="true" fill="none">
      <path
        d="M4 6h13v2M4 6v9h9M2 18h11M16 10h5v10h-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Chỉ render khi có heroVideoUrl. Iframe chỉ gắn src lúc mở để không tải sớm.
function VideoButton() {
  const ref = useRef<HTMLDialogElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const open = () => {
    if (frame.current) frame.current.src = heroVideoUrl
    ref.current?.showModal()
  }
  const close = () => {
    ref.current?.close()
    if (frame.current) frame.current.src = 'about:blank'
  }
  return (
    <>
      <Button variant="outline" onClick={open}>
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        {hero.secondaryCta}
      </Button>
      <dialog
        ref={ref}
        onClose={close}
        aria-label={hero.secondaryCta}
        className="m-auto w-[min(90vw,56rem)] rounded-panel bg-bezel p-0 backdrop:bg-bezel/70"
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-2 right-2 z-10 rounded-full bg-white px-3 py-1 text-sm font-semibold text-ink"
        >
          {hero.videoClose}
        </button>
        <iframe
          ref={frame}
          title={hero.secondaryCta}
          className="aspect-video w-full"
          allow="autoplay; fullscreen"
        />
      </dialog>
    </>
  )
}
