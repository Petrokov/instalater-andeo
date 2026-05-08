import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-gold mb-3">
      {children}
    </p>
  )
}
