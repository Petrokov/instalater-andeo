'use client'

import { useTransition } from 'react'
import { deleteProject } from '@/app/actions/projectActions'

export function DeleteProjectButton({ id, slug, title }: { id: string; slug: string; title: string }) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    if (!confirm(`Obriši projekt "${title}"?`)) return
    startTransition(() => deleteProject(id, slug))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="text-[12px] text-red-500 hover:text-red-700 transition-colors px-3 py-1.5 rounded-[8px] hover:bg-red-50 disabled:opacity-50"
    >
      {pending ? 'Briše...' : 'Obriši'}
    </button>
  )
}
