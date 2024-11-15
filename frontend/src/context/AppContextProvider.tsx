import React, { ReactNode, useState, useEffect } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User,
} from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
  getDocs,
  DocumentData,
  Timestamp,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext/authContext'

// Struktur for post-objekter
export interface Post {
  uid: string
  documentId: string
  userImg?: string
  name: string
  email: string
  text: string
  image?: string
  timestamp: string | Timestamp
  likes: Array<{ uid: string }>
  comments?: Array<{
    id: string
    comment: string
    image?: string
    name: string
    timestamp: Timestamp | string
  }>
}

// Grensesnitt for konteksten som AppContextProvider tilbyr
interface AppContextValue {
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
  posts: Post[]
}

const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<DocumentData | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const navigate = useNavigate()

  // Laster innlegg med tilhørende likes og kommentarer når bruker er autentisert
  useEffect(() => {
    if (!user) return // Lytter bare når bruker er autentisert

    const postsCollectionRef = collection(db, 'posts')
    const unsubscribePosts = onSnapshot(postsCollectionRef, (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => {
        const postData = doc.data() as Post

        // Abonnerer på likes for hvert innlegg
        onSnapshot(
          collection(db, 'posts', doc.id, 'likes'),
          (likesSnapshot) => {
            const likes = likesSnapshot.docs.map((likeDoc) => ({
              uid: likeDoc.data().uid,
            }))
            // Oppdaterer `posts`-state med de nyeste likes for riktig post
            setPosts((prevPosts) =>
              prevPosts.map((prevPost) =>
                prevPost.documentId === doc.id
                  ? { ...prevPost, likes }
                  : prevPost
              )
            )
          }
        )

        // Henter kommentarer for hvert innlegg i sanntid og sorterer dem etter nyeste timestamp.
        // Oppdaterer state for `posts` med de nyeste kommentarene.
        onSnapshot(
          collection(db, 'posts', doc.id, 'comments'),
          (commentsSnapshot) => {
            // Mapper og sorterer kommentarer basert på timestamp, nyeste først
            const sortedComments = commentsSnapshot.docs
              .map((commentDoc) => ({
                id: commentDoc.id,
                comment: commentDoc.data().comment,
                name: commentDoc.data().name,
                image: commentDoc.data().image || '',
                timestamp: commentDoc.data().timestamp,
              }))
              .sort((a, b) => {
                const dateA =
                  a.timestamp instanceof Timestamp
                    ? a.timestamp.toDate()
                    : new Date(a.timestamp)
                const dateB =
                  b.timestamp instanceof Timestamp
                    ? b.timestamp.toDate()
                    : new Date(b.timestamp)
                return dateB.getTime() - dateA.getTime() // Sorter fra nyeste til eldste
              })

            // Oppdaterer `posts`-state med de nyeste, sorterte kommentarene for riktig post
            setPosts((prevPosts) =>
              prevPosts.map((prevPost) =>
                prevPost.documentId === doc.id
                  ? { ...prevPost, comments: sortedComments }
                  : prevPost
              )
            )
          }
        )

        return { ...postData, documentId: doc.id, likes: [], comments: [] }
      })
      setPosts(updatedPosts)
    })

    // Rydder opp i lytteren ved av-mount eller endring av bruker
    return () => unsubscribePosts()
  }, [user])

  // Håndterer autentisering og brukerdata
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser)
      console.log('User:', currentUser) // Logger brukerdata når bruker autentiseres
      if (currentUser) {
        const userQuery = query(
          collection(db, 'users'),
          where('uid', '==', currentUser.uid)
        )
        const unsubscribeUserData = onSnapshot(userQuery, (snapshot) => {
          setUserData(snapshot.docs[0]?.data() || null)
        })

        navigate('/', { replace: true }) // Naviger til hovedsiden etter innlogging
        return () => unsubscribeUserData()
      } else {
        // Naviger til login-siden hvis brukeren er logget ut
        if (window.location.pathname !== '/register') {
          navigate('/login', { replace: true })
        }
      }
    })

    return () => unsubscribeAuth()
  }, [navigate])

  // Funksjoner for autentisering
  const initialState: AppContextValue = {
    signInWithGoogle: async () => {
      try {
        const popup = await signInWithPopup(auth, new GoogleAuthProvider())
        const user = popup.user
        const q = query(collection(db, 'users'), where('uid', '==', user.uid))
        const docs = await getDocs(q)

        // Registrer ny bruker hvis ikke allerede registrert
        if (docs.docs.length === 0) {
          await addDoc(collection(db, 'users'), {
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
    },
    loginWithEmailAndPassword: async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        alert('Feil ved innlogging med e-post og passord')
        console.log('Error:', error)
      }
    },
    registerWithEmailAndPassword: async (name, email, password) => {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = response.user
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: name,
          email: user.email,
          providerId: 'email/password',
        })
      } catch (error) {
        console.log('Feil ved registrering av ny bruker:', error)
      }
    },
    sendPasswordToUser: async (email) => {
      try {
        await sendPasswordResetEmail(auth, email)
        alert('Nytt passord er sendt til din e-postadresse')
      } catch (error) {
        console.log('Feil ved sending av tilbakestillings-e-post:', error)
      }
    },
    signOutUser: async () => {
      try {
        await signOut(auth)
        setUser(null)
        setUserData(null)
        navigate('/login')
      } catch (error) {
        console.log('Feil ved utlogging:', error)
      }
    },
    user,
    userData,
    posts,
  }

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  )
}

export default AppContextProvider
