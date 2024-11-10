// // Typer for action
// interface PostAction {
//   type: typeof postActions.SUBMIT_POST | typeof postActions.HANDLE_ERROR
//   posts?: Array<{ [key: string]: string }> // Spesifiser en detaljert type hvis mulig
// }

// // Typer for state
// interface PostState {
//   error: boolean
//   posts: Array<{ [key: string]: string }> // Spesifiser en detaljert type hvis mulig
// }

// export const postActions = {
//   SUBMIT_POST: 'SUBMIT_POST' as const,
//   HANDLE_ERROR: 'HANDLE_ERROR' as const,
// }

// export const postStates: PostState = {
//   error: false,
//   posts: [],
// }

// // Reducer-funksjon med spesifikke typer
// export const postReducer = (
//   state: PostState,
//   action: PostAction
// ): PostState => {
//   switch (action.type) {
//     case postActions.SUBMIT_POST:
//       return {
//         ...state,
//         error: false,
//         posts: [...state.posts, ...(action.posts || [])], // Legg til nye poster
//       }
//     case postActions.HANDLE_ERROR:
//       return {
//         ...state,
//         error: true,
//         posts: [],
//       }
//     default:
//       return state
//   }
// }

import { Timestamp } from 'firebase/firestore' // Importer hvis ikke gjort tidligere

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

export const postActions = {
  SUBMIT_POST: 'SUBMIT_POST',
  HANDLE_ERROR: 'HANDLE_ERROR',
  ADD_LIKE: 'ADD_LIKE',
}

// Initial state med riktig type
export const postStates = {
  error: false,
  posts: [] as Post[], // Typeannoterer posts som en liste av Post-objekter
  likes: [] as string[], // Typeannoterer likes som en liste av strenger
}

// Reducer-funksjon med spesifikke typer
export const postReducer = (
  state: typeof postStates,
  action: { type: string; posts?: Post[] }
) => {
  switch (action.type) {
    case 'SUBMIT_POST':
      return {
        ...state,
        error: false,
        posts: action.posts || [],
      }
    case 'ADD_LIKE':
      return {
        ...state,
        error: false,
        likes: action.likes || [],
      }
    case 'HANDLE_ERROR':
      return {
        ...state,
        error: true,
        posts: [],
      }
    default:
      return state
  }
}
