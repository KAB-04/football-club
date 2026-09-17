import { redirect } from 'next/navigation'

import { getCurrentAdmin } from '@/lib/auth/admin'

import { logoutAction } from './actions'

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await getCurrentAdmin().catch(() => null)

  if (!admin) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold uppercase tracking-[0.14em]">
              StandFast FC Administration
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-400">
              {admin.profile.full_name}
            </p>
          </div>

          <form action={logoutAction}>
            <button
              className="h-10 border border-zinc-700 px-4 text-sm font-semibold text-white transition-colors hover:border-lime-400 hover:text-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
              type="submit"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {children}
    </div>
  )
}
