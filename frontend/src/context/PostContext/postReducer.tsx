import { Timestamp } from 'firebase/firestore' // Importer hvis ikke gjort tidligere
import { Like, CommentType } from '../../types/types' // Importer Like og CommentType

// Definer typen for Post
interface Post {
  uid: string
  documentId: string
  userImg?: string
  name: string
  email: string
  text: string
  image?: string
  timestamp: Timestamp | string // Tillater begge typer
}

// Definer postActions
export const postActions = {
  SUBMIT_POST: 'SUBMIT_POST',
  HANDLE_ERROR: 'HANDLE_ERROR',
  ADD_LIKE: 'ADD_LIKE',
  ADD_COMMENT: 'ADD_COMMENT',
} as const // Bruk 'as const' for å sikre readonly literals

// Initial state med riktig type
export const postStates = {
  error: false,
  posts: [] as Post[],
  likes: [] as Like[], // Liste over Like-objekter
  comments: [] as CommentType[], // Kommentarer som liste av CommentType
}

// Definerte typer for handlinger
type ActionType =
  | { type: typeof postActions.SUBMIT_POST; posts: Post[] }
  | { type: typeof postActions.ADD_LIKE; likes: Like[] }
  | { type: typeof postActions.ADD_COMMENT; comments: CommentType[] } // Bruker CommentType
  | { type: typeof postActions.HANDLE_ERROR }

// Reducer-funksjon med spesifikke typer
export const postReducer = (
  state: typeof postStates,
  action: ActionType
): typeof postStates => {
  switch (action.type) {
    // Handling for innsendelse av post
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts || [], // Oppdaterer posts i state
      }

    // Handling for å legge til en like
    case postActions.ADD_LIKE:
      return {
        ...state,
        error: false,
        likes: action.likes || [], // Oppdaterer likes i state
      }

    // Handling for å legge til en kommentar
    case postActions.ADD_COMMENT:
      return {
        ...state,
        error: false,
        comments: action.comments || [], // Oppdaterer kommentarer i state
      }

    // Handling for feil
    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true, // Setter error til true
        posts: [], // Tømmer posts ved feil
      }

    // Default-tilfelle som returnerer gjeldende state
    default:
      return state
  }
}
