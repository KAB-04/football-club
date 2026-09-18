import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import { classNames } from '@/lib/class-names'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-brand bg-brand text-brand-foreground hover:border-brand-hover hover:bg-brand-hover',
  secondary:
    'border-structural bg-structural text-structural-foreground hover:bg-foreground',
  outline:
    'border-border bg-transparent text-foreground hover:border-foreground hover:bg-surface-muted',
  ghost:
    'border-transparent bg-transparent text-foreground hover:bg-surface-muted',
  danger:
    'border-danger bg-danger text-danger-foreground hover:brightness-90',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
}

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return classNames(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-sm border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-55',
    variants[variant],
    sizes[size],
    className,
  )
}

export function Button({
  className,
  type = 'button',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        buttonClassName(variant, size, className),
      )}
      type={type}
      {...props}
    />
  )
}

export function LinkButton({
  className,
  href,
  variant = 'primary',
  size = 'md',
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={buttonClassName(variant, size, className)}
      href={href}
      {...props}
    />
  )
}
