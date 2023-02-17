import { UNEXPECTED_ERROR } from '@utils/constants'
import { client as twilioClient } from '@utils/twilio'

import type { Message } from '@customTypes/messages'

const SENDER = process.env.REACT_APP_TWILIO_NUMBER
const TOKEN = process.env.REACT_APP_TWILIO_TOKEN
const SID = process.env.REACT_APP_TWILIO_SID

interface SendSms {
  (
    phone: string,
    text: string,
    cb: (message: Message) => void,
    onError: (errorMessage: string) => void,
  ): Promise<void>
}

const sendSms: SendSms = async (phone, text, cb, onError) => {
  if (SENDER && SID && TOKEN) {
    await twilioClient(SID, TOKEN)
      .messages.create({ from: SENDER, to: phone, text })
      .then((result) => {
        if (result.errorMessage) onError(result.errorMessage)
        else cb(result as Message)
      })
  } else {
    return onError(UNEXPECTED_ERROR)
  }
}

export { sendSms }
