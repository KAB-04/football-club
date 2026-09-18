import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Container } from '@/components/layout/container'
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
    <main className="flex min-h-[calc(100vh-4rem)] items-center py-12">
      <Container>
        <div className="w-full border-l-4 border-brand pl-6">
          <p className="text-meta text-success">
            StandFast FC Administration
          </p>
          <h1 className="text-page-title mt-3">Dashboard foundation</h1>
        </div>
      </Container>
    </main>
  )
}
