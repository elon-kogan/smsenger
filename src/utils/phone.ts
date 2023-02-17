import { getExample, parsePhoneNumber } from 'awesome-phonenumber'

import { PHONE_ERRORS } from './constants'

interface PhoneParsingResult<V extends boolean> {
  raw: string
  e164: V extends true ? string : string | undefined
  international: V extends true ? string : string | undefined
  valid: V
  error?: string
}

const parsePhone = (rawPhone: string): PhoneParsingResult<true> | PhoneParsingResult<false> => {
  const parsed = parsePhoneNumber(rawPhone)
  const { valid } = parsed
  const error = valid ? undefined : PHONE_ERRORS[parsed.possibility] || PHONE_ERRORS.base

  return {
    raw: rawPhone,
    international: valid ? parsed.number?.international : undefined,
    e164: valid ? parsed.number?.e164 : undefined,
    valid: valid as typeof valid extends true ? true : false,
    error,
  }
}

const getPhoneExample = () => getExample('IL').number?.international || ''

export { getPhoneExample, parsePhone }

export type { PhoneParsingResult }
