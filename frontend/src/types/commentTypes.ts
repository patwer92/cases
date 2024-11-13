import { Timestamp } from 'firebase/firestore'

// Definerer strukturen for en kommentar
export interface CommentType {
  id: string
  comment: string
  image?: string // Valgfritt bilde knyttet til kommentaren
  name: string
  timestamp: Timestamp | string // Tidspunkt for kommentaren
}

// Props for CommentSection-komponenten
export interface CommentSectionProps {
  postId: string
  comments: CommentType[] // Liste av kommentarer for et innlegg
}

// Props for Comment-komponenten
export interface CommentProps {
  name: string
  comment: string
  image?: string // Valgfritt bilde knyttet til kommentaren
}
