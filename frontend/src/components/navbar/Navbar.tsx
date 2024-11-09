import React from 'react'
import NavLinks from './NavLinks'
import UserLinks from './UserLinks'
import { Link } from 'react-router-dom'

const Navbar: React.FC = (): React.ReactElement => {
  return (
    <div className='flex justify-between items-center border-b border-gray-100 w-full px-44 py-2'>
      <Link to='/'>
        <div className='text-2xl font-extrabold text-gray-900 dark:text-white font-roboto'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-800'>
            Sosiale Medier
          </span>{' '}
          App
        </div>
      </Link>
      <div className='flex justify-center items-center mx-auto'>
        <NavLinks></NavLinks>
      </div>
      <div>
        <UserLinks></UserLinks>
      </div>
    </div>
  )
}

export default Navbar
