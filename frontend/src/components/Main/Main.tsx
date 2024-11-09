import React, { useRef, useContext, useState } from 'react'
import { Avatar, Button } from '@material-tailwind/react'
import live from '../../assets/images/live.png'
import smile from '../../assets/images/smile.png'
import addImage from '../../assets/images/add-image.png'
import { AuthContext } from '../../context/AuthContext/authContext'

const Main: React.FC = (): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { user, userData } = authContext
  const text = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState(null)

  const handleSubmitPost = async(e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    try {
      if(text.current.value !== '') {

    } catch (error) { 

    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg'>
        <div className='flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full'>
          <Avatar
            size='sm'
            variant='circular'
            src='https://docs.material-tailwind.com/img/face-2.jpg'
            alt='avatar'
            {...({} as React.ComponentProps<typeof Avatar>)}
          ></Avatar>
          <form className='w-full'>
            <div className='flex justify-between items-center'>
              <div className='w-full ml-4'>
                <input
                  className='outline-none w-full bg-white rounded-md'
                  name='text'
                  type='text'
                  placeholder={`Hva tenker du på, ${
                    user?.displayName?.split(' ')[0] ||
                    userData?.name?.charAt(0).toUpperCase() +
                      userData?.name?.slice(1)
                  }?`}
                  ref={text}
                />
              </div>
              <div className='mx-4 '>{/* put preview image here */}</div>
              <div className='mr-4'>
                <Button
                  variant='text'
                  type='submit'
                  size='sm'
                  className='w-full'
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  Del
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span>{/* progressBar */}</span>
        <div className='flex justify-around items-center pt-4'>
          <div className='flex item-center'>
            <label
              htmlFor='addImage'
              className='cursor-pointer flex items-center'
            >
              <img
                src={addImage}
                alt='Legg til bilde'
              />
              <input
                id='addImage'
                type='file'
                style={{ display: 'none' }}
                className='cursor-pointer'
              />
            </label>
            {/* <Button variant='text'>Upload</Button> */}
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={live}
              alt='live'
            />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
              Gå Live
            </p>
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={smile}
              alt='feeling'
            />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>
              Følelse
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col py-4 w-full'>Poster</div>
      <div>Referanse for senere</div>
    </div>
  )
}

export default Main
