import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ClubLogo } from '@/components/branding/club-logo'
import { getCurrentAdmin } from '@/lib/auth/admin'

import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: 'Administration Login | StandFast FC',
  description: 'Secure administrator access for StandFast Football Club.',
}

export default async function AdminLoginPage() {
  const currentAdmin = await getCurrentAdmin().catch(() => null)

  if (currentAdmin) {
    redirect('/admin/dashboard')
  }

  return (
    <main className="min-h-screen bg-surface lg:grid lg:grid-cols-[minmax(19rem,0.8fr)_minmax(30rem,1.2fr)]">
      <section className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-structural px-6 py-8 text-structural-foreground sm:px-10 lg:min-h-screen lg:px-12 lg:py-12">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-2 bg-brand"
        />
        <div className="relative">
          <div className="flex items-center gap-4">
            <ClubLogo className="w-20 shrink-0" priority />
            <div>
              <p className="text-xl font-black">STANDFAST FC</p>
              <p className="text-meta mt-1 text-brand">Horse Power</p>
            </div>
          </div>
        </div>

        <div className="relative mt-12 max-w-sm lg:mt-0">
          <p className="text-meta text-brand">
            Secure access
          </p>
          <h1 className="text-page-title mt-3">
            Club administration
          </h1>
        </div>
      </section>

      <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <p className="text-meta text-success">
            StandFast FC
          </p>
          <h2 className="text-page-title mt-2 text-foreground">
            Administration
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Sign in to manage club content.
          </p>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
