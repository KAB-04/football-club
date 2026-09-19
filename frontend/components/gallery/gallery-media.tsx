'use client'

/* Gallery media hosts are administrator-provided and not fixed at build time. */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

import { classNames } from '@/lib/class-names'

export function GalleryMedia({
  alt,
  className,
  label,
  src,
}: {
  alt: string
  className?: string
  label: 'Photo' | 'Video'
  src: string | null
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={classNames('relative overflow-hidden bg-structural', className)}>
      {!src || failed ? (
        <div className="absolute inset-0 flex items-center justify-center p-5 text-center">
          <span aria-hidden="true" className="text-4xl font-black text-brand/55">{label === 'Video' ? 'VIDEO' : 'SF'}</span>
          <span className="sr-only">{label} preview unavailable</span>
        </div>
      ) : (
        <img
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
          src={src}
        />
      )}
    </div>
  )
}
