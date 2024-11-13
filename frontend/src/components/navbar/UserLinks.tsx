import React, { useContext } from 'react'
import { Tooltip, Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import avatar from '../../assets/images/avatar.png'

// UserLinks-komponent for brukerrelaterte lenker og logg ut-funksjonalitet
const UserLinks: React.FC = (): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { signOutUser, user, userData } = authContext

  return (
    <div className='flex justify-center items-center cursor-pointer'>
      {/* Profil-ikon */}
      <div className='hover:translate-y-1 duration-500 ease-in-out hover:text-purple-900'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-7 mx-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
      </div>

      {/* Innstillinger-ikon */}
      <div className='hover:translate-y-1 duration-500 ease-in-out hover:text-purple-900'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-6 mx-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
      </div>

      {/* Varsler-ikon */}
      <div className='hover:translate-y-1 duration-500 ease-in-out hover:text-purple-900'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-6 mx-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
          />
        </svg>
      </div>

      {/* Bruker-avatar med logg ut-funksjon */}
      <div
        className='mx-4 flex items-center'
        onClick={signOutUser}
      >
        <Tooltip
          content='Logg ut'
          placement='bottom'
        >
          <Avatar
            src={user?.photoURL || avatar}
            alt='avatar'
            size='sm'
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
        </Tooltip>
        {/* Viser brukernavn */}
        <p className='ml-2 font-roboto text-sm text-black font-medium no-underline'>
          {user?.displayName ?? userData?.name}
        </p>
      </div>
    </div>
  )
}

export default UserLinks
