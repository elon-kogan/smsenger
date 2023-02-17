import dayjs from 'dayjs'

import { DATE_FORMAT, MAX_MESSAGE_SIZE } from '@utils/constants'

import type { FC } from 'react'
import type { Message } from '@customTypes/messages'

import './ListItem.sass'

interface Props {
  message: Message
}

const MessagesListItem: FC<Props> = ({ message }) => (
  <div className="messages-list-item">
    <div className="messages-list-item__header">
      <div className="messages-list-item__header__phone">{message.phone}</div>
      <div className="messages-list-item__header__date">
        {dayjs(message.sendedAt).format(DATE_FORMAT)}
      </div>
    </div>
    <div className="messages-list-item__text">{message.text}</div>
    <div className="messages-list-item__size messages__size">
      {message.text.length}/{MAX_MESSAGE_SIZE}
    </div>
  </div>
)

export default MessagesListItem
