import Link from 'next/link'

type Variant = 'primary' | 'outline' | 'ghost' | 'section' | 'nav' | 'dark'

interface ButtonProps {
  variant?: Variant
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const variants: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center bg-yellow text-dark font-bold text-[15px] px-[26px] py-[14px] rounded-[14px] transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(244,230,0,0.5)] whitespace-nowrap',
  outline:
    'inline-flex items-center justify-center bg-white/12 text-white font-semibold text-[15px] px-[26px] py-[14px] rounded-[14px] border border-white/45 backdrop-blur-[8px] transition-all duration-200 hover:-translate-y-[3px] hover:bg-white/22 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] whitespace-nowrap',
  ghost:
    'inline-flex items-center justify-center bg-transparent text-dark font-semibold text-[13px] px-[18px] py-2 rounded-[10px] border border-[#ddd] transition-all duration-200 hover:border-dark hover:bg-[#f5f5f5]',
  section:
    'inline-flex items-center justify-center bg-yellow text-dark font-bold text-[16px] px-9 py-4 rounded-[14px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(244,230,0,0.45)]',
  nav: 'inline-flex items-center justify-center bg-yellow text-dark font-bold text-[14px] px-[22px] py-[10px] rounded-[12px] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(244,230,0,0.4)]',
  dark: 'inline-flex items-center justify-center w-full bg-dark text-white font-bold text-[16px] py-4 rounded-[14px] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)] disabled:opacity-60 disabled:pointer-events-none',
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const cls = `${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cls}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
