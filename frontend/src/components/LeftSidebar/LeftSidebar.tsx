import React, { useRef, useState, useEffect, useContext } from 'react'
import { Tooltip, Avatar } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import sunset from '../../assets/images/sunset.jpg'
import job from '../../assets/images/job.png'
import location from '../../assets/images/location.png'
import facebook from '../../assets/images/facebook.png'
import twitter from '../../assets/images/twitter.png'
import laptop from '../../assets/images/laptop.jpg'
import media from '../../assets/images/media.jpg'
import apps from '../../assets/images/apps.jpg'
import tik from '../../assets/images/tik.jpg'
import avatar from '../../assets/images/avatar.png'
import { ImageData } from '../../types/types'

const LeftSidebar: React.FC = (): React.ReactElement => {
  // Bruker og brukerdata fra konteksten
  const { user, userData } = useContext(AuthContext) || {}

  // Status for å håndtere reklamebilder og progress bar
  const [data, setData] = useState<ImageData | null>(null)
  const count = useRef(0)

  // Funksjon for å hente et tilfeldig bilde fra en liste
  const handleRandom = (arr: ImageData[]) => {
    setData(arr[Math.floor(Math.random() * arr.length)])
  }

  // useEffect for å sette opp reklameannonser
  useEffect(() => {
    const imageList = [
      { id: '1', image: laptop },
      { id: '2', image: media },
      { id: '3', image: apps },
      { id: '4', image: tik },
    ]

    // Start med et tilfeldig bilde
    handleRandom(imageList)

    // Bytter reklamebilde hver 2. sekund inntil fem ganger
    let countAds = 0
    const startAds = setInterval(() => {
      countAds++
      handleRandom(imageList)
      count.current = countAds
      if (countAds === 5) clearInterval(startAds)
    }, 2000)

    return () => clearInterval(startAds)
  }, [])

  // Funksjon for å beregne fremgangen til progress bar
  const progressBar = () => {
    switch (count.current) {
      case 1:
        return 20
      case 2:
        return 40
      case 3:
        return 60
      case 4:
        return 80
      case 5:
        return 100
      default:
        return 0
    }
  }

  return (
    <div className='flex flex-col h-screen bg-white pb-4 border-2 rounded-r-xl shadow-lg mt-2 mx-2'>
      {/* Profilbilde med tooltip */}
      <div className='flex flex-col items-center relative'>
        <img
          src={sunset}
          alt='Solnedgang ved havet med sterke farger'
          className='rounded-md'
        />
        <div className='absolute -bottom-8'>
          <Tooltip
            content='Profil'
            placement='top'
          >
            <Avatar
              src={user?.photoURL || avatar}
              size='xxl'
              alt='Brukerens profilbilde'
              {...({} as React.ComponentProps<typeof Avatar>)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Brukernavn og e-post */}
      <div className='flex flex-col items-center pt-12'>
        <p className='font-roboto font-bold text-md text-gray-900 no-underline tracking-normal leading-none pb-2'>
          {userData?.name}
        </p>
        <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
          {user?.email || userData?.email}
        </p>
      </div>

      {/* Lokasjon og yrkestittel */}
      <div className='flex flex-col pl-2 mt-10'>
        <div className='flex items-center pb-4'>
          <img
            className='h-10'
            src={location}
            alt='lokasjon'
          />
          <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2'>
            Oslo
          </p>
        </div>
        <div className='flex items-center'>
          <img
            className='h-10'
            src={job}
            alt='jobb'
          />
          <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none ml-2'>
            React Utvikler
          </p>
        </div>
      </div>

      {/* Sosiale medier ikoner */}
      <div className='ml-4 mt-10'>
        <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2 mb-5'>
          Sosiale Nettverk
        </p>
        <div className='flex items-center'>
          <img
            className='h-1- mb-3 mr-2'
            src={facebook}
            alt='facebook'
          />
          <p className='font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2'>
            Facebook
          </p>
        </div>
        <div className='flex items-center'>
          <img
            className='h-1- mb-3 mr-2'
            src={twitter}
            alt='twitter'
          />
          <p className='font-roboto font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r to-red-700 from-blue-500 no-underline tracking-normal leading-none py-2'>
            Twitter
          </p>
        </div>
      </div>

      {/* Reklamebilde og fremdriftsindikator */}
      <div className='flex flex-col justify-center items-center pt-10'>
        <p className='font-roboto font-bold text-lg no-underline tracking-normal leading-none py-4'>
          Reklame
        </p>
        <div
          style={{ width: `${progressBar()}%` }}
          className='bg-blue-600 rounded-xl h-1 mb-4'
        ></div>
        {data && (
          <img
            className='h-36 rounded-lg cursor-pointer'
            src={data.image}
            alt='reklame'
          />
        )}
      </div>
    </div>
  )
}

export default LeftSidebar
