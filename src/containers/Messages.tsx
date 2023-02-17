import { useState } from 'react'

import MessageBox from '@components/messages/Box'
import MessagesList from '@components/messages/List'
import NewMessage from '@components/messages/New'
import { createMessage } from '@store/actions/messages'
import { getMessages, isLoading } from '@store/reducers/messages'
import { MAX_MESSAGE_SIZE } from '@utils/constants'
import { useAppDispatch, useAppSelector } from '@utils/hooks'
import { validatePhone } from '@utils/phone'

import type { FC } from 'react'

import './Messages.sass'

interface NewMessageState {
  phone: string
  text: string
  phoneError?: string
}

const MessagesContainer: FC = () => {
  const [newMessage, setNewMessage] = useState<NewMessageState>({ phone: '', text: '' })
  const { phone, text, phoneError } = newMessage
  const dispatch = useAppDispatch()
  const messages = useAppSelector(getMessages)
  const isMessageLoading = useAppSelector(isLoading)

  const submitHandler = () => dispatch(createMessage(phone, text))
  const phoneChangeHandler = (rawPhone: string) => {
    const phone = validatePhone(rawPhone)
    console.log(phone)
    setNewMessage({
      ...newMessage,
      phone: (phone.valid && phone.international) || phone.raw,
      phoneError: phone.error,
    })
  }
  const textChangeHandler = (newText: string) =>
    void (newText.length <= MAX_MESSAGE_SIZE && setNewMessage({ ...newMessage, text: newText }))

  return (
    <div className="messages-wrapper">
      <MessageBox title="New Message">
        <NewMessage
          phone={phone}
          phoneError={phoneError}
          text={text}
          isLoading={isMessageLoading}
          onTextChange={textChangeHandler}
          onPhoneChange={phoneChangeHandler}
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
