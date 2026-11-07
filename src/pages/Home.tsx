import Container from '../components/Container'
import Seo from '../components/Seo'
import { homeJsonLd } from '../lib/structuredData'
import BeforeAfter from '../sections/BeforeAfter'
import FaqCtaSheet from '../sections/FaqCtaSheet'
import Hero from '../sections/Hero'
import Lifecycle from '../sections/Lifecycle'
import { PricingTeaser, SchoolsNote } from '../sections/PricingTeaser'
import Problems from '../sections/Problems'
import Steps from '../sections/Steps'
import Testimonials from '../sections/Testimonials'
import { home } from '../content/vi'

// Trang chủ kể theo hành trình của chủ trung tâm: nỗi vất vả -> trước/sau -> vòng đời học viên
// -> bắt đầu -> (cảm nhận) -> giá -> nhà trường -> FAQ + đăng ký.
export default function Home() {
  const { meta } = home
  return (
    <>
      <Seo title={meta.title} description={meta.description} path="/" jsonLd={homeJsonLd} />

      <Hero />

      {/* Nỗi vất vả + bảng trước/sau: cạnh nhau từ 1280px */}
      <Container className="grid gap-section py-section xl:grid-cols-[1fr_1.2fr] xl:gap-12 xl:pt-12">
        <Problems />
        <BeforeAfter />
      </Container>

      <Container className="pb-section">
        <Lifecycle />
      </Container>

      <Container className="pb-section">
        <Steps />
      </Container>

      <Testimonials />

      <Container className="grid gap-section pb-section xl:grid-cols-[2fr_1fr] xl:items-start xl:gap-10">
        <PricingTeaser />
        <SchoolsNote />
      </Container>

      <FaqCtaSheet />
    </>
  )
}
