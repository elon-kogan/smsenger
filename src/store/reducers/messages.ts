import { combineReducers } from 'redux'

import { MESSAGES } from '@store/actions/ActionTypes'

import type { RootState } from '@store'
import type {
  EntitiesActions,
  ErrorMessageActions,
  LoadingActions,
  State,
} from './messages.interfaces'

const entities = (state: State['entities'] = [], action: EntitiesActions) => {
  switch (action.type) {
    case MESSAGES.GET_LIST.FULFILLED:
      return action.messages
    case MESSAGES.CREATE.FULFILLED:
      return [...state, action.message]
    default:
      return state
  }
}

const DEFAULT_LOADING = { creation: false, list: false }

const loading = (state: State['loading'] = DEFAULT_LOADING, action: LoadingActions) => {
  switch (action.type) {
    case MESSAGES.CREATE.PENDING:
      return { ...state, creation: true }
    case MESSAGES.CREATE.FULFILLED:
    case MESSAGES.CREATE.REJECTED:
      return { ...state, creation: false }
    case MESSAGES.GET_LIST.PENDING:
      return { ...state, list: true }
    case MESSAGES.GET_LIST.FULFILLED:
    case MESSAGES.GET_LIST.REJECTED:
      return { ...state, list: false }
    default:
      return state
  }
}

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

const isLoading = ({ messages: state }: RootState) => state.loading.creation || state.loading.list
const getMessages = ({ messages: state }: RootState) =>
  state.entities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
const getError = ({ messages: state }: RootState) => state.errorMessage

export { getError, getMessages, isLoading }
