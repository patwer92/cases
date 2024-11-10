import React, { useContext } from 'react'
import { Avatar } from '@material-tailwind/react'
import commentIcon from '../../assets/images/comment.png'
import likeIcon from '../../assets/images/like.png'
import deleteIcon from '../../assets/images/delete.png'
import { Timestamp } from 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext/authContext'

// Definer typene for props
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
  // Sjekk og formater timestamp hvis det er et Timestamp-objekt
  const date =
    timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp)

  // Formater dato til norsk format
  const formattedTimestamp = new Intl.DateTimeFormat('no-NO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  const { user } = useContext(AuthContext)

  const addUser = async () => {
    try {
    } catch (error) {
      console.log('Error adding user:', error)
    }
  }

  return (
    <div className='mb-4'>
      <div className='flex flex-col py-4 bg-white rounded-t-3xl'>
        <div className='flex items-center pb-4 ml-2'>
          <Avatar
            size='sm'
            variant='circular'
            src={userImg || 'https://docs.material-tailwind.com/img/face-2.jpg'}
            alt='profile image'
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
          <div className='flex flex-col'>
            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              {email}
            </p>
            <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              Publisert: {formattedTimestamp}{' '}
              {/* Viser datoen i norsk format */}
            </p>
          </div>
        </div>
        <div>
          <p className='ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
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
        <div className='flex justify-around items-center pt-4'>
          <button className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
            <img
              className='h-8 mr-4'
              src={likeIcon}
              alt='like-icon'
            />
            {/* <p>display likes</p> */}
          </button>
          <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
            <div className='flex items-center cursor-pointer'>
              <img
                src={commentIcon}
                alt='comment-icon'
                className='h-8 mr-4'
              />
              <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
                Kommenter
              </p>
            </div>
          </div>
          <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100'>
            <img
              src={deleteIcon}
              alt='delete-icon'
              className='h-8 mr-4'
            />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
              Slett
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
