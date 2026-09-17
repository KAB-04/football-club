import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentAdmin } from '@/lib/auth/admin'

export const metadata: Metadata = {
  title: 'Administration Dashboard | StandFast FC',
}

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin().catch(() => null)

  if (!admin) {
    redirect('/admin/login')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-5 py-12 sm:px-8">
      <div className="w-full border-l-4 border-lime-500 pl-6">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-lime-700">
          StandFast FC Administration
        </p>
        <h1 className="mt-3 text-3xl font-bold">Dashboard foundation</h1>
      </div>
    </main>
  )
}
