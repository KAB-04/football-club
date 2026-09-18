export type NavigationItem = {
  label: string
  href: string
  match: string
}

export const publicNavigation: NavigationItem[] = [
  { label: 'Home', href: '/', match: '/' },
  { label: 'Club', href: '/club', match: '/club' },
  { label: 'Teams', href: '/teams', match: '/teams' },
  { label: 'Fixtures & Results', href: '/fixtures', match: '/fixtures' },
  { label: 'News', href: '/news', match: '/news' },
  { label: 'Gallery', href: '/gallery', match: '/gallery' },
  { label: 'Contact', href: '/contact', match: '/contact' },
]

export const teamNavigation = [
  { label: 'U10', href: '/teams/u10' },
  { label: 'U13', href: '/teams/u13' },
  { label: 'U15', href: '/teams/u15' },
  { label: 'U17', href: '/teams/u17' },
]

export const leagueTableUrl: string | null = null

export const socialLinks: Record<string, string | null> = {
  instagram: null,
  facebook: null,
  tiktok: null,
}
