import type { Message } from '@customTypes/messages'
import type { MESSAGES } from './ActionTypes'

interface MessageCreationActions {
  Pending: { type: typeof MESSAGES.CREATE.PENDING }
  Fulfilled: { type: typeof MESSAGES.CREATE.FULFILLED; message: Message }
  Rejected: { type: typeof MESSAGES.CREATE.REJECTED; errorMessage: string }
}

export type { MessageCreationActions }
