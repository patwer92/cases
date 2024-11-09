import React, { ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './AuthContext/authContext'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { auth, db, onAuthStateChanged } from '../firebase/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

interface AppContextProps {
  children: ReactNode
}

// Provider-komponent
const AppContextProvider: React.FC<AppContextProps> = ({ children }) => {
  const collectionUserRef = collection(db, 'users')
  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState<object | null>(null)
  const [userData, setUserData] = useState<object | null>(null)

  const navigate = useNavigate

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

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      alert(error)
      console.log('Error:', error)
    }
  }

  const registerWithEmailAndPassword = async (name, email, password) => {
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
      console.log('Error:', error)
    }
  }

  const sendPasswordToUser = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email).then((res) => {
        console.log('Email sent:', res)
      })
      alert('Nytt passord er sendt til din e-postadresse')
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const signOutUser = async () => {
    await signOut(auth)
  }

  const userStateChanged = async () => {
    onAuthStateChanged(auth, async () => {
      if (user) {
        const q = query(collectionUserRef, where('uid', '==', user?.uid))
        onSnapshot(q, (doc) => {
          setUserData(doc?.docs[0]?.data())
        })
        setUser(user)
      } else {
        setUser(null)
        navigate('/login')
      }
    })
  }

  useEffect(() => {
    userStateChanged()
    if (user || userData) {
      navigate('/')
    } else {
      navigate('/login')
    }
    return () => userStateChanged()
  }, [])

  const initialState = {
    signInWithGoogle: signInWithGoogle,
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    registerWithEmailAndPassword: registerWithEmailAndPassword,
    sendPasswordToUser: sendPasswordToUser,
    signOutUser: signOutUser,
    user: user,
    userData: userData,
  }

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  )
}

export default AppContextProvider
