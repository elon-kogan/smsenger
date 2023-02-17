import { combineReducers } from 'redux'

import { MESSAGES } from '@store/actions/ActionTypes'

import type { Message } from '@customTypes/messages'
import type { RootState } from '@store'
import type { MessageCreationActions } from '@store/actions/interfaces'

interface State {
  entities: Message[]
  loading: boolean
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

export default combineReducers({ entities, loading })

const isLoading = ({ messages: state }: RootState) => state.loading
const getMessages = ({ messages: state }: RootState) =>
  state.entities.sort((a, b) => b.sendedAt.getTime() - a.sendedAt.getTime())

export { getMessages, isLoading }
