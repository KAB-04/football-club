import { ClubLogo } from '@/components/branding/club-logo'
import { Container } from '@/components/layout/container'
import { LinkButton } from '@/components/ui/button'

export function ClosingCta() {
  return (
    <section className="border-b border-white/15 bg-structural py-16 text-structural-foreground sm:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <ClubLogo className="w-20 shrink-0 sm:w-24" />
          <div>
            <p className="text-meta text-brand">Ashaiman, Ghana</p>
            <h2 className="text-section-title mt-2 text-white">StandFast FC. Horse Power.</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/club" variant="primary">Discover the Club</LinkButton>
          <LinkButton
            className="border-white/35 text-white hover:border-brand hover:bg-transparent hover:text-brand"
            href="/contact"
            variant="outline"
          >
            Contact Us
          </LinkButton>
        </div>
      </Container>
    </section>
  )
}
