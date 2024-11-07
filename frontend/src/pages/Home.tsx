import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'

const Home: React.FC = (): React.ReactNode => {
  return (
    <div className='w-full'>
      <div className='fixed top-0 z-10 w-full bg-white'>
        <Navbar />
      </div>
      <div className='flex bg-gray-100'>
        <div className='flex-auto w-[20%] fixed top-12'>
          <LeftSidebar></LeftSidebar>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Home
