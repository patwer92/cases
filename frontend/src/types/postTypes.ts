import { Timestamp } from 'firebase/firestore'

// Post: Representerer en innlegg med likes og kommentarer
export interface Post {
  uid: string
  documentId: string
  id: string
  userImg: string
  name: string
  email: string
  text: string
  image?: string // Valgfritt bilde
  timestamp: string | Timestamp
  likes: { uid: string }[]
  comments: CommentType[]
}

// CommentType: Representerer en kommentar i et innlegg
export interface CommentType {
  id: string
  comment: string
  image?: string // Valgfritt bilde
  name: string
  timestamp: Timestamp | string
}

// Type for filopplasting og bilde-URL
export type FileType = File | null
export type ImageType = string | null
