import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'solid' | 'outline' | 'outlineLight'
type Size = 'md' | 'sm'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors'
const variants: Record<Variant, string> = {
  solid: 'bg-ink-500 text-white hover:bg-ink-700',
  outline: 'border-2 border-ink-500 text-ink hover:bg-ink-500 hover:text-white',
  // Viền trắng trên nền ink (khối CTA)
  outlineLight:
    'border-2 border-white text-white hover:bg-white hover:text-ink-700 focus-visible:outline-white',
}
const sizes: Record<Size, string> = {
  md: 'px-7 py-3 text-base',
  sm: 'px-5 py-2 text-sm',
}

type Common = { variant?: Variant; size?: Size }
type AnchorProps = Common & ComponentPropsWithoutRef<'a'> & { href: string }
type ButtonProps = Common & ComponentPropsWithoutRef<'button'> & { href?: undefined }

// Nút bo tròn: "solid" nền ink, "outline" viền ink, "outlineLight" viền trắng. Có href thì render <a>.
export default function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'solid', size = 'md', className = '', ...rest } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (rest.href !== undefined) {
    return <a {...(rest as ComponentPropsWithoutRef<'a'>)} className={cls} />
  }
  return <button type="button" {...(rest as ComponentPropsWithoutRef<'button'>)} className={cls} />
}
