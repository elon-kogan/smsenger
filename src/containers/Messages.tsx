import { useState } from 'react'

import MessageBox from '@components/messages/Box'
import MessagesList from '@components/messages/List'
import NewMessage from '@components/messages/New'
import { createMessage } from '@store/actions/messages'
import { getMessages, isLoading } from '@store/reducers/messages'
import { MAX_MESSAGE_SIZE } from '@utils/constants'
import { useAppDispatch, useAppSelector } from '@utils/hooks'
import { parsePhone } from '@utils/phone'

import type { FC } from 'react'

import './Messages.sass'

const MessagesContainer: FC = () => {
  const [newMessage, setNewMessage] = useState({ phone: parsePhone(''), text: '' })
  const { phone, text } = newMessage
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getMessages)
  const isMessageLoading = useAppSelector(isLoading)

  const clearHandler = () => {
    setNewMessage({ phone: parsePhone(''), text: '' })
  }
  const submitHandler = () => {
    phone.valid && dispatch(createMessage(phone.e164, text))
  }
  const phoneChangeHandler = (rawPhone: string) => {
    setNewMessage({
      ...newMessage,
      phone: parsePhone(rawPhone),
    })
  }
  const textChangeHandler = (newText: string) =>
    void (newText.length <= MAX_MESSAGE_SIZE && setNewMessage({ ...newMessage, text: newText }))

  return (
    <div className="messages-wrapper">
      <MessageBox title="New Message">
        <NewMessage
          phone={(phone.valid && phone.international) || phone.raw}
          phoneError={phone.error}
          text={text}
          isLoading={isMessageLoading}
          onTextChange={textChangeHandler}
          onPhoneChange={phoneChangeHandler}
          onSubmit={submitHandler}
          onClear={clearHandler}
        />
      </MessageBox>
      <MessageBox title={'Message History' + (messages.length > 0 ? ` (${messages.length})` : '')}>
        <MessagesList messages={messages} />
      </MessageBox>
    </div>
  )
}

export default MessagesContainer
