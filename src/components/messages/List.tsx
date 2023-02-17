import { memo } from 'react'

import MessagesListItem from './Listitem'

import type { FC } from 'react'
import type { Message } from '@customTypes/messages'

import './List.sass'

interface Props {
  messages: Message[]
}

const MessagesList: FC<Props> = ({ messages }) => (
  <div className="list-messages">
    {messages.map((message, index) => (
      <MessagesListItem message={message} key={index} />
    ))}
  </div>
)

export default memo(MessagesList)
