'use client'

import { useTransition } from 'react'
import { updatePrijavaStatus } from '@/app/actions/adminActions'
import type { PrijavaStatus } from '@/lib/database.types'

const statusLabels: Record<PrijavaStatus, string> = {
  nova: 'Nova',
  'u-obradi': 'U obradi',
  zavrsena: 'Završena',
  odbijena: 'Odbijena',
}

const statusColors: Record<PrijavaStatus, string> = {
  nova: 'bg-blue-100 text-blue-800',
  'u-obradi': 'bg-yellow-100 text-yellow-800',
  zavrsena: 'bg-green-100 text-green-800',
  odbijena: 'bg-red-100 text-red-800',
}

export function StatusSelect({ id, status }: { id: string; status: PrijavaStatus }) {
  const [pending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as PrijavaStatus
    startTransition(() => updatePrijavaStatus(id, newStatus))
  }

  return (
    <select
      defaultValue={status}
      onChange={handleChange}
      disabled={pending}
      className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer transition-opacity ${statusColors[status]} ${pending ? 'opacity-50' : ''}`}
    >
      {(Object.keys(statusLabels) as PrijavaStatus[]).map((s) => (
        <option key={s} value={s}>
          {statusLabels[s]}
        </option>
      ))}
    </select>
  )
}

export function StatusBadge({ status }: { status: PrijavaStatus }) {
  return (
    <span className={`text-[12px] font-semibold px-3 py-1 rounded-full ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  )
}
