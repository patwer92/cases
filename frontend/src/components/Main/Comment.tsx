import React from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.png'
import { CommentProps } from '../../types/commentTypes' // Importerer type for kommentarer

// Kommentar-komponent som viser en enkel kommentar med navn, bilde og tekst
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
      <div className='flex flex-col items-start bg-purple-100/25 rounded-2xl py-1 px-2 w-full mr-5'>
        <p className='font-roboto text-black/90 text-sm font-bold px-2 pt-3'>
          {name}
        </p>
        <p className='font-roboto text-gray-900 text-sm font-medium px-2 pb-3 pt-3'>
          {comment}
        </p>
      </div>
    </div>
  )
}

export default Comment
