interface Message {
  phone: string
  text: string
  createdAt: Date
}

interface TwilioMessage {
  body?: string
  error_code?: string
  error_message?: string
  from?: string
  to?: string
  date_created?: string
}

export type { Message, TwilioMessage }
