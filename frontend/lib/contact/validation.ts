import type { ContactErrors, ContactValues } from './types'

export type ValidContactSubmission = Omit<ContactValues, 'phone'> & { phone: string | null }

export function validateContactSubmission(values: ContactValues): {
  data?: ValidContactSubmission
  errors: ContactErrors
} {
  const normalized = {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  }
  const errors: ContactErrors = {}

  if (!normalized.name) errors.name = 'Enter your name.'
  else if (normalized.name.length > 100) errors.name = 'Name must be 100 characters or fewer.'

  if (!normalized.email) errors.email = 'Enter your email address.'
  else if (normalized.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (normalized.phone && (normalized.phone.length > 30 || !/^[+\d\s().-]{5,30}$/.test(normalized.phone))) {
    errors.phone = 'Enter a valid phone number using 30 characters or fewer.'
  }

  if (!normalized.subject) errors.subject = 'Enter a subject.'
  else if (normalized.subject.length > 150) errors.subject = 'Subject must be 150 characters or fewer.'

  if (!normalized.message) errors.message = 'Enter a message.'
  else if (normalized.message.length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (normalized.message.length > 5000) errors.message = 'Message must be 5,000 characters or fewer.'

  if (Object.keys(errors).length) return { errors }

  return {
    data: { ...normalized, phone: normalized.phone || null },
    errors,
  }
}
