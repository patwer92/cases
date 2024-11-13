import { Timestamp } from 'firebase/firestore'
import { Like, CommentType } from '../../types/types'

// Definerer typen for et innlegg
interface Post {
  uid: string
  documentId: string
  userImg?: string
  name: string
  email: string
  text: string
  image?: string
  timestamp: Timestamp | string // Aksepterer både Timestamp- og string-typer
}

// Handlingstyper for oppdatering av posts, likes, og kommentarer
export const postActions = {
  SUBMIT_POST: 'SUBMIT_POST',
  HANDLE_ERROR: 'HANDLE_ERROR',
  ADD_LIKE: 'ADD_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
} as const

// Initialtilstand for postReducer
export const postStates = {
  error: false,
  posts: [] as Post[], // Liste over innlegg
  likes: [] as Like[], // Liste over likes
  comments: [] as CommentType[], // Liste over kommentarer
}

// Definerer typer for handlinger som postReducer kan håndtere
type ActionType =
  | { type: typeof postActions.SUBMIT_POST; posts: Post[] }
  | { type: typeof postActions.ADD_LIKE; likes: Like[] }
  | { type: typeof postActions.ADD_COMMENT; comments: CommentType[] }
  | { type: typeof postActions.HANDLE_ERROR }

// Reducer-funksjon som oppdaterer state basert på handling
export const postReducer = (
  state: typeof postStates,
  action: ActionType
): typeof postStates => {
  switch (action.type) {
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts || [], // Oppdaterer liste over innlegg
      }

    case postActions.ADD_LIKE:
      return {
        ...state,
        error: false,
        likes: action.likes || [], // Oppdaterer liste over likes
      }

    case postActions.ADD_COMMENT:
      return {
        ...state,
        error: false,
        comments: action.comments || [], // Oppdaterer liste over kommentarer
      }

    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true, // Setter feilmelding til true
        posts: [], // Tømmer innlegg ved feil
      }

    default:
      return state
  }
}
