import Container from '../components/Container'
import Illustration from '../components/Illustration'
import Seo from '../components/Seo'
import Sprig from '../components/Sprig'
import { homeJsonLd } from '../lib/structuredData'
import Audiences from '../sections/Audiences'
import Cta from '../sections/Cta'
import Faq from '../sections/Faq'
import Friends from '../sections/Friends'
import Hero from '../sections/Hero'
import Library from '../sections/Library'
import Problems from '../sections/Problems'
import Steps from '../sections/Steps'
import Why from '../sections/Why'
import { home } from '../content/vi'

export default function Home() {
  const { meta } = home
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" jsonLd={homeJsonLd} />

      <Hero />

      {/* Hàng 2: vấn đề + tab đối tượng. Cạnh nhau từ 1280px, xếp dọc ở màn nhỏ hơn */}
      <Container
        id="hang-2"
        className="grid gap-section py-section xl:grid-cols-[1.1fr_1fr] xl:gap-10 xl:pt-12"
      >
        <Problems />
        <Audiences />
      </Container>

      {/* Hàng 3: 3 bước, rồi lý do | tranh cây phượng | thư viện (3 cột từ 1280px như thiết kế) */}
      <Container
        id="hang-3"
        className="grid gap-section pb-section xl:grid-cols-[35fr_22fr_39fr] xl:gap-x-4 xl:gap-y-section-lg"
      >
        {/* 3 bước: hàng riêng, rộng hết khung như thiết kế */}
        <div className="xl:col-span-3">
          <Steps />
        </div>
        <Why />
        {/* Tranh trang trí giữa hai cột; màn nhỏ nằm giữa, dưới phần lý do.
            Từ 1280px: chân tranh bám sát viền khung hàng cuối (lấn xuống phần pb-section),
            ngọn cây cao ngang nhãn "Điểm mạnh"; chiều rộng theo tỉ lệ ảnh, tràn đều hai bên cột */}
        <div className="xl:relative">
          <Illustration
            name="why-tree"
            sizes="(min-width: 1280px) 420px, 280px"
            pictureClassName="mx-auto block w-full max-w-72 xl:absolute xl:-bottom-[calc(var(--spacing-section)-0.25rem)] xl:left-1/2 xl:h-[calc(100%+var(--spacing-section)-1.5rem)] xl:aspect-[590/665] xl:w-auto xl:max-w-none xl:-translate-x-1/2"
            className="w-full xl:h-full"
          />
        </div>
        <Library />
      </Container>

      {/* Hàng cuối: một khung giấy lớn — FAQ | khối đăng ký | tranh "Hòn đá to". Cạnh nhau từ 1280px */}
      <Container id="hang-4">
        <div className="relative rounded-sheet border-[1.5px] border-border px-5 pt-8 pb-12 sm:px-8 xl:px-12 xl:pt-8 xl:pb-20">
          <Sprig className="absolute top-12 right-[6%] hidden w-16 xl:block" />
          <Sprig className="absolute bottom-6 left-[30%] hidden w-16 xl:block" />
          <Sprig className="absolute right-[4%] bottom-14 hidden w-16 xl:block" />
          <div className="grid gap-section md:grid-cols-2 xl:grid-cols-[545fr_450fr_365fr] xl:gap-9 [&>*]:min-w-0">
            <div className="md:col-span-2 xl:col-span-1">
              <Faq />
            </div>
            <div className="xl:pt-[9.5rem]">
              <Cta />
            </div>
            <div className="xl:pt-[7.5rem]">
              <Friends />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
