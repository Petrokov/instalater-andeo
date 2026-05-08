import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

const stats = [
  { num: '5+', label: 'Obnova' },
  { num: '20+', label: 'Partnera i donatora' },
  { num: '4', label: 'Grada' },
  { num: '1', label: 'Zajednički cilj' },
]

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover'

type BorderRotateProps = Omit<HTMLAttributes<HTMLDivElement>, 'className'> & {
  children: ReactNode
  className?: string
  animationMode?: AnimationMode
  animationSpeed?: number
  gradientColors?: {
    primary: string
    secondary: string
    accent: string
  }
  backgroundColor?: string
  borderWidth?: number
  borderRadius?: number
  style?: CSSProperties
}

const impactGradientColors = {
  primary: 'color-mix(in srgb, var(--color-dark) 82%, black)',
  secondary: 'var(--color-yellow)',
  accent: 'var(--color-yellow-warm)',
}

function BorderRotate({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 7,
  gradientColors = impactGradientColors,
  backgroundColor = 'color-mix(in srgb, var(--color-dark) 92%, black)',
  borderWidth = 1,
  borderRadius = 20,
  style = {},
  ...props
}: BorderRotateProps) {
  const animationClass = {
    'auto-rotate': 'gradient-border-auto',
    'rotate-on-hover': 'gradient-border-hover',
    'stop-rotate-on-hover': 'gradient-border-stop-hover',
  }[animationMode]

  const combinedStyle = {
    '--gradient-primary': gradientColors.primary,
    '--gradient-secondary': gradientColors.secondary,
    '--gradient-accent': gradientColors.accent,
    '--bg-color': backgroundColor,
    '--border-width': `${borderWidth}px`,
    '--border-radius': `${borderRadius}px`,
    '--animation-duration': `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 28%,
        ${gradientColors.accent} 31%,
        ${gradientColors.secondary} 34%,
        ${gradientColors.primary} 42%,
        ${gradientColors.primary} 54%,
        ${gradientColors.secondary} 76%,
        ${gradientColors.accent} 80%,
        ${gradientColors.secondary} 84%,
        ${gradientColors.primary} 100%
      )
    `,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    ...style,
  } as CSSProperties

  return (
    <div
      className={`gradient-border-component ${animationClass} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  )
}

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="py-[clamp(64px,8vw,100px)] px-[5%] bg-dark"
      aria-labelledby="impact-title"
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <RevealOnScroll>
          <h2
            id="impact-title"
            className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] text-white mb-14"
          >
            Svaki broj <span className="text-yellow">ima lice.</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <RevealOnScroll key={s.label} delay={(i + 1) * 100}>
              <BorderRotate
                animationMode="stop-rotate-on-hover"
                animationSpeed={6 + i}
                className="h-full py-8 px-4 text-center shadow-[0_18px_48px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="text-[clamp(44px,5vw,72px)] font-extrabold text-yellow leading-none mb-2">
                  {s.num}
                </div>
                <div className="text-[14px] font-medium text-white/60 uppercase tracking-[0.08em]">
                  {s.label}
                </div>
              </BorderRotate>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
