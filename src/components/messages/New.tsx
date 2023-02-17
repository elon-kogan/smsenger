import { TextField } from '@mui/material'

import { MAX_MESSAGE_SIZE } from '@utils/constants'

import type { FC } from 'react'

import './New.sass'

interface Props {
  phone: string
  text: string
  isLoading: boolean
  onTextChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
}

const NewMessage: FC<Props> = ({
  phone,
  text,
  isLoading,
  onTextChange,
  onPhoneChange,
  onSubmit,
}) => (
  <div className="new-message">
    <div className="new-message__label">Phone Number</div>
    <TextField
      value={phone}
      onChange={(event) => onPhoneChange(event.target.value)}
      variant="outlined"
      disabled={isLoading}
      fullWidth
    />
    <div className="new-message__label">Message</div>

    <TextField
      classes={{ root: '' }}
      value={text}
      onChange={(event) => onTextChange(event.target.value)}
      variant="outlined"
      minRows={4}
      disabled={isLoading}
      multiline
      fullWidth
    />
    <div className="new-message__size messages__size">
      {text.length}/{MAX_MESSAGE_SIZE}
    </div>
    <div className="new-message__actions">
      <div
        className="new-message__actions__button new-message__actions__clear"
        onClick={() => {
          if (isLoading) return
          onPhoneChange('')
          onTextChange('')
        }}
      >
        Clear
      </div>
      <div
        className="new-message__actions__button new-message__actions__submit"
        onClick={() => {
          if (isLoading) return
          onSubmit()
        }}
      >
        Submit{isLoading ? '...' : ''}
      </div>
    </div>
  </div>
)

export default NewMessage
