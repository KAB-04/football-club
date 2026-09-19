export type ContactValues = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactErrors = Partial<Record<ContactField, string>>

export type ContactFormState = {
  status: 'idle' | 'error' | 'success'
  values: ContactValues
  errors: ContactErrors
  formError?: string
}

export const emptyContactValues: ContactValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export const initialContactState: ContactFormState = {
  status: 'idle',
  values: emptyContactValues,
  errors: {},
}
