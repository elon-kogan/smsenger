import { apiFetch, getRequestOptions } from './utils'

import type { Message, MessageApi } from '@customTypes/messages'

interface SendMessage {
  (
    phone: string,
    text: string,
    cb: (message: Message) => void,
    onError: (errorMessage: string) => void,
  ): Promise<void>
}

interface GetMessages {
  (cb: (messages: Message[]) => void, onError: (errorMessage: string) => void): Promise<void>
}

const transformMessage = ({ created_at: createdAt, ...rawMessage }: MessageApi) => ({
  ...rawMessage,
  createdAt: new Date(createdAt),
})

const transformMessages = (rawMessages: MessageApi[]) => rawMessages.map(transformMessage)

const getMessages: GetMessages = async (cb, onError) => {
  const { url, options } = getRequestOptions({ endpoint: 'messages' })
  apiFetch(url, options)
    .then(transformMessages)
    .then((messages) => cb(messages))
    .catch((error) => onError(error.message))
}

const sentMessage: SendMessage = async (phone, text, cb, onError) => {
  const payload = { phone, text }
  const { url, options } = getRequestOptions({ method: 'POST', endpoint: 'messages', payload })
  apiFetch(url, options)
    .then(transformMessage)
    .then((message) => cb(message))
    .catch((error) => {
      console.log(error.message)
      onError(error.message)
    })
}

export { getMessages, sentMessage }
