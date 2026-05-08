'use client'

import Image from 'next/image'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Partner = { name: string; src: string }
type Orbit = { duration: number; size: number; partners: Partner[] }

const orbits: Orbit[] = [
  {
    duration: 16,
    size: 190,
    partners: [
      { name: 'ARMAL', src: '/uploads/logo-partneri/Armal-logo.png' },
      { name: 'PE-LINE', src: '/uploads/logo-partneri/PE-LINE-logo.png' },
    ],
  },
  {
    duration: 28,
    size: 320,
    partners: [
      { name: 'Atlantic', src: '/uploads/logo-partneri/logo-atlantic.png' },
      { name: 'Aquaestil', src: '/uploads/logo-partneri/Aquaestil-logo.png' },
      { name: 'Remeha', src: '/uploads/logo-partneri/REMEHA logo.png' },
      { name: 'Ragno', src: '/uploads/logo-partneri/ragno-logo.jpg' },
      { name: 'Ivar', src: '/uploads/logo-partneri/LOGO-IVAR.jpeg' },
      { name: 'TECE', src: '/uploads/logo-partneri/TECE-logo.jpg' },
    ],
  },
  {
    duration: 44,
    size: 450,
    partners: [
      { name: 'InDizajn', src: '/uploads/logo-partneri/indizajn MM 100x100.png' },
      { name: '24sata', src: '/uploads/logo-partneri/24-sata-logo.png' },
      { name: 'Večernji', src: '/uploads/logo-partneri/vecernji-list-logo 190x98.png' },
      { name: 'LIDER', src: '/uploads/logo-partneri/LIDER_logo.png' },
      { name: 'HU-dobra-volja', src: '/uploads/logo-partneri/HU-dobra-volja.jpg' },
    ],
  },
]

function chipPos(i: number, total: number) {
  const a = (2 * Math.PI * i) / total - Math.PI / 2
  return { x: 50 + 50 * Math.cos(a), y: 50 + 50 * Math.sin(a) }
}

export function PartneriSection() {
  return (
    <section
      id="partneri"
      className="py-[clamp(64px,8vw,120px)] px-[5%] bg-section-bg overflow-hidden"
      aria-labelledby="partneri-title"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-8">

        {/* Text */}
        <div className="w-full md:w-[400px] shrink-0 text-center md:text-left">
          <SectionLabel>Naši partneri</SectionLabel>
          <h2
            id="partneri-title"
            className="text-[clamp(24px,3vw,40px)] font-extrabold leading-[1.2] mb-4"
          >
            Od srca zahvaljujemo našim partnerima
          </h2>
          <p className="text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-secondary">
            Bez ljudi i tvrtki koje vjeruju u ovu priču, nijedna obnova ne bi bila moguća.
          </p>
        </div>

        {/* Orbit - full circle on mobile, centered on desktop */}
        <div className="flex-1 flex items-center justify-center" aria-hidden="true">
          <div className="orbit-scene relative w-[500px] h-[500px] flex items-center justify-center">

            {/* Center: Petrokov logo */}
            <div className="relative w-[72px] h-[72px] rounded-[16px] overflow-hidden z-10 shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
              <Image
                src="/uploads/logo-partneri/petrokov-logo-kucica.jpeg"
                alt="Petrokov"
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>

            {/* Orbit rings + logo chips */}
            {orbits.map((orbit) => (
              <div
                key={orbit.size}
                className="absolute rounded-full border border-dashed border-[#c4c0b8]"
                style={{
                  width: orbit.size,
                  height: orbit.size,
                  animation: `p-spin ${orbit.duration}s linear infinite`,
                }}
              >
                {orbit.partners.map((partner, idx) => {
                  const { x, y } = chipPos(idx, orbit.partners.length)
                  return (
                    <div
                      key={partner.name}
                      className="absolute bg-white border border-[#e8e8e8] rounded-[12px] shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        animation: `p-counter ${orbit.duration}s linear infinite`,
                        width: 80,
                        height: 36,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <div className="relative w-full h-full p-[6px]">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          fill
                          className="object-contain p-[6px]"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes p-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes p-counter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        /* Scale to fit on mobile - full circle visible */
        @media (max-width: 767px) {
          .orbit-scene {
            transform: scale(0.64);
            margin: -90px 0;
          }
        }
        @media (max-width: 479px) {
          .orbit-scene {
            transform: scale(0.54);
            margin: -115px 0;
          }
        }
      `}</style>
    </section>
  )
}
