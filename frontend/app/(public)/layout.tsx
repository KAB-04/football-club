import { PublicFooter } from '@/components/layout/public-footer'
import { PublicHeader } from '@/components/layout/public-header'
import { getPublicSettings, type PublicSettings } from '@/lib/data/settings'

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings: PublicSettings = await getPublicSettings().catch(() => ({}))
  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-brand px-4 py-3 font-bold text-brand-foreground focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <PublicHeader leagueTableUrl={settings.league_table_url?.trim() || null} />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <PublicFooter settings={settings} />
    </div>
  )
}
