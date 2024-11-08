import React from 'react'

type CardProps = {
  id: string
  name: string
  img: string
  status: string
}

const Card: React.FC<CardProps> = ({
  name,
  img,
  status,
}): React.ReactElement => {
  return (
    <div>
      <div className='relative'>
        <img
          className='h-80 w-full rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg'
          src={img}
          alt={name}
        />
        <p className='absolute bottom-4 left-4 text-sm font-medium text-white font-roboto no-underline leading-none'>
          {name}
        </p>
        <p
          className={`${
            status === 'Avlogget'
              ? 'absolute bottom-4 right-4 text-sm font-medium text-red-600 font-roboto no-underline leading-none'
              : 'absolute bottom-4 right-4 text-sm font-medium text-green-400 font-roboto no-underline leading-none'
          }`}
        >
          {status}
        </p>
      </div>
    </div>
  )
}

export default Card
