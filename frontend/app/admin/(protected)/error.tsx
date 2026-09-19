'use client'

import { Button } from '@/components/ui/button'

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl border-l-4 border-danger pl-5">
        <p className="text-meta text-danger">Administration unavailable</p>
        <h1 className="text-page-title mt-2">We could not load this page</h1>
        <p className="mt-3 text-muted-foreground">Please try again. No changes have been made.</p>
        <Button className="mt-6" onClick={reset}>Try again</Button>
      </div>
    </main>
  )
}
