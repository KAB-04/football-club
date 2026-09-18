import { redirect } from 'next/navigation'

import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/15 bg-structural text-structural-foreground">
        <Container className="flex min-h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <ClubLogo className="w-10 shrink-0" priority />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase">
                StandFast FC Administration
              </p>
              <p className="mt-0.5 truncate text-xs text-white/65">
                {admin.profile.full_name}
              </p>
            </div>
          </div>

          <form action={logoutAction}>
            <Button
              className="border-white/30 text-white hover:border-brand hover:bg-transparent hover:text-brand"
              size="sm"
              type="submit"
              variant="outline"
            >
              Sign out
            </Button>
          </form>
        </Container>
      </header>

      {children}
    </div>
  )
}
