import moment from 'moment'

import { MAX_MESSAGE_SIZE } from '@utils/constants'

import type { FC } from 'react'
import type { Message } from '@customTypes/messages'

interface Props {
  message: Message
}

const MessagesListItem: FC<Props> = ({ message }) => (
  <div className="messages-list-item">
    <div className="messages-list-item__phone">{message.phone}</div>
    <div className="messages-list-item__date">{moment(message.sendedAt).format()}</div>
    <div className="messages-list-item__text">{message.text}</div>
    <div className="messages-list-item__size">
      {message.text.length}/{MAX_MESSAGE_SIZE}
    </div>
  </div>
)

export default MessagesListItem
