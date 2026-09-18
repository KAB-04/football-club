'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { FormError, Input, Label } from '@/components/ui/form'

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
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="email"
          disabled={isPending}
          id="email"
          name="email"
          placeholder="admin@standfastfc.com"
          required
          type="email"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="current-password"
          disabled={isPending}
          id="password"
          name="password"
          required
          type="password"
        />
      </div>

      <div aria-live="polite" className="min-h-6">
        {state.error ? <FormError>{state.error}</FormError> : null}
      </div>

      <Button
        className="w-full disabled:cursor-wait"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}
