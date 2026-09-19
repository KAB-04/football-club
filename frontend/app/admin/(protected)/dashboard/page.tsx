import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AdminPageHeader } from '@/components/admin/admin-page-header'
import { StatCard } from '@/components/admin/stat-card'
import { LinkButton } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getCurrentAdmin } from '@/lib/auth/admin'
import { getDashboardStats } from '@/lib/data/admin/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin().catch(() => null)

  if (!admin) {
    redirect('/admin/login')
  }

  const stats = await getDashboardStats()
  const adminName = admin.profile.full_name.trim() || 'Administrator'

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <AdminPageHeader
          description={`Welcome back, ${adminName}. Here is the current club content overview.`}
          eyebrow="StandFast FC Administration"
          title="Dashboard"
        />

        <section aria-labelledby="overview-heading" className="mt-10">
          <h2 className="text-section-title" id="overview-heading">Overview</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Active Players" value={stats.activePlayers} />
            <StatCard label="Upcoming Fixtures" value={stats.upcomingFixtures} />
            <StatCard label="Published Articles" value={stats.publishedArticles} />
            <StatCard label="Unread Messages" value={stats.unreadMessages} />
          </div>
        </section>

        <section aria-labelledby="quick-actions-heading" className="mt-10">
          <div>
            <h2 className="text-section-title" id="quick-actions-heading">Quick Actions</h2>
            <p className="mt-2 text-sm text-muted-foreground">Management tools will become available as their modules are completed.</p>
          </div>
          <Card className="mt-5 grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
            <LinkButton href="/admin/players/new" variant="outline">Add Player</LinkButton>
            <LinkButton href="/admin/fixtures/new" variant="outline">Add Fixture</LinkButton>
            <LinkButton href="/admin/news/new" variant="outline">Create News Article</LinkButton>
            <LinkButton href="/admin/gallery/new" variant="outline">Add Gallery Item</LinkButton>
          </Card>
        </section>
      </div>
    </main>
  )
}
