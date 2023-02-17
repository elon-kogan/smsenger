import type { PhoneNumberPossibility } from 'awesome-phonenumber'

const MAX_MESSAGE_SIZE = 250

const DATE_FORMAT = 'dddd, DD-MMM-YY HH:mm:ss Z'

const PHONE_ERRORS = {
  base: 'Wrong phone number',
  'invalid-country-code': 'Wrong country code',
  'too-long': 'Phone number is too long',
  'too-short': 'Phone number is too short',
} as Record<PhoneNumberPossibility | 'base', string | undefined>

export { DATE_FORMAT, MAX_MESSAGE_SIZE, PHONE_ERRORS }
