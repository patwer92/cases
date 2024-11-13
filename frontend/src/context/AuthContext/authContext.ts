import { createContext } from 'react'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'

// Definerer grensesnittet som beskriver AuthContext-verdiene
export interface AuthContextValue {
  signInWithGoogle: () => Promise<void> // Autentisering med Google
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void> // Innlogging med e-post og passord
  registerWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void> // Registrering med e-post og passord
  sendPasswordToUser: (email: string) => Promise<void> // Sender tilbakestillings-e-post
  signOutUser: () => Promise<void> // Logg ut bruker
  user: User | null // Firebase User-objektet for den autentiserte brukeren
  userData: DocumentData | null // Ekstra brukerinformasjon fra Firestore
  posts: DocumentData[] // Liste over innlegg
}

// Oppretter `AuthContext` med `AuthContextValue`-typen og initialverdi `undefined`
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
)
