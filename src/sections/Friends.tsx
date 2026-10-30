import Illustration from '../components/Illustration'
import { home } from '../content/vi'

const { friends } = home

// Tranh "Hòn đá to" kèm chú thích, như một ô tranh trong sách (trang trí, không phải section riêng)
export default function Friends() {
  return (
    <figure className="min-w-0">
      <figcaption>
        <span className="block font-heading text-xl text-ink lg:text-2xl">{friends.title}</span>
        <span className="mt-1 block text-brown">{friends.subtitle}</span>
      </figcaption>
      <div className="mt-6 rounded-[1.25rem] border border-border bg-caption p-4">
        <Illustration
          name="cta-school-gate"
          sizes="(min-width: 1280px) 330px, (min-width: 768px) 45vw, 90vw"
          pictureClassName="block"
          className="print-frame w-full bg-white"
        />
      </div>
    </figure>
  )
}
