import { Button } from '@/components/ui/Button'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-svh flex items-center overflow-hidden"
      aria-labelledby="hero-h1"
    >
      {/* Video background - mobile: anchor right to show angel body on right side */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[82%_20%] md:object-[center_right]"
          aria-label="Instalater anđeo na gradilištu pri zalasku sunca"
          poster="/hero-bg.png"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(105deg,rgba(10,6,2,0.72) 0%,rgba(30,18,5,0.58) 40%,rgba(60,35,10,0.22) 70%,rgba(80,50,10,0.06) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Card - mobile: centered, full visible; desktop: center-left */}
      <div className="relative z-20 w-full px-[5%] flex justify-center md:justify-start md:items-center">
        <div
          className="hero-glass w-full max-w-[420px] md:w-auto md:max-w-[520px] md:ml-[clamp(0px,8%,140px)] p-[clamp(20px,4vw,44px)] rounded-3xl border border-white/28 shadow-[0_24px_80px_rgba(0,0,0,0.32)] animate-[fadeInCard_1s_ease_both]"
        >
          <div className="flex items-center gap-[10px] mb-5">
            <BrandLogoMark className="h-[34px] w-auto" />
          </div>

          <h1
            id="hero-h1"
            className="text-[clamp(22px,3.2vw,42px)] font-extrabold leading-[1.18] text-white mb-4"
          >
            Vratimo <span className="text-yellow">toplinu</span> tamo gdje je najpotrebnija
          </h1>

          <p className="text-[clamp(14px,1.2vw,17px)] font-normal leading-[1.65] text-white/82 mb-7">
            Instalater Anđeo povezuje dobre ljude, instalatere i partnere kako bi domovi
            ponovno postali sigurni, funkcionalni i dostojanstveni.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button
              variant="primary"
              href="#kontakt-trebam"
              aria-label="Prijavi kandidata - idi na kontakt formu"
            >
              Prijavi kandidata
            </Button>
            <Button
              variant="outline"
              href="#kontakt-zelim"
              aria-label="Podrži projekt - idi na kontakt formu"
            >
              Podrži projekt
            </Button>
          </div>

          <p className="text-[12px] text-white/50 tracking-[0.01em]">
            Prijava je diskretna. Pomoć ide onima kojima je zaista potrebna.
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-[scrollHint_2.4s_ease-in-out_infinite]"
        aria-hidden="true"
      >
        <span className="text-[11px] text-white/40 tracking-[0.08em] uppercase">Scroll</span>
        <div className="w-5 h-5 border-r-2 border-b-2 border-white/40 rotate-45" />
      </div>

      <style>{`
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes scrollHint {
          0%, 100% { opacity: 0.35; transform: translateY(0); }
          50%       { opacity: 0.65; transform: translateY(6px); }
        }

        .hero-glass {
          background: rgba(255,230,130,0.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        @media (max-width: 767px) {
          .hero-glass {
            background: rgba(255,230,130,0.13);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-glass { animation: none !important; }
          [class*="animate-"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
