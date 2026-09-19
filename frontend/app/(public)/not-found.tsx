import { Container } from '@/components/layout/container'
import { LinkButton } from '@/components/ui/button'

export default function PublicNotFound() {
  return (
    <section className="flex min-h-[34rem] items-center bg-background py-16">
      <Container className="text-center">
        <p className="text-meta text-success">404</p>
        <h1 className="text-page-title mt-3">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">
          The page or published club record you requested could not be found.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <LinkButton href="/">Return Home</LinkButton>
          <LinkButton href="/teams" variant="outline">View Teams</LinkButton>
        </div>
      </Container>
    </section>
  )
}
