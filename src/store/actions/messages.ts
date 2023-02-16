// import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { MESSAGES } from './ActionTypes'

import type { Message } from '@customTypes/messages'
import type { AppDispatch } from '@store'
import type { MessageCreationActions } from './interfaces'

const startCreation = (): MessageCreationActions['Pending'] => ({ type: MESSAGES.CREATE.PENDING })
const messageCreated = (message: Message): MessageCreationActions['Fulfilled'] => ({
  type: MESSAGES.CREATE.FULFILLED,
  message,
})

const createMessage = (phone: string, text: string) => (dispatch: AppDispatch) => {
  dispatch(startCreation())
  const message = { phone, text, createdAt: new Date() }

  setTimeout(() => {
    console.log(phone, text)
    dispatch(messageCreated({ ...message, sendedAt: new Date() }))
  }, 5000)
}

export { createMessage }
