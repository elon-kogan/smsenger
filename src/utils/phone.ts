import { getExample, parsePhoneNumber } from 'awesome-phonenumber'

import { PHONE_ERRORS } from './constants'

interface PhoneValidationResult {
  raw: string
  international?: string
  valid: boolean
  error?: string
}

const validatePhone = (rawPhone: string): PhoneValidationResult => {
  const parsed = parsePhoneNumber(rawPhone)
  const isValid = parsed.valid
  const error = isValid ? undefined : PHONE_ERRORS[parsed.possibility] || PHONE_ERRORS.base

  return {
    raw: rawPhone,
    international: parsed.number?.international,
    valid: isValid,
    error,
  }
}

const getPhoneExample = () => getExample('IL').number?.international || ''

export { getPhoneExample, validatePhone }
