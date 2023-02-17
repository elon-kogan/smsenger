import { TextField } from '@mui/material'

import { MAX_MESSAGE_SIZE } from '@utils/constants'
import { getPhoneExample } from '@utils/phone'

import type { FC } from 'react'

import './New.sass'

interface Props {
  phone: string
  phoneError?: string
  text: string
  isLoading: boolean
  onTextChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
}

const NewMessage: FC<Props> = ({
  phone,
  phoneError,
  text,
  isLoading,
  onTextChange,
  onPhoneChange,
  onSubmit,
  onClear,
}) => (
  <div className="new-message">
    <div className="new-message__label">Phone Number</div>
    <TextField
      classes={{ root: 'new-message__phone-input' }}
      value={phone}
      onChange={(event) => onPhoneChange(event.target.value)}
      variant="outlined"
      disabled={isLoading}
      error={Boolean(phoneError)}
      helperText={phoneError}
      placeholder={getPhoneExample()}
      fullWidth
    />
    <div className="new-message__label">Message</div>

    <TextField
      value={text}
      onChange={(event) => onTextChange(event.target.value)}
      variant="outlined"
      minRows={4}
      maxRows={4}
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
          onClear()
        }}
      >
        Clear
      </div>
      <div
        className={`new-message__actions__button new-message__actions__submit${
          phoneError ? ' disabled' : ''
        }${isLoading ? ' loading disabled' : ''}`}
        onClick={() => {
          if (isLoading || phoneError) return
          onSubmit()
        }}
      >
        Submit{isLoading ? '...' : ''}
      </div>
    </div>
  </div>
)

export default NewMessage
