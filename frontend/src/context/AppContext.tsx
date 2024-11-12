import React, { ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './AuthContext/authContext'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth'
import { auth, db, onAuthStateChanged } from '../firebase/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

// Typedefinisjoner for funksjonsparametere og returtyper
interface AppContextProps {
  children: ReactNode
}
interface AuthContextValue {
  signInWithGoogle: () => Promise<void>
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>
  registerWithEmailAndPassword: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>
  sendPasswordToUser: (email: string) => Promise<void>
  signOutUser: () => Promise<void>
  user: User | null
  userData: DocumentData | null
}

// Provider-komponent som brukes til å håndtere autentisering og datatilgang
const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const collectionUserRef = collection(db, 'users')
  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<DocumentData | null>(null)

  const navigate = useNavigate()

  // Logg inn med Google og opprett bruker i Firestore om den ikke finnes fra før
  const signInWithGoogle = async (): Promise<void> => {
    try {
      const popup = await signInWithPopup(auth, provider)
      const user = popup.user
      const q = query(collectionUserRef, where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        await addDoc(collectionUserRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: popup?.providerId,
        })
      }
    } catch (error) {
      alert('Feil ved Google-innlogging')
      console.log('Error:', error)
    }
  }

  // Logg inn med e-post og passord
  const loginWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert('Feil ved innlogging med e-post og passord')
      console.log('Error:', error)
    }
  }

  // Registrer ny bruker med e-post og passord og lagre brukerdata i Firestore
  const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = response.user
      await addDoc(collectionUserRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        providerId: 'email/password',
      })
    } catch (error) {
      console.log('Feil ved registrering av ny bruker:', error)
    }
  }

  // Send e-post for å tilbakestille passord
  const sendPasswordToUser = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Nytt passord er sendt til din e-postadresse')
    } catch (error) {
      console.log('Feil ved sending av tilbakestillings-e-post:', error)
    }
  }

  // Logg ut brukeren
  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth)
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.log('Feil ved utlogging:', error)
    }
  }

  // Håndterer endringer i brukerens autentiseringsstatus

  // useEffect for å lytte på endringer i brukerstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const q = query(
          collection(db, 'users'),
          where('uid', '==', currentUser.uid)
        )
        onSnapshot(q, (doc) => {
          setUserData(doc.docs[0]?.data() || null)
        })
        setUser(currentUser)
      } else {
        setUser(null)
        setUserData(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const initialState: AuthContextValue = {
    signInWithGoogle,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordToUser,
    signOutUser,
    user,
    userData,
  }

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  )
}

export default AppContextProvider
