import 'server-only'

export class PublicDataError extends Error {
  constructor(context: string) {
    super(`Unable to load public ${context}.`)
    this.name = 'PublicDataError'
  }
}

type ErrorDetails = {
  code?: unknown
  message?: unknown
}

export function throwPublicDataError(context: string, error: unknown): never {
  const details = typeof error === 'object' && error !== null
    ? (error as ErrorDetails)
    : null

  console.error(`[public-data:${context}]`, {
    code: typeof details?.code === 'string' ? details.code : undefined,
    message: typeof details?.message === 'string' ? details.message : 'Unknown query error',
  })

  throw new PublicDataError(context)
}
