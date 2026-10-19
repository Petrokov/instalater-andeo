'use client'

import { useState, useTransition } from 'react'
import { setContactFormEnabled } from '@/app/actions/settingsActions'

export function ContactFormToggle({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled)
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function toggle() {
    const next = !enabled
    setError(null)
    setEnabled(next)
    startTransition(async () => {
      try {
        await setContactFormEnabled(next)
      } catch {
        setEnabled(!next)
        setError('Promjena nije spremljena. Pokušajte ponovno.')
      }
    })
  }

  return (
    <div className="bg-white rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] p-6 max-w-[560px]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-[16px] font-bold text-dark">Kontakt forma</h2>
          <p className="text-[13px] text-secondary mt-1 leading-[1.6]">
            Kad je uključeno, posjetitelji na stranici vide standardnu kontakt formu za prijave.
            Kad je isključeno, umjesto forme prikazuje se poruka da se trenutno ne primaju prijave.
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Uključi ili isključi kontakt formu"
          onClick={toggle}
          disabled={pending}
          className={`relative shrink-0 w-[52px] h-[30px] rounded-full transition-colors duration-200 disabled:opacity-60 ${
            enabled ? 'bg-[#2d7a3a]' : 'bg-[#d8d6cf]'
          }`}
        >
          <span
            className={`absolute top-[3px] left-[3px] w-[24px] h-[24px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
              enabled ? 'translate-x-[22px]' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <p className="text-[12px] font-semibold mt-4 text-secondary">
        Trenutni status:{' '}
        <span className={enabled ? 'text-[#2d7a3a]' : 'text-red-500'}>
          {enabled ? 'Forma je vidljiva' : 'Forma je skrivena'}
        </span>
      </p>

      {error && (
        <p className="text-[13px] text-red-600 bg-red-50 rounded-[10px] px-4 py-3 mt-3" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
