import React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import UserLinks from './UserLinks'

// Navbar-komponent som viser hovednavigasjonen for applikasjonen
const Navbar: React.FC = (): React.ReactElement => {
  return (
    <div className='flex justify-between items-center border-b border-gray-100 w-full px-44 py-2'>
      {/* Logo med lenke til hovedsiden */}
      <Link to='/'>
        <div className='text-2xl font-extrabold text-gray-900 dark:text-white font-roboto'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-800'>
            Sosiale Medier
          </span>{' '}
          App
        </div>
      </Link>

      {/* Navigasjonslenker */}
      <div className='flex justify-center items-center mx-auto'>
        <NavLinks />
      </div>

      {/* Brukerrelaterte lenker */}
      <div>
        <UserLinks />
      </div>
    </div>
  )
}

export default Navbar
