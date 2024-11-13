import React from 'react'
import { CardProps } from '../../types/cardProps'

// Funksjonell komponent som viser et bilde, navn og status
const Card: React.FC<CardProps> = ({
  name,
  img,
  status,
}): React.ReactElement => {
  // Setter tekstfarge basert på status
  const statusTextColor =
    status === 'Avlogget' ? 'text-red-600' : 'text-green-400'

  return (
    <div className='relative'>
      {/* Bilde */}
      <img
        className='h-80 w-full rounded-2xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg'
        src={img}
        alt={name}
      />

      {/* Navn på kortet */}
      <p className='absolute bottom-6 left-4 text-sm font-medium text-white font-roboto no-underline leading-none'>
        {name}
      </p>

      {/* Statusindikator */}
      <p
        className={`absolute bottom-6 right-4 text-sm font-medium ${statusTextColor} font-roboto no-underline leading-none`}
      >
        {status}
      </p>
    </div>
  )
}

export default Card
