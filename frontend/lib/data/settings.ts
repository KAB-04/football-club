import 'server-only'

import { createClient } from '@/lib/supabase/server'

import { throwPublicDataError } from './errors'

export type PublicSettings = Record<string, string>

export async function getPublicSettings(): Promise<PublicSettings> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .order('key', { ascending: true })

  if (error) throwPublicDataError('settings', error)
  return Object.fromEntries(data.map(({ key, value }) => [key, value]))
}

export async function getPublicSetting(key: string): Promise<string | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle()

  if (error) throwPublicDataError('setting', error)
  return data?.value ?? null
}
