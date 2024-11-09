import React, { ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './AuthContext/authContext'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, db, onAuthStateChanged } from '../firebase/firebase'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'

interface AppContextProps {
  children: ReactNode
}

// Provider-komponent
const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const collectionUserRef = collection(db, 'users')
  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState<object | null>(null)
  const [userData, setUserData] = useState<object | null>(null)

  const signInWithGoogle = async () => {
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
      alert(error)
      console.log('Error:', error)
    }
  }

  loginWithUserAndEmail = async (name, email, password) => {
    try {
      const response = await createUse
    } catch (error) {
      alert(error)
      console.log('Error:', error)
    }
  }

  const initialState = {
    signInWithGoogle: signInWithGoogle,
  }

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  )
}

export default AppContextProvider
