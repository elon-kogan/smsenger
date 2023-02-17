import { memo } from 'react'

import type { FC } from 'react'
import type { Message } from '@customTypes/messages'

import './List.sass'

interface Props {
  messages: Message[]
}

const MessagesList: FC<Props> = ({ messages }) => (
  <div className="list-messages">
    {messages.map((message, index) => (
      <div key={index}>{message.text}</div>
    ))}
  </div>
)

export default memo(MessagesList)
