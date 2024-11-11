import React, { useContext } from 'react'
import { Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'

const CommentSection: React.FC = (): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { user, userData } = authContext

  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-b-3xl'>
      <div className='flex items-center'>
        <div className='mx-2'>
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
            onSubmit=''
          >
            <input
              name='comment'
              type='text'
              className='w-full rounded-2xl outline-none border-0 p-2 bg-gray-100'
              placeholder='Skriv en kommentar...'
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
      {/* ...comments */}
    </div>
  )
}

export default CommentSection
