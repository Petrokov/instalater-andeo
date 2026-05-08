'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'

// Add more renovation photos to this array as they become available
const slides = [
  { src: '/uploads/inst-and-img.png', alt: 'Obnovljena kupaonica - Instalater Anđeo' },
  { src: '/hero-bg.png', alt: 'Instalater Anđeo volonteri na poslu' },
  { src: '/uploads/inst-and-img.png', alt: 'Obnova kupaonice za obitelj' },
]

function imageStyle(
  index: number,
  active: number,
  total: number,
  cw: number
): React.CSSProperties {
  const gap = Math.min(86, cw * 0.15)
  const rise = gap * 0.8
  const isActive = index === active
  const isLeft = (active - 1 + total) % total === index
  const isRight = (active + 1) % total === index

  if (isActive) return {
    zIndex: 3, opacity: 1, pointerEvents: 'auto',
    transform: 'translateX(0) translateY(0) scale(1) rotateY(0deg)',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }
  if (isLeft) return {
    zIndex: 2, opacity: 1, pointerEvents: 'auto',
    transform: `translateX(-${gap}px) translateY(-${rise}px) scale(0.85) rotateY(15deg)`,
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }
  if (isRight) return {
    zIndex: 2, opacity: 1, pointerEvents: 'auto',
    transform: `translateX(${gap}px) translateY(-${rise}px) scale(0.85) rotateY(-15deg)`,
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }
  return {
    zIndex: 1, opacity: 0, pointerEvents: 'none',
    transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
  }
}

export function ImageCarousel() {
  const [active, setActive] = useState(0)
  const [cw, setCw] = useState(400)
  const ref = useRef<HTMLDivElement>(null)
  const n = slides.length

  useEffect(() => {
    const update = () => { if (ref.current) setCw(ref.current.offsetWidth) }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % n), 5000)
    return () => clearInterval(t)
  }, [n])

  const prev = useCallback(() => setActive(a => (a - 1 + n) % n), [n])
  const next = useCallback(() => setActive(a => (a + 1) % n), [n])

  return (
    <div aria-label="Galerija obnova kupaonice">
      <div
        ref={ref}
        className="relative w-full h-[340px] md:h-[420px]"
        style={{ perspective: '1000px' }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
              ...imageStyle(i, active, n, cw),
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-5 justify-end">
        <button
          onClick={prev}
          aria-label="Prethodna slika"
          className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-yellow transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white group-hover:text-dark transition-colors">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Sljedeća slika"
          className="w-10 h-10 rounded-full bg-dark flex items-center justify-center hover:bg-yellow transition-colors group"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white group-hover:text-dark transition-colors">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
