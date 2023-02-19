import type { Message } from '@customTypes/messages'
import type { MessageCreationActions, MessagesGettingActions } from '@store/actions/interfaces'

interface State {
  entities: Message[]
  loading: { creation: boolean; list: boolean }
  errorMessage: string | null
}

type EntitiesActions = MessageCreationActions['Fulfilled'] | MessagesGettingActions['Fulfilled']

type LoadingActions =
  | MessageCreationActions['Fulfilled']
  | MessageCreationActions['Rejected']
  | MessageCreationActions['Pending']
  | MessagesGettingActions['Fulfilled']
  | MessagesGettingActions['Rejected']
  | MessagesGettingActions['Pending']

type ErrorMessageActions =
  | MessageCreationActions['Fulfilled']
  | MessageCreationActions['Rejected']
  | MessageCreationActions['Pending']

export type { EntitiesActions, ErrorMessageActions, LoadingActions, State }
