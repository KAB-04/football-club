import { LinkButton } from '@/components/ui/button'

export default function AdminNotFound() {
  return <main className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl border-l-4 border-brand bg-surface p-6"><p className="text-meta text-success">Administration</p><h1 className="text-page-title mt-2">Record not found</h1><p className="mt-3 text-muted-foreground">The requested administration record does not exist.</p><LinkButton className="mt-6" href="/admin/dashboard">Back to Dashboard</LinkButton></div></main>
}
