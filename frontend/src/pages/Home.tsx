import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import CardSection from '../components/Main/CardSection'
import Main from '../components/Main/Main'

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
        <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
          <CardSection></CardSection>
          <Main></Main>
        </div>
        <div className='flex-auto w-[20%] fixed right-0 top-12'>
          <RightSidebar></RightSidebar>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Home
