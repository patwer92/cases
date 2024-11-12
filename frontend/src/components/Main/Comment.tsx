import React from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.png'

// Props for Comment-komponenten
interface CommentProps {
  name: string
  comment: string
  image?: string
}

const Comment: React.FC<CommentProps> = ({
  name,
  comment,
  image,
}): React.ReactElement => {
  return (
    <div className='flex items-center mt-2 w-full'>
      <div className='ml-5 mr-2 my-3'>
        <Avatar
          size='sm'
          alt='avatar'
          variant='circular'
          src={image || avatar}
          {...({} as React.ComponentProps<typeof Avatar>)}
        />
      </div>
      <div className='flex flex-col items-start bg-blue-100/25 rounded-2xl py-1 px-2 w-full mr-5'>
        <p className='font-roboto text-black/90 text-sm no-underline tracking-normal leading-none px-2 pt-3 font-bold'>
          {name}
        </p>
        <p className='font-roboto text-gray-900 text-sm no-underline tracking-normal leading-none px-2 pb-3 pt-3 font-medium'>
          {comment}
        </p>
      </div>
    </div>
  )
}

export default Comment
