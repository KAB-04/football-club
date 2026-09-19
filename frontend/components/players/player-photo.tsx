/* Player photo hosts are administrator-managed and not fixed at build time. */
/* eslint-disable @next/next/no-img-element */
import { classNames } from '@/lib/class-names'
import type { PlayerWithTeam } from '@/lib/data/types'

type PlayerPhotoProps = {
  player: PlayerWithTeam
  className?: string
  eager?: boolean
}

export function PlayerPhoto({ player, className, eager = false }: PlayerPhotoProps) {
  const initials = player.full_name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join('')

  if (player.photo_url) {
    return (
      <div className={classNames('aspect-[4/5] overflow-hidden bg-surface-muted', className)}>
        <img
          alt={`${player.full_name}, ${player.team.name} player`}
          className="h-full w-full object-cover object-top"
          loading={eager ? 'eager' : 'lazy'}
          src={player.photo_url}
        />
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-structural text-structural-foreground',
        className,
      )}
    >
      <span aria-hidden="true" className="absolute -bottom-6 -right-2 text-[8rem] font-black leading-none text-white/[0.05]">
        {player.jersey_number ?? 'SF'}
      </span>
      <span aria-hidden="true" className="text-5xl font-black text-brand">
        {initials || 'SF'}
      </span>
      <span className="sr-only">No player photo available for {player.full_name}</span>
    </div>
  )
}
