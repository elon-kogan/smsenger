import { useEffect } from 'react'

import MessagesContainer from '@containers/Messages'
import { getList } from '@store/actions/messages'
import { useAppDispatch } from '@utils/hooks'

import type { FC } from 'react'

const MessagesPage: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => dispatch(getList), [dispatch])

  return <MessagesContainer />
}

export default MessagesPage
