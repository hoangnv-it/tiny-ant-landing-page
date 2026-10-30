import Icon from '../components/icons'
import Illustration from '../components/Illustration'
import SectionTitle from '../components/SectionTitle'
import { home } from '../content/vi'

const { library } = home

// "Thư viện bài dùng chung" theo thiết kế: nhãn đỏ + tiêu đề; chồng sách bên trái, 3 ý có dấu tích bên phải.
export default function Library() {
  return (
    <section
      id="thu-vien"
      aria-labelledby="thu-vien-title"
      className="relative z-10 min-w-0 xl:pl-6"
    >
      <SectionTitle id="thu-vien-title" lesson={library.lesson} className="xl:text-h2-why">
        {library.title}
      </SectionTitle>

      <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.1fr] xl:mt-10 xl:gap-5">
        <Illustration
          name="library-books"
          sizes="(min-width: 1280px) 260px, (min-width: 640px) 50vw, 92vw"
          pictureClassName="mx-auto block w-full max-w-80 sm:max-w-none"
          className="w-full"
        />
        <ul className="flex flex-col gap-4 xl:gap-6">
          {library.points.map((p) => (
            <li key={p} className="flex gap-2.5 text-text-muted xl:text-body-sm">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-ink-500" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
