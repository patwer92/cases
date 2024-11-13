import { Timestamp } from 'firebase/firestore'

// CommentType: Representerer en kommentar med bilde, navn og timestamp
export interface CommentType {
  image: string
  name: string
  comment: string
  timestamp: Timestamp | string
}

// Like: Representerer en like med bruker-ID
export interface Like {
  uid: string
}

// ImageData: Typedefinisjon for reklamebilder med ID og bilde-URL
export interface ImageData {
  id: string
  image: string
}
