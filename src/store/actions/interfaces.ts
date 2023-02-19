import type { Message } from '@customTypes/messages'
import type { MESSAGES } from './ActionTypes'

interface MessageCreationActions {
  Pending: { type: typeof MESSAGES.CREATE.PENDING }
  Fulfilled: { type: typeof MESSAGES.CREATE.FULFILLED; message: Message }
  Rejected: { type: typeof MESSAGES.CREATE.REJECTED; errorMessage: string }
}

interface MessagesGettingActions {
  Pending: { type: typeof MESSAGES.GET_LIST.PENDING }
  Fulfilled: { type: typeof MESSAGES.GET_LIST.FULFILLED; messages: Message[] }
  Rejected: { type: typeof MESSAGES.GET_LIST.REJECTED; errorMessage: string }
}

export type { MessageCreationActions, MessagesGettingActions }
