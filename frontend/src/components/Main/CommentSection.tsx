import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import {
  postReducer, // Importer postReducer
  postActions, // Importer postActions for å bruke handlinger
  postStates, // Initial state
} from '../../context/PostContext/postReducer'
import { CommentType } from '../../types/types' // Importer CommentType for riktig typing
import Comment from './Comment'

// Props for CommentSection - inkluderer postId som en prop
interface CommentSectionProps {
  postId: string
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
}): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }

  const { user, userData } = authContext
  const comment = useRef<HTMLInputElement>(null) // Referanse til input-feltet til kommentarer
  const commentRef = doc(collection(db, 'posts', postId, 'comments')) // Dokumentreferanse til kommentar-samling
  const [state, dispatch] = useReducer(postReducer, {
    ...postStates,
    comments: [] as CommentType[], // Initialiserer kommentarer som en liste av CommentType
  })

  /* Funksjon for å legge til en ny kommentar */
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.current?.value) {
      // Sjekker om kommentar-feltet har en verdi
      try {
        // Setter inn ny kommentar i Firestore
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current.value,
          image: user?.photoURL,
          name:
            user?.displayName?.split(' ')[0] ||
            userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1),
          timestamp: serverTimestamp(),
        })
        comment.current.value = '' // Tømmer input-feltet etter innlegg
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }

  /* useEffect - Snapshot for å hente kommentarer */
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'posts', postId, 'comments'), // Referanse til kommentarer
        orderBy('timestamp', 'desc') // Sorter etter timestamp i synkende rekkefølge
      ),
      (snapshot) => {
        dispatch({
          type: postActions.ADD_COMMENT, // Bruker handlingen for å legge til kommentarer
          comments: snapshot.docs.map((item) => item.data() as CommentType), // Typekonverterer til CommentType
        })
      }
    )
    return () => unsubscribe() // Avslutter snapshot ved unmount
  }, [postId])

  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-b-3xl pb-5'>
      <div className='flex items-center mb-5'>
        <div className='mr-2 ml-5 '>
          <Avatar
            variant='circular'
            size='sm'
            src={
              user?.photoURL ||
              'https://docs.material-tailwind.com/img/face-2.jpg'
            }
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
        </div>
        <div className='w-full pr-2'>
          <form
            className='flex items-center w-full'
            onSubmit={addComment}
          >
            <input
              name='comment'
              type='text'
              placeholder='Skriv en kommentar...'
              className='w-full rounded-2xl outline-none border-0 px-4 py-2 bg-gray-100/50 mr-3'
              ref={comment}
            />
            <button
              type='submit'
              className='hidden'
            >
              Send inn
            </button>
          </form>
        </div>
      </div>
      {/* Itererer over kommentarer og rendrer Comment-komponenten */}
      {state.comments?.map((comment: CommentType, index: number) => (
        <Comment
          key={index}
          image={comment.image}
          name={comment.name}
          comment={comment.comment}
        />
      ))}
    </div>
  )
}

export default CommentSection
