// Nhành lá nhỏ màu ô liu (trang trí, như nét vẽ lề sách cũ)
export default function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 24"
      aria-hidden="true"
      className={`pointer-events-none text-olive ${className}`}
      fill="none"
    >
      <path
        d="M2 14C16 2 44 2 62 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="15" rx="5" ry="6.5" fill="currentColor" transform="rotate(-20 22 15)" />
      <ellipse cx="40" cy="12" rx="5" ry="6.5" fill="currentColor" transform="rotate(15 40 12)" />
    </svg>
  )
}
