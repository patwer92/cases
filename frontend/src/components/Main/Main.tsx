import React, { useRef, useContext, useState, useReducer } from 'react'
import { Avatar, Button, Alert } from '@material-tailwind/react'
import { AuthContext } from '../../context/AuthContext/authContext'
import {
  serverTimestamp,
  setDoc,
  doc,
  collection,
  Timestamp,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import {
  postReducer,
  postActions,
  postStates,
} from '../../context/PostContext/postReducer'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import PostCard from './PostCard'

// Importerer statiske ressurser
import live from '../../assets/images/live.png'
import smile from '../../assets/images/smile.png'
import addImage from '../../assets/images/add-image.png'
import avatar from '../../assets/images/avatar.png'

// Importerer typer for fil og bilde
import { FileType, ImageType, Post } from '../../types/postTypes'

// Hovedkomponenten som håndterer innlegg og visning
const Main: React.FC = (): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext må brukes innenfor en AppContextProvider')
  }
  const { user, userData } = authContext
  const posts = authContext.posts as Post[]

  const [state, dispatch] = useReducer(postReducer, postStates)
  const [image, setImage] = useState<ImageType>(null)
  const [file, setFile] = useState<FileType>(null)
  const [progressBar, setProgressBar] = useState<number>(0)
  const [warning, setWarning] = useState(false)

  const text = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const postRef = doc(collection(db, 'posts'))

  const { HANDLE_ERROR } = postActions

  // Håndterer filopplasting
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  // Sender nytt innlegg til databasen
  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validerer om innleggstekst eller bilde finnes
    if ((text.current && text.current.value !== '') || image) {
      try {
        await setDoc(postRef, {
          documentId: postRef.id,
          uid: user?.uid || userData?.uid,
          userImg: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current?.value || '',
          image: image || null,
          timestamp: serverTimestamp(),
        })

        // Tilbakestiller input-felt og varsler etter vellykket innsending
        if (text.current) text.current.value = ''
        setImage(null)
        setFile(null)
        setProgressBar(0)
        setWarning(false)
      } catch (error) {
        dispatch({ type: HANDLE_ERROR })
        alert(
          'Feil ved lagring av post. Vennligst prøv igjen. Feilmelding: ' +
            error
        )
      }
    } else {
      setWarning(true)
    }
  }

  const storage = getStorage()
  const metadata = {
    contentType: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
    ],
  }

  // Laster opp bildet til Firebase Storage og oppdaterer progressbar
  const submitImage = async () => {
    if (!file || !metadata.contentType.includes(file.type)) return

    try {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgressBar(progress)
        },
        (error) => alert(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setImage(downloadURL)
        }
      )
    } catch (error) {
      dispatch({ type: HANDLE_ERROR })
      alert(
        'Feil ved bildeopplasting. Vennligst prøv igjen. Feilmelding: ' + error
      )
    }
  }

  return (
    <div className='flex flex-col items-center'>
      {/* Input-seksjon for nytt innlegg */}
      <div className='flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg'>
        <div className='flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full'>
          <Avatar
            size='sm'
            variant='circular'
            src={user?.photoURL || avatar}
            alt='profile image'
            {...({} as React.ComponentProps<typeof Avatar>)}
          />
          <form
            className='w-full'
            onSubmit={handleSubmitPost}
          >
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
              <div className='mx-4'>
                {image && (
                  <img
                    className='h-24 rounded-xl'
                    src={image}
                    alt='previewImage'
                  />
                )}
              </div>
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

        {/* Advarsel for manglende tekst eller bilde */}
        {warning && (
          <Alert color='orange'>
            Vennligst skriv noe eller last opp et bilde for å poste et innlegg.
          </Alert>
        )}

        <span
          className='bg-blue-700 py-1 rounded-md'
          style={{ width: `${progressBar}%` }}
        />

        {/* Interaksjonsknapper */}
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
                onChange={handleUpload}
              />
            </label>
            {file && (
              <Button
                className='text-sm'
                variant='text'
                onClick={submitImage}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                Last opp bilde
              </Button>
            )}
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={live}
              alt='live'
            />
            <p className='font-roboto font-medium text-sm text-gray-700'>
              Gå Live
            </p>
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={smile}
              alt='feeling'
            />
            <p className='font-roboto font-medium text-sm text-gray-700'>
              Følelse
            </p>
          </div>
        </div>

        <div ref={scrollRef}></div>
      </div>

      {/* Viser innleggene i feeden */}
      <div className='flex flex-col py-4 w-full'>
        {state.error ? (
          <Alert color='red'>
            Noe gikk galt. Vennligst last opp siden på nytt...
          </Alert>
        ) : (
          <div className='main-content'>
            {posts.length > 0 ? (
              // Sorter innleggene etter `timestamp` før vi mapper over dem
              posts
                .slice() // Opprett en kopi for å unngå mutasjoner
                .sort((a, b) => {
                  // Sjekk om `timestamp` er en `Timestamp`, ellers konverter den til en Date
                  const aDate =
                    a.timestamp instanceof Timestamp
                      ? a.timestamp.toDate()
                      : new Date(a.timestamp)
                  const bDate =
                    b.timestamp instanceof Timestamp
                      ? b.timestamp.toDate()
                      : new Date(b.timestamp)
                  return bDate.getTime() - aDate.getTime() // Sorter fra nyeste til eldste
                })
                .map((postItem) => (
                  <PostCard
                    key={postItem.documentId}
                    post={{ ...postItem, id: postItem.documentId }}
                  />
                ))
            ) : (
              <p className='font-roboto grid grid-col-1 justify-center '>
                Laster innlegg...
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Main
