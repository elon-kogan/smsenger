import type { FC, ReactElement } from 'react'

import './Box.sass'

interface Props {
  title: string
  children: ReactElement
}

const MessageBox: FC<Props> = ({ title, children }) => (
  <div className="message-box">
    <div className="message-box__title">{title}</div>
    <div className="message-box__body">{children}</div>
  </div>
)

export default MessageBox
