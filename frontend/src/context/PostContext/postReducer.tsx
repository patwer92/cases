import { Timestamp } from 'firebase/firestore' // Importer hvis ikke gjort tidligere
import { Like } from '../../types/types'

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
} as const // Bruk 'as const' for å sikre readonly literals

// Initial state med riktig type
export const postStates = {
  error: false,
  posts: [] as Post[],
  likes: [] as Like[],
}

// Definerte typer for handlinger
type ActionType =
  | { type: typeof postActions.SUBMIT_POST; posts: Post[] }
  | { type: typeof postActions.ADD_LIKE; likes: Like[] }
  | { type: typeof postActions.HANDLE_ERROR }

// Reducer-funksjon med spesifikke typer
export const postReducer = (
  state: typeof postStates,
  action: ActionType
): typeof postStates => {
  switch (action.type) {
    case postActions.SUBMIT_POST:
      return {
        ...state,
        error: false,
        posts: action.posts || [],
      }
    case postActions.ADD_LIKE:
      return {
        ...state,
        error: false,
        likes: action.likes || [],
      }
    case postActions.HANDLE_ERROR:
      return {
        ...state,
        error: true,
        posts: [],
      }
    default:
      return state
  }
}
