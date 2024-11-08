import React, { useState } from 'react'
import waterslide from '../../assets/images/waterslide.jpg'

const RightSidebar: React.FC = (): React.ReactElement => {
  const [input, setInput] = useState('')

  return (
    <div className='flex flex-col h-screen bg-white shadow-lg border-2 rounded-1-xl mt-2 mx-2 '>
      <div className='flex flex-col items-center relative'>
        <img
          className=' h-84 rounded-md'
          src={waterslide}
          alt='Person som står under en stor foss som fosser nedover en robust brun klippe, omgitt av tåke og damp.'
        />
      </div>
      <p className='font-roboto font-normal text-sm text-gray-700 max-w-fit no-underline tracking-normal leading-tight py-4 mx-4'>
        Med fotografering kan Moder Jords skjønnhet fanges og bevares. Denne
        kategorien feirer magien i planeten vår og mer til - fra storslåtte
        naturopplevelser til små, magiske øyeblikk i din egen hage.
      </p>
      <div className='mx-2 mt-10'>
        <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none ml-2'>
          Venner
        </p>
        <input
          className='border-0 outline-none m-2'
          name='input'
          value={input}
          type='text'
          placeholder='Søk venner'
          onChange={(e) => setInput(e.target.name)}
        />
      </div>
    </div>
  )
}

export default RightSidebar
