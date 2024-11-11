import React, {
  useRef,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Avatar, Button, Alert } from '@material-tailwind/react'
import live from '../../assets/images/live.png'
import smile from '../../assets/images/smile.png'
import addImage from '../../assets/images/add-image.png'
import { AuthContext } from '../../context/AuthContext/authContext'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
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
  UploadTaskSnapshot,
} from 'firebase/storage'
import PostCard from './PostCard'

// Typer for fil og bilde
type FileType = File | null
type ImageType = string | null

// Typer for post
interface Post {
  uid: string
  documentId: string
  userImg?: string
  name: string
  email: string
  text: string
  image?: string
  timestamp: Timestamp | string // Tillater begge typer
}

const Main: React.FC = (): React.ReactElement => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { user, userData } = authContext

  // State management med reducer og initial state
  const [state, dispatch] = useReducer(postReducer, postStates)

  // Refs for input og rulling
  const text = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // State for bilde, fil og progresjonslinje
  const [image, setImage] = useState<ImageType>(null)
  const [file, setFile] = useState<FileType>(null)
  const [progressBar, setProgressBar] = useState<number>(0)

  // Firebase referanser
  const collectionRef = collection(db, 'posts')
  const postRef = doc(collection(db, 'posts'))
  const document = postRef.id
  const { SUBMIT_POST, HANDLE_ERROR } = postActions

  // Håndtering av filopplasting
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]) // Setter fil i state
    }
  }

  // Funksjon for å sende inn post
  const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmitPost funksjon kalt') // Bekreft at funksjonen kjører

    if (text.current && text.current.value !== '') {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          userImg: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        })
        console.log('Post lagret til Firestore') // Bekreft at data blir sendt

        // Sjekk om `text.current` eksisterer før du prøver å sette verdien
        if (text.current) {
          text.current.value = '' // Tøm input-feltet etter innsendelse
        } else {
          console.warn('text.current er null, kan ikke sette verdi.')
        }
      } catch (error) {
        dispatch({ type: HANDLE_ERROR })
        console.log('Error ved lagring av post:', error)
        alert(error)
      }
    } else {
      console.log('Tekstfeltet er tomt') // Indiker at tekstfeltet er tomt
      dispatch({ type: HANDLE_ERROR })
    }
  }

  const storage = getStorage()

  // Metadata for filopplasting
  const metadata = {
    contentType: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/svg+xml',
    ],
  }

  // Funksjon for å laste opp bilde til Firebase Storage
  const submitImage = async () => {
    if (!file) return // Sjekker om fil er valgt
    if (!metadata.contentType.includes(file.type)) return // Validerer filtype

    try {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          // Oppdaterer progresjon
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          setProgressBar(progress)
        },
        (error) => {
          alert(error)
        },
        async () => {
          // Henter URL etter vellykket opplasting
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          setImage(downloadURL)
        }
      )
    } catch (error) {
      dispatch({ type: HANDLE_ERROR })
      alert(error)
    }
  }

  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy('timestamp', 'asc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsData: Post[] = snapshot.docs.map((item) => {
          const data = item.data()
          return {
            uid: data.uid || '',
            documentId: data.documentId || '',
            userImg: data.userImg || '',
            name: data.name || '',
            email: data.email || '',
            text: data.text || '',
            image: data.image || '',
            timestamp: data.timestamp || '', // La timestamp være enten Timestamp eller string
          }
        })
        // Oppdaterer state med nye poster
        dispatch({
          type: SUBMIT_POST,
          posts: postsData,
        })
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' }) // Ruller til bunnen
        setImage(null) // Tilbakestiller image state
        setFile(null) // Tilbakestiller fil state
        setProgressBar(0) // Tilbakestiller progresjon
      })
      return () => unsubscribe() // Avregistrerer observeren ved unmount
    }
    postData()
  }, [SUBMIT_POST])

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col py-4 w-full bg-white rounded-3xl shadow-lg'>
        <div className='flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full'>
          <Avatar
            size='sm'
            variant='circular'
            src={
              user?.photoURL ||
              'https://docs.material-tailwind.com/img/face-2.jpg'
            }
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
        <span
          className='bg-blue-700 py-1 rounded-md'
          style={{ width: `${progressBar}%` }}
        />
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
                className='cursor-pointer'
              />
            </label>
            {file && (
              <Button
                className='text-sm'
                variant='text'
                onClick={submitImage}
                {...({} as React.ComponentProps<typeof Button>)}
              >
                LAST OPP
              </Button>
            )}
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={live}
              alt='live'
            />
            <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              GÅ LIVE
            </p>
          </div>
          <div className='flex items-center'>
            <img
              className='h-10 mr-4'
              src={smile}
              alt='feeling'
            />
            <p className='font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
              FØLELSE
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col py-4 w-full'>
        {state.error ? (
          <div className='flex justify-center items-center'>
            <Alert color='red'>
              Noe gikk galt. Vennligst last opp siden på nytt...
            </Alert>
          </div>
        ) : (
          <div>
            {state.posts.length > 0 &&
              state.posts.map((post: Post, index: number) => {
                let postTimestamp: string

                // Typebeskyttelse for å sjekke om post.timestamp er et Firestore Timestamp-objekt
                if (post.timestamp instanceof Timestamp) {
                  postTimestamp = post.timestamp.toDate().toUTCString() // Konverterer Firestore Timestamp til UTC-streng
                } else {
                  postTimestamp = new Date(post.timestamp).toUTCString() // Konverterer string til Date og formaterer
                }

                return (
                  <PostCard
                    key={index}
                    {...({} as React.ComponentProps<typeof PostCard>)}
                    userImg={
                      post.userImg ||
                      'https://docs.material-tailwind.com/img/face-2.jpg'
                    }
                    id={post.documentId}
                    uid={post.uid}
                    name={post.name}
                    email={post.email}
                    image={post.image}
                    text={post.text}
                    timestamp={postTimestamp}
                  />
                )
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/*Referanse for rulling*/}</div>
    </div>
  )
}

export default Main
