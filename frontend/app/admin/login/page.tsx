import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(19rem,0.8fr)_minmax(30rem,1.2fr)]">
      <section className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-zinc-950 px-6 py-8 text-white sm:px-10 lg:min-h-screen lg:px-12 lg:py-12">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-2 bg-lime-400"
        />
        <div className="relative">
          <div className="inline-flex border border-zinc-700 px-4 py-3">
            <span className="text-xl font-black tracking-[0.16em]">
              STANDFAST FC
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-lime-400">
            Horse Power
          </p>
        </div>

        <div className="relative mt-12 max-w-sm lg:mt-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-400">
            Secure access
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Club administration
          </h1>
        </div>
      </section>

      <section className="flex items-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-lime-700">
            StandFast FC
          </p>
          <h2 className="mt-2 text-3xl font-bold text-zinc-950">
            Administration
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Sign in to manage club content.
          </p>
          <LoginForm />
        </div>
      </section>
    </main>
  )
}
