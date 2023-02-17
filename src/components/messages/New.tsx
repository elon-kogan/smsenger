import { TextField } from '@mui/material'

import { MAX_MESSAGE_SIZE } from '@utils/constants'

import type { FC } from 'react'

import './New.sass'

interface Props {
  phone: string
  text: string
  onTextChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onSubmit: () => void
}

const NewMessage: FC<Props> = ({ phone, text, onTextChange, onPhoneChange, onSubmit }) => (
  <div className="new-message">
    <div className="new-message__label">Phone Number</div>
    <TextField
      value={phone}
      onChange={(event) => onPhoneChange(event.target.value)}
      variant="outlined"
      fullWidth
    />
    <div className="new-message__label">Message</div>

    <TextField
      classes={{ root: '' }}
      value={text}
      onChange={(event) => onTextChange(event.target.value)}
      variant="outlined"
      minRows={4}
      multiline
      fullWidth
    />
    <div className="new-message__size">
      {text.length}/{MAX_MESSAGE_SIZE}
    </div>
    <div className="new-message__actions">
      <div
        className="new-message__actions__button new-message__actions__clear"
        onClick={() => {
          onPhoneChange('')
          onTextChange('')
        }}
      >
        Clear
      </div>
      <div
        className="new-message__actions__button new-message__actions__submit"
        onClick={() => onSubmit}
      >
        Submit
      </div>
    </div>
  </div>
)

export default NewMessage
