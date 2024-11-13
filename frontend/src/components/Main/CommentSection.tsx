import React, { useContext, useRef } from 'react'
import { Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import Comment from './Comment'
import avatar from '../../assets/images/avatar.png'

// Lokale props-definisjoner for komponenten
interface CommentSectionProps {
  postId: string
  comments: Array<{
    id: string
    comment: string
    image?: string
    name: string
    timestamp: Timestamp | string
  }>
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
}) => {
  // Henter brukerdata fra AuthContext
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext må brukes innenfor AppContextProvider')
  }

  const { user, userData } = authContext
  const commentInput = useRef<HTMLInputElement>(null)

  // Sjekker at `postId` er definert, ellers returneres en feilmelding
  if (!postId) {
    return <p>Kunne ikke laste kommentarer: Mangler post-ID.</p>
  }

  // Oppretter referanse til kommentarer i Firestore
  const commentRef = doc(collection(db, 'posts', postId, 'comments'))

  // Funksjon for å legge til en ny kommentar
  const addComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (commentInput.current?.value) {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: commentInput.current.value,
          image: user?.photoURL,
          name: user?.displayName || userData?.name,
          timestamp: serverTimestamp(),
        })
        commentInput.current.value = '' // Tilbakestiller input etter vellykket innsending
      } catch (error) {
        alert('En feil oppstod. Vennligst prøv igjen. Feilmelding: ' + error)
      }
    }
  }

  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-b-3xl pb-5'>
      {/* Input-seksjon for nye kommentarer */}
      <div className='flex items-center mb-2'>
        <Avatar
          variant='circular'
          size='sm'
          src={user?.photoURL || avatar}
          alt='Bruker-avatar'
          className='mr-2 ml-5 my-3'
          {...({} as React.ComponentProps<typeof Avatar>)}
        />
        <div className='w-full pr-2'>
          <form
            className='flex items-center w-full'
            onSubmit={addComment}
          >
            <input
              name='comment'
              type='text'
              placeholder='Skriv en kommentar...'
              className='w-full text-sm rounded-2xl outline-none border-0 px-4 py-3 bg-gray-100 mr-3'
              ref={commentInput}
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
      {/* Mapper og viser kommentarer */}
      {comments?.map((comment, index) => (
        <Comment
          key={comment.id || index}
          image={comment.image}
          name={comment.name}
          comment={comment.comment}
        />
      ))}
    </div>
  )
}

export default CommentSection
