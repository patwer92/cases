import { createContext } from 'react' // Importerer createContext fra React for å opprette en kontekst
import { User } from 'firebase/auth' // Importerer User-typen fra Firebase for å representere brukerinformasjon
import { DocumentData } from 'firebase/firestore' // Importerer DocumentData-typen fra Firebase for Firestore-data

// Grensesnitt som beskriver strukturen til AuthContext-verdiene
interface AuthContextValue {
  signInWithGoogle: () => Promise<void> // Funksjon for innlogging med Google
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void> // Funksjon for innlogging med e-post og passord
  registerWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void> // Funksjon for registrering med navn, e-post og passord
  sendPasswordToUser: (email: string) => Promise<void> // Funksjon for å sende tilbakestillings-e-post for passord
  signOutUser: () => Promise<void> // Funksjon for å logge ut brukeren
  user: User | null // Brukerobjekt, kan være null hvis ingen bruker er logget inn
  userData: DocumentData | null // Data om brukeren fra Firestore, kan være null hvis ingen data er tilgjengelig
}

// Oppretter og eksporterer AuthContext med den angitte typen
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined // Initialiseres med undefined for å indikere at den må settes i en provider
)
