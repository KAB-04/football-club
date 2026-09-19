import type { Metadata } from 'next'

import { ContactDetails } from '@/components/contact/contact-details'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactHero } from '@/components/contact/contact-hero'
import { Container } from '@/components/layout/container'
import { getPublicSettings, type PublicSettings } from '@/lib/data/settings'

export const metadata: Metadata = {
  title: 'Contact | StandFast FC',
  description: 'Contact StandFast Football Club in Ashaiman, Ghana.',
}

const FALLBACK_EMAIL = 'standfastfc@gmail.com'
const FALLBACK_LOCATION = 'Ashaiman, Ghana'

export default async function ContactPage() {
  let settings: PublicSettings = {}
  try {
    settings = await getPublicSettings()
  } catch {
    // Confirmed public fallbacks keep contact information available.
  }

  return (
    <>
      <ContactHero />
      <div className="bg-background py-14 sm:py-18">
        <Container className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <ContactDetails
            email={settings.club_email?.trim() || FALLBACK_EMAIL}
            location={settings.club_location?.trim() || FALLBACK_LOCATION}
            socialLinks={getSocialLinks(settings)}
          />
          <ContactForm />
        </Container>
      </div>
    </>
  )
}

function getSocialLinks(settings: PublicSettings) {
  return [
    ['Instagram', settings.instagram_url],
    ['Facebook', settings.facebook_url],
    ['TikTok', settings.tiktok_url],
  ].flatMap(([label, value]) => {
    if (!value) return []
    try {
      const url = new URL(value)
      return url.protocol === 'https:' ? [{ label, href: url.toString() }] : []
    } catch {
      return []
    }
  })
}
