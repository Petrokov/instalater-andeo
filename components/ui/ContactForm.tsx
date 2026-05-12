'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { submitPrijava } from '@/app/actions/submitPrijava'

type Tab = 'trebam' | 'zelim'

export function ContactForm() {
  const [tab, setTab] = useState<Tab>('trebam')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    function syncTabFromHash() {
      if (window.location.hash === '#kontakt-trebam') {
        setTab('trebam')
        return
      }

      if (window.location.hash === '#kontakt-zelim') {
        setTab('zelim')
        return
      }

      if (!window.location.hash.startsWith('#kontakt')) return

      const queryStart = window.location.hash.indexOf('?')
      if (queryStart === -1) return
      const params = new URLSearchParams(window.location.hash.slice(queryStart + 1))
      const nextTab = params.get('tab')
      if (nextTab === 'trebam' || nextTab === 'zelim') {
        setTab(nextTab)
      }
    }

    syncTabFromHash()
    window.addEventListener('hashchange', syncTabFromHash)
    return () => window.removeEventListener('hashchange', syncTabFromHash)
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('vrsta', tab)

    startTransition(async () => {
      const result = await submitPrijava(formData)
      if (result.success) {
        setSubmitted(true)
        formRef.current?.reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(result.error)
      }
    })
  }

  return (
    <div>
      {/* Tabs */}
      <div
        className="flex gap-2 mb-8 bg-section-bg rounded-[14px] p-[6px]"
        role="tablist"
        aria-label="Vrsta upita"
      >
        {(['trebam', 'zelim'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 px-4 rounded-[10px] text-[14px] font-semibold transition-all duration-200 ${
              tab === t
                ? 'bg-white text-dark shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
                : 'bg-transparent text-secondary hover:text-dark'
            }`}
          >
            {t === 'trebam' ? 'Trebam pomoć' : 'Želim pomoći'}
          </button>
        ))}
      </div>

      {/* Form */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        aria-label={tab === 'trebam' ? 'Obrazac za prijavu potrebe za pomoći' : 'Obrazac za prijavu želje za pomoći'}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Ime i prezime" htmlFor={`ime-${tab}`}>
            <input
              type="text"
              id={`ime-${tab}`}
              name="ime"
              placeholder={tab === 'trebam' ? 'Npr. Ana Horvat' : 'Npr. Marko Kovač'}
              required
              className={inputCls}
            />
          </Field>

          <Field label="Email adresa" htmlFor={`email-${tab}`}>
            <input
              type="email"
              id={`email-${tab}`}
              name="email"
              placeholder={tab === 'trebam' ? 'ana.horvat@email.com' : 'marko.kovac@firma.hr'}
              required
              className={inputCls}
            />
          </Field>

          <Field label="Broj telefona" htmlFor={`tel-${tab}`}>
            <input
              type="tel"
              id={`tel-${tab}`}
              name="telefon"
              placeholder="+385 91 234 5678"
              className={inputCls}
            />
          </Field>

          <Field label="Grad / mjesto" htmlFor={`grad-${tab}`}>
            <input
              type="text"
              id={`grad-${tab}`}
              name="grad"
              placeholder="Zagreb"
              required
              className={inputCls}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Poruka" htmlFor={`poruka-${tab}`}>
              <textarea
                id={`poruka-${tab}`}
                name="poruka"
                placeholder={
                  tab === 'trebam'
                    ? 'Opišite situaciju i zašto je pomoć potrebna...'
                    : 'Reci nam kako želiš doprinijeti projektu...'
                }
                required
                rows={5}
                className={`${inputCls} resize-y`}
              />
            </Field>
          </div>

          {/* Photo upload - only for "trebam" tab */}
          {tab === 'trebam' && (
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-secondary tracking-[0.03em] mb-1.5">
                Fotografije kupaonice
              </label>
              <label
                htmlFor="foto-trebam"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#ddd] rounded-[12px] p-6 text-center cursor-pointer transition-colors duration-200 hover:border-yellow-warm"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M5 22v4a1 1 0 001 1h20a1 1 0 001-1v-4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 5v16M10 11l6-6 6 6" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[14px] font-semibold text-[#444]">
                  Klikni za upload fotografija
                </span>
                <span className="text-[13px] text-secondary">
                  JPG, PNG, HEIC - Max 10MB po fotografiji
                </span>
                <input
                  type="file"
                  id="foto-trebam"
                  name="fotografije"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  aria-label="Upload fotografija kupaonice"
                />
              </label>
              <p className="mt-2 text-[12px] text-secondary bg-[#fefae5] rounded-[10px] px-4 py-3 border-l-[3px] border-yellow">
                Molimo priložite minimalno 3 fotografije kupaonice ako prijavljujete potrebu za obnovom.
              </p>
            </div>
          )}

          {/* Checkbox */}
          <div className="sm:col-span-2">
            <label className="flex items-start gap-[10px] cursor-pointer">
              <input
                type="checkbox"
                required
                className="w-[18px] h-[18px] mt-0.5 shrink-0 accent-dark"
                aria-required="true"
              />
              <span className="text-[13px] text-secondary leading-[1.5]">
                Prihvaćam{' '}
                <a
                  href="/pravila-koristenja-i-privatnosti"
                  className="text-dark font-semibold underline underline-offset-2 hover:text-dark/70 transition-colors"
                >
                  Pravila korištenja i privatnosti
                </a>
                .
              </span>
            </label>
            <p className="text-[11px] text-secondary/70 leading-[1.5] mt-1.5 ml-[28px]">
              Slanjem upita potvrđujete da ste upoznati s pravilima korištenja web stranice i načinom obrade osobnih podataka.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="sm:col-span-2 text-[13px] text-red-600 bg-red-50 rounded-[10px] px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={pending || submitted}
              className={`w-full py-4 rounded-[14px] text-[16px] font-bold transition-all duration-200 ${
                submitted
                  ? 'bg-[#2d7a3a] text-white cursor-default'
                  : pending
                  ? 'bg-dark/60 text-white cursor-wait'
                  : 'bg-dark text-white hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]'
              }`}
              aria-label="Pošalji prijavu"
            >
              {submitted ? 'Hvala! Prijava je poslana Poslano' : pending ? 'Šaljem...' : 'Pošalji prijavu'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const inputCls =
  'w-full px-4 py-[13px] border border-[#e8e8e8] rounded-[12px] font-sans text-[15px] text-dark bg-white outline-none transition-all duration-200 focus:border-yellow-warm focus:shadow-[0_0_0_3px_rgba(244,230,0,0.18)]'

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-secondary tracking-[0.03em]">
        {label}
      </label>
      {children}
    </div>
  )
}
