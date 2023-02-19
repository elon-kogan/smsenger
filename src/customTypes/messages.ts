interface Message {
  phone: string
  text: string
  createdAt: Date
}

interface MessageApi {
  phone: string
  text: string
  created_at: string
  updated_at: string
}

export type { Message, MessageApi }
