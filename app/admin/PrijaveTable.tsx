'use client'

import { useMemo, useState } from 'react'
import { StatusSelect } from './StatusSelect'
import type { Prijava, PrijavaStatus, PrijavaVrsta } from '@/lib/database.types'

const typeLabels: Record<PrijavaVrsta, string> = {
  trebam: 'Treba pomoć',
  zelim: 'Želi pomoći',
}

type Filters = {
  date: string
  type: '' | PrijavaVrsta
  name: string
  email: string
  phone: string
  city: string
  status: '' | PrijavaStatus
}

const initialFilters: Filters = {
  date: '',
  type: '',
  name: '',
  email: '',
  phone: '',
  city: '',
  status: '',
}

function includes(value: string | null | undefined, filter: string) {
  return (value ?? '').toLowerCase().includes(filter.trim().toLowerCase())
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function PrijaveTable({ prijave }: { prijave: Prijava[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters)

  const filteredPrijave = useMemo(() => {
    return prijave.filter((p) => {
      const date = formatDate(p.created_at)

      return (
        includes(date, filters.date) &&
        (!filters.type || p.vrsta === filters.type) &&
        includes(p.ime, filters.name) &&
        includes(p.email, filters.email) &&
        includes(p.telefon, filters.phone) &&
        includes(p.grad, filters.city) &&
        (!filters.status || p.status === filters.status)
      )
    })
  }, [filters, prijave])

  const hasFilters = Object.values(filters).some(Boolean)

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <>
      <div className="px-6 py-5 border-b border-[#f0f0f0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-[16px] font-bold text-dark">
            Sve prijave ({filteredPrijave.length}/{prijave.length})
          </h2>
          {hasFilters && (
            <p className="text-[12px] text-secondary mt-1">
              Prikazane su prijave koje odgovaraju aktivnim filterima.
            </p>
          )}
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="self-start sm:self-auto text-[12px] font-semibold text-dark bg-[#f0efe8] px-3 py-2 rounded-[10px] hover:bg-[#e6e1d8] transition-colors"
          >
            Očisti filtere
          </button>
        )}
      </div>

      {prijave.length === 0 ? (
        <div className="py-16 text-center text-secondary text-[15px]">
          Nema prijava za prikaz.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-[#f0f0f0] align-top">
                <FilterHeader label="Datum">
                  <input
                    value={filters.date}
                    onChange={(e) => setFilter('date', e.target.value)}
                    placeholder="dd.mm.gggg"
                    className={filterInputCls}
                  />
                </FilterHeader>
                <FilterHeader label="Vrsta">
                  <select
                    value={filters.type}
                    onChange={(e) => setFilter('type', e.target.value as Filters['type'])}
                    className={filterInputCls}
                  >
                    <option value="">Sve</option>
                    <option value="trebam">Treba pomoć</option>
                    <option value="zelim">Želi pomoći</option>
                  </select>
                </FilterHeader>
                <FilterHeader label="Ime">
                  <input
                    value={filters.name}
                    onChange={(e) => setFilter('name', e.target.value)}
                    placeholder="Traži ime"
                    className={filterInputCls}
                  />
                </FilterHeader>
                <FilterHeader label="Email">
                  <input
                    value={filters.email}
                    onChange={(e) => setFilter('email', e.target.value)}
                    placeholder="Traži email"
                    className={filterInputCls}
                  />
                </FilterHeader>
                <FilterHeader label="Telefon">
                  <input
                    value={filters.phone}
                    onChange={(e) => setFilter('phone', e.target.value)}
                    placeholder="Traži broj"
                    className={filterInputCls}
                  />
                </FilterHeader>
                <FilterHeader label="Grad">
                  <input
                    value={filters.city}
                    onChange={(e) => setFilter('city', e.target.value)}
                    placeholder="Traži grad"
                    className={filterInputCls}
                  />
                </FilterHeader>
                <FilterHeader label="Status">
                  <select
                    value={filters.status}
                    onChange={(e) => setFilter('status', e.target.value as Filters['status'])}
                    className={filterInputCls}
                  >
                    <option value="">Svi</option>
                    <option value="nova">Nova</option>
                    <option value="u-obradi">U obradi</option>
                    <option value="zavrsena">Završena</option>
                    <option value="odbijena">Odbijena</option>
                  </select>
                </FilterHeader>
                <th className="px-4 py-3 text-left text-[12px] font-semibold text-secondary tracking-[0.06em] uppercase">
                  Poruka
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPrijave.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-[14px] text-secondary">
                    Nema prijava za odabrane filtere.
                  </td>
                </tr>
              ) : (
                filteredPrijave.map((p) => (
                  <tr key={p.id} className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-4 text-[13px] text-secondary whitespace-nowrap">
                      {formatDate(p.created_at)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        p.vrsta === 'trebam'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {typeLabels[p.vrsta]}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[14px] font-medium text-dark">{p.ime}</td>
                    <td className="px-4 py-4 text-[13px] text-secondary">
                      <a href={`mailto:${p.email}`} className="hover:text-dark transition-colors underline-offset-2 hover:underline">
                        {p.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 text-[13px] text-secondary">
                      {p.telefon || '-'}
                    </td>
                    <td className="px-4 py-4 text-[13px] text-dark">{p.grad}</td>
                    <td className="px-4 py-4">
                      <StatusSelect id={p.id} status={p.status} />
                    </td>
                    <td className="px-4 py-4 text-[13px] text-secondary max-w-[240px]">
                      <p className="line-clamp-2 leading-[1.5]" title={p.poruka}>
                        {p.poruka}
                      </p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

function FilterHeader({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <th className="px-4 py-3 text-left">
      <div className="flex flex-col gap-2 min-w-[120px]">
        <span className="text-[12px] font-semibold text-secondary tracking-[0.06em] uppercase">
          {label}
        </span>
        {children}
      </div>
    </th>
  )
}

const filterInputCls =
  'w-full h-9 px-3 rounded-[9px] border border-[#e8e8e8] bg-white text-[12px] font-medium text-dark outline-none focus:border-yellow focus:shadow-[0_0_0_3px_rgba(74,144,143,0.14)]'
