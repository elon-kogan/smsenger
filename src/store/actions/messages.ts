// import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import api from '@api'
import { MESSAGES } from './ActionTypes'

import type { Message } from '@customTypes/messages'
import type { AppDispatch } from '@store'
import type { MessageCreationActions, MessagesGettingActions } from './interfaces'

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
  api.sentMessage(
    phone,
    text,
    (message) => dispatch(messageCreated(message)),
    (errorMessage) => dispatch(creationFailed(errorMessage)),
  )
}

const startListGetting = (): MessagesGettingActions['Pending'] => ({
  type: MESSAGES.GET_LIST.PENDING,
})

const messagesLoaded = (messages: Message[]): MessagesGettingActions['Fulfilled'] => ({
  type: MESSAGES.GET_LIST.FULFILLED,
  messages,
})

const messagesGettingFailed = (errorMessage: string): MessagesGettingActions['Rejected'] => ({
  type: MESSAGES.GET_LIST.REJECTED,
  errorMessage,
})

const getList = (dispatch: AppDispatch) => {
  dispatch(startListGetting())
  api.getMessages(
    (messages) => dispatch(messagesLoaded(messages)),
    (errorMessage) => dispatch(messagesGettingFailed(errorMessage)),
  )
}

export { createMessage, getList }
