import type { FC, ReactNode } from 'react'

import './Box.sass'

interface Props {
  title: string | ReactNode
  children: ReactNode
}

const MessageBox: FC<Props> = ({ title, children }) => (
  <div className="message-box">
    <div className="message-box__title">{title}</div>
    <div className="message-box__body">{children}</div>
  </div>
)

export default MessageBox
