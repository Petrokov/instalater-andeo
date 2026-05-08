'use client'

import { useEffect, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const testimonials = [
  {
    id: 1,
    initials: 'M',
    name: 'Marta',
    role: 'Umirovljenica, Zagreb',
    content:
      'Godinama sam se bojala ući u svoju kupaonicu. Ekipa je stigla u subotu ujutro i do nedjelje navečer imala sam potpuno novo kupalište. Nema riječi kojima bih ih mogla opisati.',
  },
  {
    id: 2,
    initials: 'T',
    name: 'Tomislav H.',
    role: 'Instalater volonter',
    content:
      'Svaki projekt koji završimo je više od nove kupaonice. Vidim osmijehe koji traju tjednima. To je razlog zašto se vraćam svaki put kad god mogu.',
  },
  {
    id: 3,
    initials: 'A',
    name: 'Ana Kovač',
    role: 'Privatna donatorica',
    content:
      'Znala sam da moja donacija neće završiti u administraciji, nego točno tamo gdje treba - u nečijoj novoj kupaonici. Ovaj projekt mi je vratio vjeru u zajednicu.',
  },
]

export function CitatSection() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActive((a) => (a + 1) % testimonials.length)
        setVisible(true)
      }, 320)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  function goTo(idx: number) {
    if (idx === active) return
    setVisible(false)
    setTimeout(() => {
      setActive(idx)
      setVisible(true)
    }, 320)
  }

  const t = testimonials[active]

  return (
    <section
      id="citat"
      className="py-[clamp(80px,10vw,140px)] px-[5%] bg-white overflow-hidden"
      aria-label="Što kažu sudionici projekta"
    >
      <RevealOnScroll>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Left: heading + dots */}
          <div>
            <SectionLabel>Glasovi projekta</SectionLabel>
            <h2 className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-4">
              Iza svake kupaonice stoji ljudska priča.
            </h2>
            <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary mb-8">
              Čuju ih primatelji pomoći, volonteri i donatori koji su postali dio nečijeg boljeg doma.
            </p>

            {/* Nav dots */}
            <div className="flex items-center gap-3" role="tablist" aria-label="Odaberi svjedočanstvo">
              {testimonials.map((tm, idx) => (
                <button
                  key={tm.id}
                  role="tab"
                  aria-selected={active === idx}
                  aria-label={`Svjedočanstvo: ${tm.name}`}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    active === idx
                      ? 'w-10 h-2.5 bg-yellow'
                      : 'w-2.5 h-2.5 bg-[#ddd] hover:bg-[#bbb]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: rotating testimonial card - fixed height so all testimonials occupy same space */}
          <div className="relative">
            <div
              className="bg-white border border-[#efefef] rounded-[20px] p-[clamp(24px,3vw,40px)] shadow-[0_4px_32px_rgba(0,0,0,0.06)] transition-all duration-[320ms] ease-out flex flex-col h-[360px] overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(24px)',
              }}
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Quote mark */}
              <span
                className="block text-[72px] font-extrabold leading-[0.6] mb-2 select-none"
                style={{ color: 'rgba(244,230,0,0.35)' }}
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <blockquote className="text-[clamp(16px,1.5vw,20px)] font-semibold leading-[1.6] text-dark mb-6 flex-1">
                {t.content}
              </blockquote>

              {/* Separator */}
              <div className="h-px w-full bg-[#ebebeb] mb-5" aria-hidden="true" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full bg-[#fefae5] border border-[#e8e8e8] flex items-center justify-center font-extrabold text-[16px] text-dark shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-[15px] text-dark leading-tight">{t.name}</p>
                  <p className="text-[13px] text-secondary mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </RevealOnScroll>
    </section>
  )
}
