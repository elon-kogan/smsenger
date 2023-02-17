import { useState } from 'react'

import MessageBox from '@components/messages/Box'
import MessagesList from '@components/messages/List'
import NewMessage from '@components/messages/New'
import { createMessage } from '@store/actions/messages'
import { getMessages, isLoading } from '@store/reducers/messages'
import { useAppDispatch, useAppSelector } from '@utils/hooks'

import type { FC } from 'react'

import './Messages.sass'

interface NewMessageState {
  phone: string
  text: string
}

const MessagesContainer: FC = () => {
  const [newMessage, setNewMessage] = useState<NewMessageState>({ phone: '', text: '' })
  const { phone, text } = newMessage
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getMessages)
  const isMessageLoading = useAppSelector(isLoading)
  const submitHandler = () => dispatch(createMessage(phone, text))

  return (
    <div className="messages-wrapper">
      <MessageBox title="New Message">
        <NewMessage
          phone={phone}
          text={text}
          isLoading={isMessageLoading}
          onTextChange={(newText: string) => setNewMessage({ ...newMessage, text: newText })}
          onPhoneChange={(newPhone: string) => setNewMessage({ ...newMessage, phone: newPhone })}
          onSubmit={submitHandler}
        />
      </MessageBox>
      <MessageBox title={'Message History' + (messages.length > 0 ? ` (${messages.length})` : '')}>
        <MessagesList messages={messages} />
      </MessageBox>
    </div>
  )
}

export default MessagesContainer
