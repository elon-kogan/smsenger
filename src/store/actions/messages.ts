// import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import api from '@api'
import { MESSAGES } from './ActionTypes'

import type { Message } from '@customTypes/messages'
import type { AppDispatch } from '@store'
import type { MessageCreationActions } from './interfaces'

const startCreation = (): MessageCreationActions['Pending'] => ({ type: MESSAGES.CREATE.PENDING })

const messageCreated = (message: Message): MessageCreationActions['Fulfilled'] => ({
  type: MESSAGES.CREATE.FULFILLED,
  message,
})

const creationFailed = (errorMessage: string): MessageCreationActions['Rejected'] => ({
  type: MESSAGES.CREATE.REJECTED,
  errorMessage,
})

const createMessage = (phone: string, text: string) => (dispatch: AppDispatch) => {
  dispatch(startCreation())
  api.sendSms(
    phone,
    text,
    (message) => dispatch(messageCreated(message)),
    (errorMessage) => dispatch(creationFailed(errorMessage)),
  )
}

export { createMessage }
