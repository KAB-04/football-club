import type {
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

import { classNames } from '@/lib/class-names'

const controlStyles =
  'w-full rounded-sm border border-border bg-surface px-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-focus focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted-foreground'

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={classNames('text-label mb-2 block text-foreground', className)}
      {...props}
    />
  )
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={classNames(controlStyles, 'h-12', className)} {...props} />
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={classNames(controlStyles, 'min-h-32 resize-y py-3', className)}
      {...props}
    />
  )
}

export function Select({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={classNames(controlStyles, 'h-12', className)} {...props} />
}

export function FormError({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={classNames('text-sm font-medium text-danger', className)}
      role="alert"
      {...props}
    />
  )
}
