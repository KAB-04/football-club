import 'server-only'

import type { ValidContactSubmission } from '@/lib/contact/validation'

export async function notifyClubOfContactSubmission(
  submission: ValidContactSubmission,
): Promise<boolean> {
  void submission
  // No email provider is configured yet. Storage remains the source of record,
  // and this boundary can be connected without changing the public form.
  console.warn('[contact-notification] skipped: provider not configured')
  return false
}
