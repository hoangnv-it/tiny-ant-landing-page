import CompareTable from '../components/CompareTable'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { beforeAfter } = home

// Bảng "Trước / Sau Tiny Ant": 6 việc quen thuộc của trung tâm
export default function BeforeAfter() {
  return (
    <section id="truoc-sau" aria-labelledby="truoc-sau-title" className="min-w-0">
      <SectionTitle id="truoc-sau-title" lesson={beforeAfter.lesson} className="xl:text-h2-half">
        {beforeAfter.title}
      </SectionTitle>
      <CompareTable
        caption={beforeAfter.caption}
        head={beforeAfter.head}
        rows={beforeAfter.rows}
        className="mt-6"
      />
    </section>
  )
}
