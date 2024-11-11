import { Timestamp } from 'firebase/firestore'

export interface Like {
  uid: string
}

export interface CommentType {
  image: string
  name: string
  comment: string
  timestamp: Timestamp | string
}
