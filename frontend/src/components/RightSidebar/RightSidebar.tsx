import React, { useContext, useState } from 'react'
import waterslide from '../../assets/images/waterslide.jpg'
import { AuthContext } from '../../context/AuthContext/authContext'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.png'
import remove from '../../assets/images/delete.png'
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase'

// Definer typer for vennedata
interface Friend {
  id: string
  name: string
  image?: string
}

const RightSidebar: React.FC = (): React.ReactElement => {
  const { user, userData } = useContext(AuthContext) || {}
  const friendList: Friend[] = userData?.friends || []
  const [input, setInput] = useState('')

  // Funksjon for å søke etter venner i listen basert på input
  const searchFriends = (friends: Friend[]): Friend[] => {
    return friends.filter((friend) =>
      friend.name.toLowerCase().includes(input.toLowerCase())
    )
  }

  // Funksjon for å fjerne en venn fra listen
  const removeFriend = async (id: string, name: string, image?: string) => {
    if (!user?.uid) return
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const getDoc = await getDocs(q)
    const userDocumentId = getDoc.docs[0].id

    await updateDoc(doc(db, 'users', userDocumentId), {
      friends: arrayRemove({ id, name, image }),
    })
  }

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
        gruppen feirer magien på planeten vår og mer til - fra storslåtte
        naturopplevelser til små, magiske øyeblikk i din egen hage.
      </p>
      <div className='mx-2 mt-10'>
        <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none ml-2'>
          Venner
        </p>
        <input
          className='border-0 outline-none mx-2 mt-4 text-sm'
          name='input'
          value={input}
          type='text'
          placeholder='Søk venner'
          onChange={(e) => setInput(e.target.value)}
        />
        {friendList.length > 0 ? (
          searchFriends(friendList).map((friend: Friend) => (
            <div
              className='flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out'
              key={friend.id}
            >
              <Link to=''>
                <div className='flex items-center my-2 cursor-pointer'>
                  <div className='flex items-center'>
                    <Avatar
                      size='sm'
                      variant='circular'
                      alt='Profile image'
                      src={friend?.image || avatar}
                      {...({} as React.ComponentProps<typeof Avatar>)}
                    />
                    <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                      {friend.name}
                    </p>
                  </div>
                </div>
              </Link>
              <div className='mr-4'>
                <img
                  onClick={() =>
                    removeFriend(friend.id, friend.name, friend.image)
                  }
                  src={remove}
                  alt='Delete friend'
                  className='cursor-pointer '
                />
              </div>
            </div>
          ))
        ) : (
          <p className=' ml-2 mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
            Legg til venner for å se dem på listen
          </p>
        )}
      </div>
    </div>
  )
}

export default RightSidebar
