'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { submitPrijava } from '@/app/actions/submitPrijava'

type Tab = 'trebam' | 'zelim'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const MAX_PHOTOS = 5

export function ContactForm() {
  const [tab, setTab] = useState<Tab>('trebam')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [photos, setPhotos] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  function addFiles(list: FileList | File[]) {
    const incoming = Array.from(list).filter((f) => ALLOWED_TYPES.includes(f.type))
    setPhotos((prev) => [...prev, ...incoming].slice(0, MAX_PHOTOS))
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ''
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (tab === 'trebam' && photos.length === 0) {
      setError('Molimo priložite fotografije kupaonice.')
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.set('vrsta', tab)
    formData.delete('fotografije')
    for (const photo of photos) {
      formData.append('fotografije', photo)
    }

    startTransition(async () => {
      const result = await submitPrijava(formData)
      if (result.success) {
        setSubmitted(true)
        setPhotos([])
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
              required
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

          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {tab === 'trebam' && (
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-secondary tracking-[0.03em]">
                Fotografije kupaonice{' '}
                <span className="text-red-500" aria-hidden="true">*</span>
              </span>

              {/* Drop zone */}
              <div
                role="button"
                tabIndex={0}
                aria-label="Zona za povlačenje i ispuštanje fotografija"
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-[14px] px-6 py-9 text-center cursor-pointer select-none outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-yellow-warm ${
                  isDragging
                    ? 'border-yellow-warm bg-yellow/[0.07]'
                    : 'border-[#dedede] bg-[#f9f9f7] hover:border-yellow-warm hover:bg-yellow/[0.04]'
                }`}
              >
                <div className="flex justify-center mb-4 pointer-events-none" aria-hidden="true">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-colors duration-200 ${isDragging ? 'text-yellow-warm' : 'text-[#c0bdb5]'}`}
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 7V5.5A1.5 1.5 0 019.5 4h5A1.5 1.5 0 0116 5.5V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="12" cy="14" r="3.2" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="18.5" cy="10.5" r="0.8" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-[15px] font-semibold text-dark pointer-events-none">
                  Povuci fotografije ovdje
                </p>
                <p className="text-[13px] text-secondary mt-1 pointer-events-none">
                  ili{' '}
                  <span className="font-semibold text-dark underline underline-offset-[3px] decoration-yellow-warm decoration-2">
                    odaberi s uređaja
                  </span>
                </p>
                <p className="text-[11px] text-secondary/60 mt-3 pointer-events-none">
                  Do {MAX_PHOTOS} fotografija · JPG, PNG, WebP, AVIF · max 10 MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="fotografije"
                multiple
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={handleFileChange}
                aria-hidden="true"
                tabIndex={-1}
              />

              {/* Selected files */}
              {photos.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-1" aria-label="Odabrane fotografije">
                  {photos.map((f, i) => (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-1.5 bg-section-bg border border-[#e8e8e8] rounded-[8px] px-3 py-1.5"
                    >
                      <span className="text-[12px] text-dark max-w-[160px] truncate">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="text-[16px] text-secondary hover:text-dark transition-colors leading-none shrink-0"
                        aria-label={`Ukloni ${f.name}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {photos.length > 0 && (
                <p className="text-[11px] text-secondary/70">
                  {photos.length} / {MAX_PHOTOS} fotografija odabrano
                </p>
              )}
            </div>
          )}

          {/* Checkbox */}
          <div className="sm:col-span-2">
            <label className="flex items-start gap-[10px] cursor-pointer">
              <input
                type="checkbox"
                name="suglasnost"
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
            <div className="sm:col-span-2 text-[13px] text-red-600 bg-red-50 rounded-[10px] px-4 py-3" role="alert">
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
              {submitted ? 'Hvala! Prijava je poslana' : pending ? 'Šaljem...' : 'Pošalji prijavu'}
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
