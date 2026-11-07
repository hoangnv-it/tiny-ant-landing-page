import Icon from './icons'

type Props = {
  caption: string
  /** [cột việc, cột "trước", cột "với Tiny Ant"] */
  head: readonly string[]
  rows: readonly (readonly string[])[]
  className?: string
}

// Ô bảng; dưới 640px mỗi dòng thành một khối dọc, nhãn cột (data-label) hiện phía trên nội dung
const cell =
  'px-4 py-3 max-sm:block max-sm:py-1 max-sm:before:block max-sm:before:text-xs max-sm:before:font-semibold max-sm:before:text-brown max-sm:before:content-[attr(data-label)]'

// Bảng so sánh 3 cột: thẻ <table> thật (đọc được bằng máy, thân thiện SEO), không cuộn ngang trên mobile.
export default function CompareTable({ caption, head, rows, className = '' }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-caption border border-border bg-card shadow-card ${className}`}
    >
      <table className="w-full border-collapse text-left text-sm max-sm:block">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-paper-dark font-heading text-ink max-sm:sr-only">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block">
          {rows.map(([task, before, after]) => (
            <tr key={task} className="border-t border-border align-top max-sm:block max-sm:py-2">
              <th
                scope="row"
                className="px-4 py-3 font-semibold text-ink max-sm:block max-sm:pb-1 max-sm:font-heading max-sm:text-base"
              >
                {task}
              </th>
              <td data-label={head[1]} className={`text-text-muted ${cell}`}>
                {before}
              </td>
              <td data-label={head[2]} className={`text-text ${cell}`}>
                <span className="flex gap-2">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ink-500" />
                  {after}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
