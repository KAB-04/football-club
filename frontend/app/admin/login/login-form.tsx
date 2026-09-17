'use client'

import { useActionState } from 'react'

import { loginAction, type LoginState } from './actions'

const initialState: LoginState = { error: null }

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  )

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          className="mb-2 block text-sm font-medium text-zinc-800"
          htmlFor="email"
        >
          Email
        </label>
        <input
          autoComplete="email"
          className="h-12 w-full border border-zinc-300 bg-white px-3.5 text-base text-zinc-950 outline-none transition-colors placeholder:text-zinc-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-200 disabled:cursor-not-allowed disabled:bg-zinc-100"
          disabled={isPending}
          id="email"
          name="email"
          placeholder="admin@standfastfc.com"
          required
          type="email"
        />
      </div>

      <div>
        <label
          className="mb-2 block text-sm font-medium text-zinc-800"
          htmlFor="password"
        >
          Password
        </label>
        <input
          autoComplete="current-password"
          className="h-12 w-full border border-zinc-300 bg-white px-3.5 text-base text-zinc-950 outline-none transition-colors focus:border-lime-600 focus:ring-2 focus:ring-lime-200 disabled:cursor-not-allowed disabled:bg-zinc-100"
          disabled={isPending}
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      <div aria-live="polite" className="min-h-6">
        {state.error ? (
          <p className="text-sm font-medium text-red-700" role="alert">
            {state.error}
          </p>
        ) : null}
      </div>

      <button
        className="flex h-12 w-full items-center justify-center bg-lime-400 px-4 text-sm font-bold text-zinc-950 transition-colors hover:bg-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 disabled:cursor-wait disabled:bg-zinc-300 disabled:text-zinc-600"
        disabled={isPending}
        type="submit"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
