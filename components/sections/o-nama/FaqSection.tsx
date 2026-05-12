'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const faqs = [
  {
    q: 'Kako mogu prijaviti kandidata za obnovu kupaonice?',
    a: 'Kandidata možete prijaviti putem kontakt forme na glavnoj stranici. Odaberite tab "Trebam pomoć", popunite obrazac s imenom, emailom, gradom i opisom situacije te priložite minimalno 3 fotografije kupaonice.',
  },
  {
    q: 'Tko može dobiti besplatnu obnovu kupaonice?',
    a: 'Pomoć je namijenjena starijim osobama, obiteljima u teškim situacijama i pojedincima koji žive bez osnovnih sanitarnih uvjeta. Svaka prijava se razmatra individualno i diskretno.',
  },
  {
    q: 'Kako se mogu uključiti kao volonter ili donator?',
    a: 'Možete se uključiti kao instalater volonter (poklon jednog vikenda), donator (novčana donacija ili materijal), poslovni partner (donacija opreme ili ekspertize) ili dijeljenjem priče na društvenim mrežama. Kontaktirajte nas putem forme i odaberite "Želim pomoći".',
  },
  {
    q: 'U kojim gradovima djeluje Instalater Anđeo?',
    a: 'Projekt trenutno djeluje u četiri grada u Hrvatskoj: Zagreb, Osijek, Split i Đakovo. U tijeku je planiranje proširenja na cijelu Hrvatsku.',
  },
  {
    q: 'Koliko obnova je Instalater Anđeo dosad realizirao?',
    a: 'Do sada je realizirano više od 5 obnova kupaonica uz podršku više od 20 partnera i donatora. Svaki projekt financiran je donacijama i volonterskim radom instalaterskih stručnjaka.',
  },
  {
    q: 'Je li prijava diskretna i povjerljiva?',
    a: 'Da. Sve prijave su u potpunosti diskretne i povjerljive. Podaci se koriste isključivo u svrhu obrade prijave i ne dijele se s trećim stranama bez privole korisnika.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  function toggle(idx: number) {
    setOpen((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      id="faq"
      className="py-[clamp(64px,8vw,120px)] px-[5%] bg-[#faf9f7]"
      aria-labelledby="faq-title"
    >
      <div className="max-w-[1100px] mx-auto">
        <RevealOnScroll>
          <div className="mb-[clamp(28px,3.5vw,44px)]">
            <SectionLabel>Česta pitanja</SectionLabel>
          </div>
          <h2
            id="faq-title"
            className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-[clamp(32px,5vw,56px)] max-w-[26ch]"
          >
            Sve što ste željeli znati o projektu.
          </h2>
        </RevealOnScroll>

        <div role="list">
          {faqs.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 60}>
              <div
                role="listitem"
                className={`border-t border-[#e4e0d8]${idx === faqs.length - 1 ? ' border-b' : ''}`}
              >
                <button
                  type="button"
                  aria-expanded={open === idx}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-btn-${idx}`}
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-6 py-[clamp(18px,2.5vw,24px)] text-left group"
                >
                  <span
                    className={`text-[clamp(15px,1.3vw,18px)] font-bold leading-[1.35] transition-colors duration-200 ${
                      open === idx ? 'text-dark' : 'text-dark/75 group-hover:text-dark'
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
                      open === idx
                        ? 'bg-yellow rotate-45'
                        : 'bg-[#eceae3] group-hover:bg-[#e2ded4]'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M6.5 1v11M1 6.5h11"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: open === idx ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-[clamp(14px,1.1vw,17px)] leading-[1.85] text-secondary pb-[clamp(18px,2.5vw,24px)] max-w-[72ch]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
