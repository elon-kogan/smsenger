import { Buffer } from 'buffer'

import { TWILIO_BASE_URL, UNEXPECTED_ERROR } from './constants'

import type { Message, TwilioMessage } from '@customTypes/messages'

interface CreateMessage {
  (props: { from: string; to: string; text: string }): Promise<
    { errorMessage: string } | (Message & { errorMessage: undefined })
  >
}

const client = (sid: string, token: string) => {
  const createMessage: CreateMessage = async ({ from, to, text }) => {
    const { url, options } = getRequestOptions(sid, token, from, to, text)

    if (url && options) return await apiFetch(url, options).then(parseTwilioResponse)
    else return { errorMessage: UNEXPECTED_ERROR }
  }

  return { messages: { create: createMessage } }
}

const getRequestOptions = (sid: string, token: string, from: string, to: string, text: string) => {
  if (!sid || !token) return { url: null, options: null }

  return {
    url: new URL(`${TWILIO_BASE_URL}/${sid}/Messages.json`),
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
      },
      body: getBody(from, to, text),
    },
  }
}

const getBody = (from: string, to: string, text: string) =>
  [
    `Body=${encodeURIComponent(text)}`,
    `From=${encodeURIComponent(from)}`,
    `To=${encodeURIComponent(to)}`,
  ].join('&')

const parseTwilioResponse = ({
  error_code: errorCode,
  error_message: errorMessage,
  to,
  body,
  date_created: dateCreated,
}: TwilioMessage) => {
  if (errorCode || errorMessage || !to || !body || !dateCreated)
    return { errorMessage: errorMessage || UNEXPECTED_ERROR }
  else
    return {
      phone: to,
      text: body,
      createdAt: new Date(dateCreated),
    }
}

interface RequestOptions {
  method: string
  headers: Record<string, string>
  body?: string
}

const apiFetch = async (url: URL, options: RequestOptions) =>
  await fetch(url, options).then((response) => {
    if (response.ok) return response.json()
    else return { error_message: UNEXPECTED_ERROR }
  })

export { client }
