'use server'

import { redirect } from 'next/navigation'

import { getCurrentAdmin } from '@/lib/auth/admin'
import { createClient } from '@/lib/supabase/server'

export type LoginState = {
  error: string | null
}

const GENERIC_LOGIN_ERROR =
  'Unable to sign in with the provided administrator credentials.'

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const emailValue = formData.get('email')
  const passwordValue = formData.get('password')
  const email = typeof emailValue === 'string' ? emailValue.trim() : ''
  const password = typeof passwordValue === 'string' ? passwordValue : ''

  if (!email || !email.includes('@')) {
    return { error: 'Enter a valid email address.' }
  }

  if (!password) {
    return { error: 'Enter your password.' }
  }

  let authorized = false

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      return { error: GENERIC_LOGIN_ERROR }
    }

    const admin = await getCurrentAdmin()

    if (!admin) {
      await supabase.auth.signOut()
      return { error: GENERIC_LOGIN_ERROR }
    }

    authorized = true
  } catch {
    return { error: GENERIC_LOGIN_ERROR }
  }

  if (authorized) {
    redirect('/admin/dashboard')
  }

  return { error: GENERIC_LOGIN_ERROR }
}
