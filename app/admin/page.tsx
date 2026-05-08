import Link from 'next/link'
import { createServerClient } from '@/lib/supabase-server'
import { adminLogout } from '@/app/actions/adminActions'
import { StatusSelect } from './StatusSelect'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'
import type { PrijavaStatus } from '@/lib/database.types'

const statusCounts = (data: { status: PrijavaStatus }[]) => ({
  nova: data.filter((p) => p.status === 'nova').length,
  'u-obradi': data.filter((p) => p.status === 'u-obradi').length,
  zavrsena: data.filter((p) => p.status === 'zavrsena').length,
  odbijena: data.filter((p) => p.status === 'odbijena').length,
})

export default async function AdminPage() {
  const supabase = createServerClient()

  const { data: prijave, error } = await supabase
    .from('prijave')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Greška pri dohvaćanju podataka: {error.message}
      </div>
    )
  }

  const counts = statusCounts(prijave ?? [])

  return (
    <div className="min-h-screen bg-[#f5f4f1]">
      {/* Header */}
      <header className="bg-white border-b border-[#ebebeb] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <BrandLogoMark className="h-9 w-auto" />
          <div>
            <div className="text-[12px] text-secondary">Upravljačka ploča</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projekti"
            className="text-[13px] font-bold text-dark bg-yellow px-4 py-2 rounded-[10px] no-underline hover:bg-yellow/80 transition-colors"
          >
            Projekti
          </Link>
        <form action={adminLogout}>
          <button
            type="submit"
            className="text-[13px] text-secondary hover:text-dark transition-colors font-medium"
          >
            Odjava
          </button>
        </form>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Nove prijave', value: counts.nova, color: 'text-blue-600' },
            { label: 'U obradi', value: counts['u-obradi'], color: 'text-yellow-600' },
            { label: 'Završene', value: counts.zavrsena, color: 'text-green-600' },
            { label: 'Odbijene', value: counts.odbijena, color: 'text-red-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-[16px] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className={`text-[28px] font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-[13px] text-secondary mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#f0f0f0]">
            <h2 className="text-[16px] font-bold text-dark">
              Sve prijave ({prijave?.length ?? 0})
            </h2>
          </div>

          {!prijave?.length ? (
            <div className="py-16 text-center text-secondary text-[15px]">
              Nema prijava za prikaz.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f0f0]">
                    {['Datum', 'Vrsta', 'Ime', 'Email', 'Telefon', 'Grad', 'Status', 'Poruka'].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[12px] font-semibold text-secondary tracking-[0.06em] uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {prijave.map((p) => (
                    <tr key={p.id} className="border-b border-[#f8f8f8] hover:bg-[#fafafa] transition-colors">
                      <td className="px-4 py-4 text-[13px] text-secondary whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString('hr-HR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          p.vrsta === 'trebam'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {p.vrsta === 'trebam' ? 'Treba pomoć' : 'Želi pomoći'}
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
