import React, { useContext, useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import { db } from '../../firebase/firebase'
import CommentSection from './CommentSection'

// Importerer Firebase-funksjoner
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

// Importerer ressurser
import commentIcon from '../../assets/images/comment.png'
import likeIcon from '../../assets/images/like.png'
import deleteIcon from '../../assets/images/delete.png'
import addFriendIcon from '../../assets/images/add-friend.png'
import avatar from '../../assets/images/avatar.png'

// Importerer typedefinisjoner
import { Post } from '../../types/postTypes'

// Definerer props for komponenten
interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const [open, setOpen] = useState(false)

  // Destrukturerer `post` for enkel tilgang til variablene
  const {
    uid,
    id,
    userImg,
    name,
    email,
    text,
    image,
    timestamp,
    likes,
    comments = [],
  } = post

  // Formaterer tidsstempel til norsk datoformat
  let formattedTimestamp = 'Laster...'
  if (timestamp) {
    const date =
      timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)
    if (!isNaN(date.getTime())) {
      formattedTimestamp = new Intl.DateTimeFormat('no-NO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    }
  }

  // Håndterer visning av kommentar-seksjonen
  const handleOpen = () => setOpen(!open)

  // Legger til en bruker som venn
  const addUser = async () => {
    if (!user) return
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docSnapshot = await getDocs(q)
    const userRef = docSnapshot.docs[0].ref
    await updateDoc(userRef, {
      friends: arrayUnion({
        id: uid,
        image: userImg,
        name: name,
      }),
    })
  }

  // Håndterer liker-funksjonen, enten ved å like eller fjerne like
  const handleLike = async () => {
    if (!user || !id) return
    const likeDoc = doc(db, 'posts', id, 'likes', user.uid)
    const liked = likes.some((like) => like.uid === user.uid)
    if (liked) {
      await deleteDoc(likeDoc)
    } else {
      await setDoc(likeDoc, { uid: user.uid })
    }
  }

  // Sletter et innlegg etter å ha bekreftet med brukeren
  const deletePost = async () => {
    if (user?.uid !== post.uid || !id) {
      alert('Du har ikke tilgang til å slette dette innlegget')
      return
    }

    const confirmDelete = window.confirm(
      'Er du sikker på at du vil slette dette innlegget?'
    )
    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, 'posts', id))
      alert('Innlegget ble slettet.')
    } catch (error) {
      console.error('Feil ved sletting av innlegget:', error)
      alert('En feil oppstod under sletting. Vennligst prøv igjen.')
    }
  }

  return (
    <div className='mb-5'>
      <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
        {/* Bruker- og innleggsdetaljer */}
        <div className='flex items-center pb-6 ml-5'>
          <Avatar
            size='md'
            variant='circular'
            src={userImg || avatar}
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
          <div className='flex flex-col mt-2'>
            <p className='ml-4 font-roboto font-medium text-sm text-black/90'>
              {name}
            </p>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700'>
              @{email}
            </p>
            <p className='ml-4 font-roboto font-medium text-sm text-gray-700'>
              Publisert: {formattedTimestamp}
            </p>
          </div>
          {/* Legger til bruker som venn om nødvendig */}
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

        {/* Tekst- og bildeinnhold i innlegget */}
        <div>
          <p className='ml-6 pb-4 font-roboto font-medium text-sm text-black/90'>
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

        {/* Liker, kommentar og slett knapper */}
        <div className='flex justify-around items-center pt-4'>
          <button
            onClick={handleLike}
            className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-purple-100/25'
          >
            <img
              className='h-8 mr-4'
              src={likeIcon}
              alt='like-icon'
            />
            <span className='font-roboto font-medium text-md text-gray-700'>
              {likes.length > 0 &&
                `${likes.length} liker${
                  user && likes.some((like) => like.uid === user.uid)
                    ? ' (du liker dette)'
                    : ''
                }`}
            </span>
          </button>

          <div
            className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-purple-100/25'
            onClick={handleOpen}
          >
            <img
              src={commentIcon}
              alt='comment-icon'
              className=' h-8 mr-4'
            />
            <p className='font-roboto font-medium text-md text-gray-700'>
              Kommentarer
            </p>
          </div>

          <div
            className='flex items-center cursor-pointer rounded-lg hover:bg-purple-100/25 p-2'
            onClick={deletePost}
          >
            <img
              src={deleteIcon}
              alt='delete-icon'
              className='h-8 mr-4'
            />
            <p className='font-roboto font-medium text-md text-gray-700'>
              Slett
            </p>
          </div>
        </div>
      </div>

      {/* Kommentar-seksjon som vises ved behov */}
      {open && (
        <CommentSection
          postId={id}
          comments={comments}
        />
      )}
    </div>
  )
}

export default PostCard
