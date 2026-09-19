'use client'

import { cloneElement, useActionState, type ReactElement } from 'react'
import { useFormStatus } from 'react-dom'

import { submitContactAction } from '@/app/(public)/contact/actions'
import { Button } from '@/components/ui/button'
import { FormError, Input, Label, Textarea } from '@/components/ui/form'
import { initialContactState } from '@/lib/contact/types'

export function ContactForm() {
  const [state, action] = useActionState(submitContactAction, initialContactState)

  if (state.status === 'success') {
    return (
      <div aria-live="polite" className="border border-success/40 bg-surface p-7" role="status">
        <h2 className="text-section-title">Message received</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Thanks for contacting StandFast FC. Your message has been received.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="border border-border bg-surface p-5 sm:p-7" noValidate>
      <h2 className="text-section-title">Send an enquiry</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">Required fields are marked with an asterisk.</p>

      {state.formError ? (
        <div className="mt-6 border border-danger/40 bg-background p-4" role="alert">
          <p className="font-semibold text-danger">{state.formError}</p>
          <a className="mt-2 inline-flex text-sm font-bold text-success hover:text-foreground" href="mailto:standfastfc@gmail.com">standfastfc@gmail.com</a>
        </div>
      ) : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field error={state.errors.name} label="Name *" name="name">
          <Input autoComplete="name" defaultValue={state.values.name} maxLength={100} name="name" required />
        </Field>
        <Field error={state.errors.email} label="Email *" name="email">
          <Input autoComplete="email" defaultValue={state.values.email} maxLength={254} name="email" required type="email" />
        </Field>
        <Field error={state.errors.phone} label="Phone" name="phone">
          <Input autoComplete="tel" defaultValue={state.values.phone} inputMode="tel" maxLength={30} name="phone" type="tel" />
        </Field>
        <Field error={state.errors.subject} label="Subject *" name="subject">
          <Input defaultValue={state.values.subject} maxLength={150} name="subject" required />
        </Field>
      </div>
      <Field className="mt-5" error={state.errors.message} label="Message *" name="message">
        <Textarea defaultValue={state.values.message} maxLength={5000} minLength={10} name="message" required rows={7} />
      </Field>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
      </div>

      <div className="mt-7"><SubmitButton /></div>
    </form>
  )
}

function Field({ children, className, error, label, name }: {
  children: ReactElement<{ 'aria-describedby'?: string; 'aria-invalid'?: boolean; id?: string }>
  className?: string
  error?: string
  label: string
  name: string
}) {
  const control = cloneElement(children, {
    id: name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${name}-error` : undefined,
  })

  return (
    <div className={className}>
      <Label htmlFor={name}>{label}</Label>
      {control}
      {error ? <FormError className="mt-2" id={`${name}-error`}>{error}</FormError> : null}
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return <Button disabled={pending} type="submit">{pending ? 'Sending...' : 'Send Message'}</Button>
}
