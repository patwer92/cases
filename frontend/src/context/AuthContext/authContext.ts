import { createContext } from 'react'

// Opprett og eksporter AuthContext separat
export const AuthContext = createContext<object | null>(null)
