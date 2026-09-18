import Image from 'next/image'

import { classNames } from '@/lib/class-names'

type ClubLogoProps = {
  className?: string
  priority?: boolean
}

export function ClubLogo({ className, priority = false }: ClubLogoProps) {
  return (
    <Image
      alt="StandFast Football Club crest"
      className={classNames('h-auto object-contain', className)}
      height={471}
      priority={priority}
      src="/standfast-fc-crest.png"
      width={523}
    />
  )
}
