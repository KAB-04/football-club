export function ghanaInputToTimestamp(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null
  const date = new Date(`${value}:00.000Z`)
  return Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 16) !== value ? null : date.toISOString()
}

export function timestampToGhanaInput(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) return ''
  return date.toISOString().slice(0, 16)
}
