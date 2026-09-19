import Link from 'next/link'

import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'
import { publicNavigation, teamNavigation } from '@/lib/navigation'
import type { PublicSettings } from '@/lib/data/settings'

const footerNavigation = publicNavigation.filter(
  (item) => item.match !== '/' && item.match !== '/contact',
)

export function PublicFooter({ settings }: { settings: PublicSettings }) {
  const currentYear = new Date().getFullYear()
  const configuredSocialLinks = [['instagram', settings.instagram_url], ['facebook', settings.facebook_url], ['tiktok', settings.tiktok_url]].filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))
  const email = settings.club_email?.trim() || 'standfastfc@gmail.com'
  const location = settings.club_location?.trim() || 'Ashaiman, Ghana'

  return (
    <footer className="bg-structural text-structural-foreground">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-16">
        <div>
          <ClubLogo className="mb-5 w-24" />
          <p className="text-xl font-black uppercase text-white">StandFast FC</p>
          <p className="text-meta mt-2 text-brand">Horse Power</p>
          <p className="mt-4 text-sm leading-6 text-white/65">{location}</p>
        </div>

        <FooterGroup title="Explore">
          {footerNavigation.map((item) => (
            <li key={item.href}>
              <Link className="footer-link" href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li><Link className="footer-link" href="/contact">Contact</Link></li>
        </FooterGroup>

        <FooterGroup title="Teams">
          <li><Link className="footer-link" href="/teams">All teams</Link></li>
          {teamNavigation.map((team) => (
            <li key={team.href}>
              <Link className="footer-link" href={team.href}>{team.label}</Link>
            </li>
          ))}
        </FooterGroup>

        <div>
          <h2 className="text-label text-white">Contact</h2>
          <a className="footer-link mt-4 inline-flex" href={`mailto:${email}`}>
            {email}
          </a>
          <h2 className="text-label mt-7 text-white">Social</h2>
          {configuredSocialLinks.length ? (
            <ul className="mt-3 space-y-2">
              {configuredSocialLinks.map(([name, href]) => (
                <li key={name}>
                  <a className="footer-link capitalize" href={href} rel="noreferrer" target="_blank">
                    {name} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-white/50">Official profiles coming soon</p>
          )}
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="py-5">
          <p className="text-xs text-white/55">
            © {currentYear} StandFast Football Club. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}

function FooterGroup({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <div>
      <h2 className="text-label text-white">{title}</h2>
      <ul className="mt-3 space-y-2">{children}</ul>
    </div>
  )
}
