'use client'

import { useState } from 'react'
import Link from 'next/link'
import { adminLogout } from '@/app/actions/adminActions'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'

type AdminHeaderProps = {
  current?: string
  actions?: Array<{ href: string; label: string; primary?: boolean }>
}

const navLinks = [
  { href: '/admin', label: 'Prijave' },
  { href: '/admin/projekti', label: 'Projekti' },
]

export function AdminHeader({ current = 'Upravljačka ploča', actions = [] }: AdminHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-[#ebebeb] px-3 sm:px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-3">
        <Link href="/admin" className="flex items-center gap-3 no-underline min-w-0">
          <BrandLogoMark className="h-9 w-auto shrink-0" />
          <div className="min-w-0">
            <div className="text-[12px] text-secondary">Upravljačka ploča</div>
            <div className="text-[14px] font-semibold text-dark truncate max-w-[190px] sm:max-w-[280px]">
              {current}
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-2" aria-label="Admin navigacija">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold text-secondary hover:text-dark transition-colors no-underline px-3 py-2 rounded-[10px] hover:bg-[#f5f4f1]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.primary
                  ? 'bg-dark text-white text-[13px] font-bold px-4 py-2 rounded-[10px] hover:bg-dark/80 transition-colors no-underline'
                  : 'text-[13px] font-semibold text-dark hover:text-dark/70 transition-colors no-underline px-3 py-2 rounded-[10px] hover:bg-[#f5f4f1]'
              }
            >
              {action.label}
            </Link>
          ))}
          <form action={adminLogout}>
            <button
              type="submit"
              className="text-[13px] text-secondary hover:text-dark transition-colors font-medium"
            >
              Odjava
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="md:hidden w-10 h-10 rounded-[10px] border border-[#e8e8e8] flex flex-col items-center justify-center gap-[5px] bg-white"
          aria-label={open ? 'Zatvori admin izbornik' : 'Otvori admin izbornik'}
          aria-expanded={open}
        >
          <span className={`block w-5 h-0.5 bg-dark rounded-sm transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-dark rounded-sm transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-dark rounded-sm transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden pt-4">
          <nav className="flex flex-col gap-1" aria-label="Admin mobilna navigacija">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-semibold text-dark no-underline px-3 py-3 rounded-[10px] hover:bg-[#f5f4f1]"
              >
                {link.label}
              </Link>
            ))}
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                onClick={() => setOpen(false)}
                className={
                  action.primary
                    ? 'mt-2 bg-dark text-white text-[14px] font-bold px-4 py-3 rounded-[10px] no-underline text-center'
                    : 'text-[15px] font-semibold text-dark no-underline px-3 py-3 rounded-[10px] hover:bg-[#f5f4f1]'
                }
              >
                {action.label}
              </Link>
            ))}
            <form action={adminLogout} className="border-t border-[#f0f0f0] mt-3 pt-3">
              <button
                type="submit"
                className="w-full text-left text-[15px] font-semibold text-secondary px-3 py-3 rounded-[10px] hover:bg-[#f5f4f1] hover:text-dark transition-colors"
              >
                Odjava
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  )
}
