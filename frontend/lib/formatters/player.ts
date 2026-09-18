const MISSING_VALUE = 'Not provided'

export function calculateAge(dateOfBirth: string, referenceDate = new Date()): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateOfBirth)
  if (!match) throw new RangeError('dateOfBirth must use YYYY-MM-DD format')

  const birthYear = Number(match[1])
  const birthMonth = Number(match[2])
  const birthDay = Number(match[3])
  const validDate = new Date(Date.UTC(birthYear, birthMonth - 1, birthDay))

  if (
    validDate.getUTCFullYear() !== birthYear ||
    validDate.getUTCMonth() !== birthMonth - 1 ||
    validDate.getUTCDate() !== birthDay
  ) {
    throw new RangeError('dateOfBirth is not a valid calendar date')
  }

  const referenceYear = referenceDate.getUTCFullYear()
  const referenceMonth = referenceDate.getUTCMonth() + 1
  const referenceDay = referenceDate.getUTCDate()
  let age = referenceYear - birthYear

  if (
    referenceMonth < birthMonth ||
    (referenceMonth === birthMonth && referenceDay < birthDay)
  ) {
    age -= 1
  }

  if (age < 0) throw new RangeError('dateOfBirth cannot be after referenceDate')
  return age
}

export function formatJerseyNumber(jerseyNumber: number | null): string {
  return jerseyNumber === null ? MISSING_VALUE : `#${jerseyNumber}`
}

export function formatOptionalPlayerValue(value: string | null): string {
  return value?.trim() || MISSING_VALUE
}
