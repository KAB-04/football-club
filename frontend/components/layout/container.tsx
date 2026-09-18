import type { HTMLAttributes } from 'react'

import { classNames } from '@/lib/class-names'

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'mx-auto w-full max-w-[var(--content-max)] px-5 sm:px-8 lg:px-10',
        className,
      )}
      {...props}
    />
  )
}
