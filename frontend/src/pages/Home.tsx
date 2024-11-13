import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import LeftSidebar from '../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../components/RightSidebar/RightSidebar'
import CardSection from '../components/Main/CardSection'
import Main from '../components/Main/Main'

// Hovedside for appen, med navigasjon, sidefelt og hovedinnhold
const Home: React.FC = (): React.ReactElement => {
  return (
    <div className='w-full'>
      {/* Navigasjonslinje på toppen */}
      <div className='fixed top-0 z-10 w-full bg-white'>
        <Navbar />
      </div>

      {/* Hovedoppsett med tre seksjoner: venstre sidefelt, hovedinnhold, høyre sidefelt */}
      <div className='flex bg-gray-100'>
        {/* Venstre sidefelt */}
        <div className='flex-auto w-[20%] fixed top-12'>
          <LeftSidebar />
        </div>

        {/* Hovedinnhold */}
        <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
          <div className='w-[80%] mx-auto'>
            <CardSection />
            <Main />
          </div>
        </div>

        {/* Høyre sidefelt */}
        <div className='flex-auto w-[20%] fixed right-0 top-12'>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
