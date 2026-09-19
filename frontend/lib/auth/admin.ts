import 'server-only'

import type { User } from '@supabase/supabase-js'
import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']

export type CurrentAdmin = {
  user: User
  profile: AdminProfile
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return error ? null : user
}

async function resolveCurrentAdmin(): Promise<CurrentAdmin | null> {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return null
  }

  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .eq('role', 'admin')
    .eq('is_active', true)
    .maybeSingle()

  if (profileError || !profile) {
    return null
  }

  return { user, profile }
}

export const getCurrentAdmin = cache(resolveCurrentAdmin)
