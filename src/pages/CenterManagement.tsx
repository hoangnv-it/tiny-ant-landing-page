import Button from '../components/Button'
import Container from '../components/Container'
import Icon from '../components/icons'
import Illustration from '../components/Illustration'
import PaperCard from '../components/PaperCard'
import PhoneFrame from '../components/PhoneFrame'
import SectionTitle, { LessonTag } from '../components/SectionTitle'
import Seo from '../components/Seo'
import ZaloButton from '../components/ZaloButton'
import { findScreen } from '../components/screens'
import { centerJsonLd } from '../lib/structuredData'
import FaqCtaSheet from '../sections/FaqCtaSheet'
import Steps from '../sections/Steps'
import { centerPage, centerPagePath, demoAnchor, home } from '../content/vi'

const { meta, breadcrumb, hero, pains, features, roles, compare, plans, faq } = centerPage
const parentToday = findScreen('app-parent-today')
// Ô bảng so sánh; dưới 640px xếp dọc, nhãn cột (data-label) hiện phía trên nội dung
const cell =
  'px-4 py-3 max-sm:block max-sm:py-1 max-sm:before:block max-sm:before:text-xs max-sm:before:font-semibold max-sm:before:text-brown max-sm:before:content-[attr(data-label)]'

// Trang "Phần mềm quản lý trung tâm": cùng phong cách trang chủ (giấy sách cũ, nhãn bài đỏ, thẻ ô chú thích).
// Thứ tự: giới thiệu | vấn đề + ai dùng | tính năng | so sánh + gói | 3 bước | FAQ + đăng ký.
export default function CenterManagement() {
  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={centerPagePath}
        jsonLd={centerJsonLd}
      />

      <section id="gioi-thieu" aria-labelledby="gioi-thieu-title">
        <Container className="grid gap-10 pt-4 pb-section lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-12 xl:pt-6">
          <div>
            <nav aria-label={breadcrumb.label}>
              <ol className="flex flex-wrap items-center gap-x-2 text-sm text-text-muted">
                <li>
                  <a
                    href="/"
                    className="inline-flex min-h-11 items-center hover:text-ink hover:underline"
                  >
                    {breadcrumb.home}
                  </a>
                </li>
                <li aria-hidden="true">›</li>
                <li aria-current="page" className="font-semibold text-ink">
                  {breadcrumb.current}
                </li>
              </ol>
            </nav>
            <LessonTag className="mt-4">{hero.lesson}</LessonTag>
            <h1 id="gioi-thieu-title" className="text-h1 font-bold md:text-h1-lg">
              {hero.title}
            </h1>
            <p className="mt-5 text-lead lg:text-lead-lg">{hero.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={demoAnchor.slice(1)} data-position="center-hero">
                {home.hero.primaryCta}
              </Button>
              <ZaloButton position="center-hero" />
            </div>
            <p className="mt-5 text-sm text-text-muted">{home.hero.note}</p>
          </div>

          {/* Tranh trong khung ảnh dán vở, điện thoại chồng góc dưới trái */}
          <div className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none">
            <div className="ml-auto w-[88%] rotate-1 rounded-[1.25rem] border border-border bg-caption p-2 shadow-card">
              <Illustration
                name="tab-center"
                sizes="(min-width: 1024px) 40vw, 88vw"
                priority
                pictureClassName="block"
                className="print-frame aspect-[10/9] h-auto w-full object-cover"
              />
            </div>
            {/* PhoneFrame tự có class relative: bọc lớp ngoài để đặt tuyệt đối */}
            <div className="absolute bottom-0 left-0 w-[30vw] max-w-40">
              <PhoneFrame
                src={parentToday}
                alt={home.hero.parentAlt}
                sizes="(min-width: 768px) 160px, 30vw"
                className="-rotate-4"
              />
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-section pb-section xl:grid-cols-[5fr_7fr] xl:gap-12">
        <section id="van-de" aria-labelledby="van-de-title" className="min-w-0">
          <SectionTitle id="van-de-title" lesson={pains.lesson} className="xl:text-h2-half">
            {pains.title}
          </SectionTitle>
          {/* Trang vở ô ly: mỗi nỗi lo một dòng kẻ */}
          <ol className="notebook mt-6 rounded-caption border border-border py-8 pr-4 pl-11 shadow-card">
            {pains.items.map((item, i) => (
              <li key={item} className="relative leading-8 text-text">
                <span
                  aria-hidden="true"
                  className="absolute top-1 -left-8 grid size-6 place-items-center rounded-full bg-accent-red text-sm font-bold text-white"
                >
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section id="ai-dung" aria-labelledby="ai-dung-title" className="min-w-0">
          <SectionTitle id="ai-dung-title" lesson={roles.lesson} className="xl:text-h2-half">
            {roles.title}
          </SectionTitle>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {roles.items.map((r) => (
              <PaperCard as="li" key={r.title} className="flex gap-3.5 p-4 shadow-card">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-500 text-white">
                  <Icon name={r.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-heading text-h3 font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-text">{r.text}</p>
                </div>
              </PaperCard>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-section">
        <section id="tinh-nang" aria-labelledby="tinh-nang-title">
          <SectionTitle id="tinh-nang-title" lesson={features.lesson}>
            {features.title}
          </SectionTitle>
          <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {features.items.map((f) => (
              <PaperCard as="li" key={f.title} className="p-5 shadow-card">
                <h3 className="flex items-start gap-3 font-heading text-h3 font-bold lg:text-h3-lg">
                  <Icon name="checkCircle" className="size-7 shrink-0 text-ink-500" />
                  {f.title}
                </h3>
                <p className="mt-2 pl-10 leading-relaxed text-text">{f.text}</p>
              </PaperCard>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="grid gap-section pb-section xl:grid-cols-[7fr_5fr] xl:gap-12">
        <section id="so-sanh" aria-labelledby="so-sanh-title" className="min-w-0">
          <SectionTitle id="so-sanh-title" lesson={compare.lesson} className="xl:text-h2-half">
            {compare.title}
          </SectionTitle>
          {/* Dưới 640px: mỗi dòng thành một khối dọc, nhãn cột lấy từ data-label (không cuộn ngang) */}
          <div className="mt-6 overflow-hidden rounded-caption border border-border bg-card shadow-card">
            <table className="w-full border-collapse text-left text-sm max-sm:block">
              <caption className="sr-only">{compare.caption}</caption>
              <thead className="bg-paper-dark font-heading text-ink max-sm:sr-only">
                <tr>
                  {compare.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="max-sm:block">
                {compare.rows.map(([task, old, ours]) => (
                  <tr
                    key={task}
                    className="border-t border-border align-top max-sm:block max-sm:py-2"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-semibold text-ink max-sm:block max-sm:pb-1 max-sm:font-heading max-sm:text-base"
                    >
                      {task}
                    </th>
                    <td data-label={compare.head[1]} className={`text-text-muted ${cell}`}>
                      {old}
                    </td>
                    <td data-label={compare.head[2]} className={`text-text ${cell}`}>
                      <span className="flex gap-2">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ink-500" />
                        {ours}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="goi" aria-labelledby="goi-title" className="min-w-0">
          <SectionTitle id="goi-title" lesson={plans.lesson} className="xl:text-h2-half">
            {plans.title}
          </SectionTitle>
          <p className="mt-4 leading-relaxed text-text">{plans.lead}</p>
          <ul aria-label={plans.listLabel} className="mt-5 grid grid-cols-2 gap-3">
            {plans.tiers.map((t) => (
              <PaperCard as="li" key={t} className="p-4 text-center shadow-card">
                <span className="block font-heading text-h3 font-bold text-ink">{t}</span>
                <span className="mt-1 block text-sm text-text-muted">{plans.price}</span>
              </PaperCard>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={demoAnchor.slice(1)} data-position="center-plans">
              {home.hero.primaryCta}
            </Button>
            <ZaloButton position="center-plans" />
          </div>
        </section>
      </Container>

      <Container className="pb-section">
        <Steps />
      </Container>

      <FaqCtaSheet faq={faq} />
    </>
  )
}
