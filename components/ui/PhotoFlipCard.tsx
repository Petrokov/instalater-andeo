'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Side {
  src: string
  alt: string
}

interface PhotoFlipCardProps {
  front: Side
  back: Side
  className?: string
  sizes?: string
}

export function PhotoFlipCard({ front, back, className = '', sizes }: PhotoFlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`cursor-pointer ${className}`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
      role="img"
      aria-label={`${front.alt} / ${back.alt}`}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[24px]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image src={front.src} alt={front.alt} fill className="object-cover" sizes={sizes} />
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-[24px]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <Image src={back.src} alt={back.alt} fill className="object-cover" sizes={sizes} />
        </div>
      </div>
    </div>
  )
}
