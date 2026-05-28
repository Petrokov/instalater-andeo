'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const steps = [
  {
    n: '01',
    title: 'Prijava',
    text: 'Netko iz zajednice, susjed, socijalni radnik, liječnik, prijavljuje osobu ili obitelj kojoj je obnova najpotrebnija. Prijava je diskretna i povjerljiva.',
  },
  {
    n: '02',
    title: 'Procjena',
    text: 'Naš tim pregleda svaku prijavu individualno. Kontaktiramo podnositelja i kandidata kako bismo razumjeli situaciju i utvrdili opseg potrebnih radova.',
  },
  {
    n: '03',
    title: 'Organizacija ekipe',
    text: 'Koordiniramo instalaterske majstore dobrovoljce, osiguravamo materijal od partnera i donatora te planiramo termin koji odgovara svima, najčešće vikend.',
  },
  {
    n: '04',
    title: 'Obnova',
    text: 'Ekipa dolazi, radi i za jedan vikend pretvori zapuštenu kupaonicu u sigurno, funkcionalno i dostojanstveno mjesto. Bez naknade. Bez birokracije.',
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function AnimatedConnector() {
  const { ref, visible } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="hidden md:block absolute top-[28px] left-0 right-0 h-px bg-[#e4e2de] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-yellow/50 transition-all ease-out"
        style={{
          width: visible ? '100%' : '0%',
          transitionDuration: '1400ms',
          transitionDelay: '300ms',
        }}
      />
    </div>
  )
}

function AnimatedBadge({ n, delay }: { n: string; delay: number }) {
  const { ref, visible } = useInView(0.4)
  return (
    <div
      ref={ref}
      className="relative z-10 w-[56px] h-[56px] rounded-full bg-yellow flex items-center justify-center shrink-0 shadow-[0_0_0_6px_white] transition-all ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.4)',
        transitionDuration: '500ms',
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.34, 1.3, 0.64, 1)',
      }}
    >
      <span className="text-[13px] font-extrabold text-[#f9f7f2]">{n}</span>
    </div>
  )
}

export function KakoDjelujeSection() {
  return (
    <section
      id="kako-djelujemo"
      className="py-[clamp(64px,8vw,120px)] px-[5%] bg-white"
      aria-labelledby="kako-djelujemo-title"
    >
      <div className="max-w-[1100px] mx-auto">

        <RevealOnScroll>
          <div className="mb-[clamp(48px,6vw,80px)]">
            <SectionLabel>Kako djelujemo</SectionLabel>
            <h2
              id="kako-djelujemo-title"
              className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] max-w-[560px]"
            >
              Od prijave do nove kupaonice u četiri koraka.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative">
          <AnimatedConnector />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.n} delay={i * 200}>
                <div
                  className={`relative pt-0 md:pr-10 ${
                    i > 0
                      ? 'border-t border-[#ebebeb] pt-8 mt-8 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:border-[#ebebeb] md:pl-10 md:pr-0'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-4 mb-5 md:mb-6">
                    <AnimatedBadge n={step.n} delay={i * 200 + 220} />
                  </div>

                  <h3 className="text-[clamp(16px,1.4vw,20px)] font-extrabold text-dark leading-[1.25] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[clamp(13px,1vw,15px)] leading-[1.75] text-secondary">
                    {step.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll delay={200}>
          <div className="mt-[clamp(48px,6vw,80px)] bg-[#faf9f7] rounded-[20px] px-[clamp(24px,3.5vw,48px)] py-[clamp(20px,3vw,36px)] flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <p className="text-[13px] font-bold tracking-[0.10em] uppercase text-secondary shrink-0">
              Trenutno djelujemo u
            </p>
            <div className="flex flex-wrap gap-3">
              {['Zagreb', 'Osijek', 'Split', 'Đakovo', '+ više gradova'].map((city) => (
                <span
                  key={city}
                  className="text-[13px] font-bold text-dark bg-white border border-[#e4e2de] rounded-full px-4 py-[6px]"
                >
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-secondary md:ml-auto shrink-0">
              Proširenje na cijelu Hrvatsku u tijeku.
            </p>
          </div>
        </RevealOnScroll>

      </div>
    </section>
  )
}
