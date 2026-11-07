import Container from '../components/Container'
import Sprig from '../components/Sprig'
import Cta from './Cta'
import Faq, { type FaqContent } from './Faq'
import Friends from './Friends'

// Hàng cuối của mọi trang: một khung giấy lớn — FAQ | khối đăng ký | tranh "Hòn đá to". Cạnh nhau từ 1280px
export default function FaqCtaSheet({ faq }: { faq?: FaqContent }) {
  return (
    <Container id="hang-4">
      <div className="relative rounded-sheet border-[1.5px] border-border px-5 pt-8 pb-12 sm:px-8 xl:px-12 xl:pt-8 xl:pb-20">
        <Sprig className="absolute top-12 right-[6%] hidden w-16 xl:block" />
        <Sprig className="absolute bottom-6 left-[30%] hidden w-16 xl:block" />
        <Sprig className="absolute right-[4%] bottom-14 hidden w-16 xl:block" />
        <div className="grid gap-section md:grid-cols-2 xl:grid-cols-[545fr_450fr_365fr] xl:gap-9 [&>*]:min-w-0">
          <div className="md:col-span-2 xl:col-span-1">
            <Faq faq={faq} />
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
  )
}
