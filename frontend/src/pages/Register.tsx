import React, { useContext, useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'
import { AuthContext } from '../context/AuthContext/authContext'

// Definerer initialverdier for registreringsskjemaet
interface FormValues {
  name: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Henter registerfunksjon og brukerdata fra AuthContext
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthContextProvider')
  }
  const { registerWithEmailAndPassword, user } = authContext

  // Valideringsskjema med Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Vennligst fyll ut ditt navn')
      .min(3, 'Navnet må bestå av minst 3 tegn')
      .matches(/^[a-zA-ZæøåÆØÅ\s]+$/, 'Navn kan bare inneholde bokstaver'),
    email: Yup.string()
      .email('Ugyldig e-postadresse')
      .required('Vennligst fyll ut din e-postadresse'),
    password: Yup.string()
      .required('Vennligst fyll ut et passord')
      .min(6, 'Passordet må bestå av minst 6 tegn')
      .matches(
        /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{6,}$/,
        'Passordet må inneholde minst én stor bokstav, én liten bokstav og ett tall'
      ),
  })

  // Funksjon for registrering
  const handleRegisterSubmit = (values: FormValues) => {
    if (formik.isValid) {
      registerWithEmailAndPassword(values.name, values.email, values.password)
      setLoading(true)
    } else {
      setLoading(false)
      alert('Check your input fields')
    }
  }

  const formik = useFormik<FormValues>({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: handleRegisterSubmit,
  })

  // Naviger til hjem ved vellykket registrering
  useEffect(() => {
    if (user) navigate('/')
    else setLoading(false)
  }, [user, navigate])

  return (
    <>
      {loading ? (
        <div className='grid h-screen place-items-center'>
          <ClipLoader
            color='#2399d3'
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className='grid h-screen place-items-center'>
          <Card
            className='w-96'
            {...({} as React.ComponentProps<typeof Card>)}
          >
            <CardHeader
              variant='gradient'
              color='blue-gray'
              className='mb-4 grid h-28 place-items-center'
              {...({} as React.ComponentProps<typeof CardHeader>)}
            >
              <Typography
                className='text-2xl'
                variant='h3'
                color='white'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Registrer en ny konto
              </Typography>
            </CardHeader>
            <CardBody
              className='flex flex-col gap-4'
              {...({} as React.ComponentProps<typeof CardBody>)}
            >
              <form onSubmit={formik.handleSubmit}>
                <Input
                  type='text'
                  label='Navn'
                  size='lg'
                  {...formik.getFieldProps('name')}
                  {...({} as React.ComponentProps<typeof Input>)}
                />
                {formik.touched.name && formik.errors.name && (
                  <Typography
                    variant='small'
                    color='red'
                    className='mt-2'
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    {formik.errors.name}
                  </Typography>
                )}
                <Input
                  type='email'
                  label='E-postadresse'
                  size='lg'
                  {...formik.getFieldProps('email')}
                  className='mt-4'
                  {...({} as React.ComponentProps<typeof Input>)}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography
                    variant='small'
                    color='red'
                    className='mt-2'
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    {formik.errors.email}
                  </Typography>
                )}
                <Input
                  type='password'
                  label='Passord'
                  size='lg'
                  {...formik.getFieldProps('password')}
                  className='mt-4'
                  {...({} as React.ComponentProps<typeof Input>)}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography
                    variant='small'
                    color='red'
                    className='mt-2'
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    {formik.errors.password}
                  </Typography>
                )}
                <Button
                  variant='gradient'
                  color='blue'
                  type='submit'
                  fullWidth
                  className='mt-6'
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  Registrer
                </Button>
              </form>
            </CardBody>
            <CardFooter
              className='pt-0'
              {...({} as React.ComponentProps<typeof CardFooter>)}
            >
              <Typography
                variant='small'
                className='mt-2 text-center'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Har du allerede en konto?
                <Link to='/login'>
                  <Typography
                    as='span'
                    color='blue-gray'
                    className='ml-1 font-bold'
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Logg inn
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}

export default Register
