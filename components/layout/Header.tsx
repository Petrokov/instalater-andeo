'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'

const navLinks = [
  { href: '/', label: 'Naslovna' },
  { href: '/projekti', label: 'Projekti' },
  { href: '/o-nama', label: 'O nama' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const lightHero = ['/projekti'].includes(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[72px] px-[5%] transition-all duration-400 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-[20px] shadow-[0_2px_24px_rgba(0,0,0,0.08)]'
            : lightHero
              ? 'bg-[#faf8f4]/90 backdrop-blur-[12px]'
              : ''
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-3 no-underline"
          aria-label="Instalater Anđeo - Početna"
        >
          <BrandLogoMark className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Glavna navigacija">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[14px] font-medium tracking-[0.02em] no-underline transition-colors duration-200 ${
                scrolled || lightHero
                  ? 'text-secondary hover:text-dark'
                  : 'text-white/85 hover:text-yellow'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            className="bg-yellow text-dark font-bold text-[14px] px-[22px] py-[10px] rounded-[12px] no-underline transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(244,230,0,0.4)]"
            aria-label="Javi se - kontaktni obrazac"
          >
            Javi se
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Zatvori izbornik' : 'Otvori navigacijski izbornik'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
              scrolled || lightHero ? 'bg-dark' : 'bg-white'
            } ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
              scrolled || lightHero ? 'bg-dark' : 'bg-white'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 rounded-sm transition-all duration-300 ${
              scrolled || lightHero ? 'bg-dark' : 'bg-white'
            } ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[72px] left-0 right-0 z-40 bg-white/97 backdrop-blur-[20px] flex flex-col gap-1 px-[5%] pt-6 pb-8 shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
          role="navigation"
          aria-label="Mobilna navigacija"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="py-[14px] text-[16px] font-medium text-dark no-underline border-b border-[#f0f0f0] transition-colors duration-200 hover:text-[#c0a000]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={closeMenu}
            className="mt-4 text-center py-[14px] rounded-[12px] bg-yellow text-dark font-bold no-underline"
          >
            Javi se
          </Link>
        </div>
      )}
    </>
  )
}
