import 'server-only'

import { createClient } from '@supabase/supabase-js'

import type { ValidContactSubmission } from '@/lib/contact/validation'
import type { Database } from '@/types/database'

export async function storeContactSubmission(submission: ValidContactSubmission) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) throw new Error('contact_storage_not_configured')

  const supabase = createClient<Database>(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error } = await supabase.from('contact_submissions').insert({
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    subject: submission.subject,
    message: submission.message,
  })

  if (error) {
    console.error('[contact-submission:storage]', { code: error.code || 'unknown' })
    throw new Error('contact_storage_failed')
  }
}
