import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import commentIcon from '../../assets/images/comment.png'
import likeIcon from '../../assets/images/like.png'
import deleteIcon from '../../assets/images/delete.png'
import addFriendIcon from '../../assets/images/add-friend.png'
import { db } from '../../firebase/firebase'
import { AuthContext } from '../../context/AuthContext/authContext'
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
  getDocs,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import {
  postReducer,
  postActions,
  postStates,
} from '../../context/PostContext/postReducer'
import CommentSection from './CommentSection'

// Definerte typer for props
interface PostCardProps {
  uid: string
  id: string
  userImg: string
  name: string
  email: string
  text: string
  image?: string // Valgfritt, siden noen innlegg kanskje ikke har et bilde
  timestamp: Timestamp | string
}

const PostCard: React.FC<PostCardProps> = ({
  uid,
  id,
  userImg,
  name,
  email,
  text,
  image,
  timestamp,
}): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { user } = authContext
  const [state, dispatch] = useReducer(postReducer, postStates)
  const likesRef = collection(db, 'posts', id, 'likes')
  const singlePostDocument = doc(db, 'posts', id)
  const [open, setOpen] = useState(false)

  // Valider timestamp og håndter ugyldige verdier
  let formattedTimestamp = 'Ukjent dato'
  if (timestamp) {
    try {
      const date =
        timestamp instanceof Timestamp
          ? timestamp.toDate()
          : new Date(timestamp)

      // Sjekk om `date` er gyldig før formatering
      if (!isNaN(date.getTime())) {
        formattedTimestamp = new Intl.DateTimeFormat('no-NO', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }).format(date)
      } else {
        console.error('Invalid date object:', date)
      }
    } catch (error) {
      console.error('Invalid timestamp value:', timestamp, error)
    }
  }

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  const addUser = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const doc = await getDocs(q)
      const data = doc.docs[0].ref
      await updateDoc(data, {
        friends: arrayUnion({
          id: uid,
          image: userImg,
          name: name,
        }),
      })
    } catch (error) {
      console.log('Error adding user:', error)
    }
  }

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('handleLike kalt')
    try {
      // Søk etter eksisterende like fra den innloggede brukeren
      const q = query(likesRef, where('uid', '==', user?.uid))
      const querySnapshot = await getDocs(q)
      const likesDocId =
        querySnapshot.docs.length > 0 ? querySnapshot.docs[0].id : null

      if (likesDocId) {
        // Hvis brukeren allerede har likt, fjern like
        console.log('Liker funnet, fjerner like:', likesDocId)
        const deleteId = doc(db, 'posts', id, 'likes', likesDocId)
        await deleteDoc(deleteId)
        console.log('Like fjernet')
      } else {
        // Hvis brukeren ikke har likt, legg til en like
        console.log('Ingen eksisterende like funnet, legger til like')
        const newLikeRef = doc(likesRef) // Opprett en ny dokumentreferanse
        await setDoc(newLikeRef, {
          uid: user?.uid,
        })
        console.log('Like lagt til')
      }
    } catch (error) {
      alert('Error handling like: ' + error)
      console.log('Error:', error)
    }
  }

  const deletePost = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument)
      } else {
        alert('Du har ikke tilgang til å slette dette innlegget')
      }
    } catch (error) {
      console.log('Error deleting post:', error)
      alert('Error deleting post')
    }
  }

  useEffect(() => {
    const getLikes = async () => {
      try {
        await onSnapshot(likesRef, (snapshot) => {
          dispatch({
            type: postActions.ADD_LIKE,
            likes: snapshot.docs.map((item) => ({
              uid: item.data().uid,
            })),
          })
        })
      } catch (error) {
        dispatch({ type: postActions.HANDLE_ERROR })
        alert(error)
        console.log('Error getting likes:', error)
      }
    }
    getLikes()
  }, [id])

  return (
    <div className='mb-5'>
      <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
        <div className='flex items-center pb-6 ml-5'>
          <Avatar
            size='md'
            variant='circular'
            src={userImg || 'https://docs.material-tailwind.com/img/face-2.jpg'}
            alt='profile image'
            className='mb-4'
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
          <div className='flex flex-col mt-2'>
            <p className='ml-4 font-roboto font-medium text-sm text-black/90 no-underline tracking-normal leading-none'>
              {name}
            </p>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              @{email}
            </p>
            <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              Publisert: {formattedTimestamp}
            </p>
          </div>
          {user?.uid !== uid && (
            <div
              onClick={addUser}
              className='w-full flex justify-end cursor-pointer mr-10'
            >
              <img
                className='hover:bg-blue-100 rounded-xl p-2'
                src={addFriendIcon}
                alt='add friend icon'
              />
            </div>
          )}
        </div>
        <div>
          <p className='ml-6 pb-4 font-roboto font-medium text-sm text-black/90 no-underline tracking-normal leading-none'>
            {text}
          </p>
          {image && (
            <img
              className='h-[500px] w-full rounded-sm'
              src={image}
              alt='postImage'
            />
          )}
        </div>
        <div className='flex justify-between items-center pt-4'>
          <div className='w-52'>
            <button
              onClick={handleLike}
              className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100 ml-6'
            >
              <img
                className='h-8 mr-4'
                src={likeIcon}
                alt='like-icon'
              />
              {/* Vis antall likes */}
              <p className='flex'>
                {state.likes.length > 0 && (
                  <span>
                    {state.likes.length}{' '}
                    {state.likes.some((like) => like.uid === user?.uid)
                      ? '(Du liker dette)'
                      : ''}
                  </span>
                )}
              </p>
            </button>
          </div>

          <div
            className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100 mr-20'
            onClick={handleOpen}
          >
            <div className='flex items-center '>
              <img
                src={commentIcon}
                alt='comment-icon'
                className=' h-8 mr-4'
              />
              <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none '>
                Kommentarer
              </p>
            </div>
          </div>
          <div
            className='flex items-center cursor-pointer rounded-lg  hover:bg-gray-100 p-2 mr-6'
            onClick={deletePost}
          >
            <img
              src={deleteIcon}
              alt='delete-icon'
              className='h-8 mr-4'
            />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none '>
              Slett
            </p>
          </div>
        </div>
      </div>
      {open && <CommentSection postId={id}></CommentSection>}
    </div>
  )
}

export default PostCard
