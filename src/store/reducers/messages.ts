import { combineReducers } from 'redux'

import { MESSAGES } from '@store/actions/ActionTypes'

import type { Message } from '@customTypes/messages'
import type { RootState } from '@store'
import type { MessageCreationActions } from '@store/actions/interfaces'

interface State {
  entities: Message[]
  loading: boolean
  errorMessage: string | null
}

type EntitiesActions = MessageCreationActions['Fulfilled']

const entities = (state: State['entities'] = [], action: EntitiesActions) => {
  switch (action.type) {
    case MESSAGES.CREATE.FULFILLED:
      return [...state, action.message]
    default:
      return state
  }
}

type LoadingActions =
  | MessageCreationActions['Fulfilled']
  | MessageCreationActions['Rejected']
  | MessageCreationActions['Pending']

const loading = (state: State['loading'] = false, action: LoadingActions) => {
  switch (action.type) {
    case MESSAGES.CREATE.PENDING:
      return true
    case MESSAGES.CREATE.FULFILLED:
    case MESSAGES.CREATE.REJECTED:
      return false
    default:
      return state
  }
}

type ErrorMessageActions =
  | MessageCreationActions['Fulfilled']
  | MessageCreationActions['Rejected']
  | MessageCreationActions['Pending']

const errorMessage = (state: State['errorMessage'] = null, action: ErrorMessageActions) => {
  switch (action.type) {
    case MESSAGES.CREATE.PENDING:
    case MESSAGES.CREATE.FULFILLED:
      return null
    case MESSAGES.CREATE.REJECTED:
      return action.errorMessage
    default:
      return state
  }
}

export default combineReducers({ entities, loading, errorMessage })

const isLoading = ({ messages: state }: RootState) => state.loading
const getMessages = ({ messages: state }: RootState) =>
  state.entities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
const getError = ({ messages: state }: RootState) => state.errorMessage

export { getError, getMessages, isLoading }
