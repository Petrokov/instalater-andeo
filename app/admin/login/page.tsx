import { adminLogin } from '@/app/actions/adminActions'
import { BrandLogoMark } from '@/components/ui/BrandLogoMark'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-[#f5f4f1] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 text-center">
          <BrandLogoMark className="h-12 w-auto mx-auto mb-4" />
          <h1 className="text-[22px] font-extrabold text-dark">Admin pristup</h1>
          <p className="text-[14px] text-secondary mt-1">Instalater Anđeo - upravljačka ploča</p>
        </div>

        <form
          action={adminLogin}
          className="bg-white rounded-[20px] p-5 sm:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.08)]"
        >
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-[10px] text-[13px] text-red-700 font-medium" role="alert">
              Pogrešna lozinka. Pokušajte ponovo.
            </div>
          )}

          <div className="flex flex-col gap-2 mb-6">
            <label htmlFor="password" className="text-[13px] font-semibold text-secondary">
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              className="w-full px-4 py-[13px] border border-[#e8e8e8] rounded-[12px] text-[15px] text-dark outline-none focus:border-yellow focus:shadow-[0_0_0_3px_rgba(244,230,0,0.18)] transition-all"
              placeholder="Lozinka"
            />
          </div>

          <button
            type="submit"
            className="w-full py-[13px] bg-dark text-white font-bold text-[15px] rounded-[12px] hover:bg-dark/90 transition-colors"
          >
            Prijava
          </button>
        </form>
      </div>
    </div>
  )
}
