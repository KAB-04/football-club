'use server'

import { notifyClubOfContactSubmission } from '@/lib/contact/notification'
import { storeContactSubmission } from '@/lib/contact/store'
import { emptyContactValues, type ContactFormState, type ContactValues } from '@/lib/contact/types'
import { validateContactSubmission } from '@/lib/contact/validation'

const STORAGE_ERROR = "We couldn't send your message right now. Please try again later or contact the club by email."

export async function submitContactAction(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values: ContactValues = {
    name: getString(formData, 'name'),
    email: getString(formData, 'email'),
    phone: getString(formData, 'phone'),
    subject: getString(formData, 'subject'),
    message: getString(formData, 'message'),
  }

  if (getString(formData, 'website')) {
    return { status: 'success', values: emptyContactValues, errors: {} }
  }

  const validation = validateContactSubmission(values)
  if (!validation.data) {
    return { status: 'error', values, errors: validation.errors }
  }

  try {
    await storeContactSubmission(validation.data)
  } catch (error) {
    console.error('[contact-submission]', {
      reason: error instanceof Error ? error.message : 'unknown',
    })
    return { status: 'error', values, errors: {}, formError: STORAGE_ERROR }
  }

  try {
    await notifyClubOfContactSubmission(validation.data)
  } catch {
    console.warn('[contact-notification] failed after successful storage')
  }

  return { status: 'success', values: emptyContactValues, errors: {} }
}

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}
