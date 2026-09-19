import { Container } from '@/components/layout/container'

export function ContactHero() {
  return (
    <section className="border-b-2 border-brand bg-structural py-14 text-structural-foreground sm:py-16">
      <Container>
        <p className="text-meta text-brand">Contact</p>
        <h1 className="text-page-title mt-3 text-white">Get in Touch with StandFast FC</h1>
        <p className="mt-4 max-w-2xl leading-7 text-white/70">Contact StandFast Football Club in Ashaiman, Ghana.</p>
      </Container>
    </section>
  )
}
