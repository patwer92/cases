import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ClipLoader from 'react-spinners/ClipLoader'

interface FormValues {
  email: string
  password: string
}

const Login: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(false)
  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Ugyldig e-postadresse')
      .required('Vennligst fyll ut din e-postadresse'),
    password: Yup.string()
      .required('Vennligst fyll ut ditt passord')
      .min(6, 'Passordet må bestå av minst 6 tegn')
      .matches(
        /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{6,}$/,
        'Passordet må inneholde minst én stor bokstav, én liten bokstav og ett tall'
      ),
  })

  const handleLoginSubmit = (values: { email: string; password: string }) => {
    // const { email, password } = formik.values
    if (formik.isValid === true) {
      alert('good')
      setLoading(true)
    } else {
      alert('Check your input fields')
    }
    console.log('Formik:', formik)
    console.log('Values:', values)
  }

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleLoginSubmit,
  })

  return (
    <>
      {' '}
      {loading ? (
        <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
          <ClipLoader
            color='#2399d3'
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className='grid grid-cols-1 h-screen justify-items-center items-center'>
          <Card
            className='w-96 shadow-2xl border-2'
            {...({} as React.ComponentProps<typeof Card>)}
          >
            <CardHeader
              variant='gradient'
              color='blue-gray'
              className='mb-4 grid h-28 place-items-center'
              {...({} as React.ComponentProps<typeof CardHeader>)}
            >
              <Typography
                variant='h3'
                color='white'
                className='text-2xl'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Velkommen tilbake!
              </Typography>
            </CardHeader>
            <CardBody
              className='flex flex-col gap-4'
              {...({} as React.ComponentProps<typeof CardBody>)}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                  <Input
                    type='email'
                    label='E-postadresse'
                    size='lg'
                    {...formik.getFieldProps('email')}
                    {...({} as React.ComponentProps<typeof Input>)}
                  />
                  <div className='mt-2 mb-4'>
                    {formik.touched.email && formik.errors.email && (
                      <Typography
                        variant='small'
                        color='red'
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {formik.errors.email}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className='mt-2 mb-4'>
                  <Input
                    type='password'
                    label='Passord'
                    size='lg'
                    {...formik.getFieldProps('password')}
                    {...({} as React.ComponentProps<typeof Input>)}
                  />
                  <div className='my-2'>
                    {formik.touched.password && formik.errors.password && (
                      <Typography
                        variant='small'
                        color='red'
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {formik.errors.password}
                      </Typography>
                    )}
                  </div>
                </div>
                <Button
                  type='submit'
                  variant='gradient'
                  color='blue-gray'
                  fullWidth
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  Logg inn
                </Button>
              </form>
            </CardBody>
            <CardFooter
              className='pt-0'
              {...({} as React.ComponentProps<typeof CardFooter>)}
            >
              <Button
                className='mb-4'
                variant='gradient'
                fullWidth
                color='blue'
                {...({} as React.ComponentProps<typeof Button>)}
              >
                Logg på med Google
              </Button>
              <Link to='/reset'>
                <p className='font-medium font-roboto text-sm text-gray-900 text-center mt-6'>
                  Tilbakestill passordet
                </p>
              </Link>
              <Typography
                variant='small'
                className='mt-8 mb-2 flex justify-center'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Har du ikke en konto?
                <Link to='/register'>
                  <Typography
                    as='span'
                    variant='small'
                    color='blue-gray'
                    className='ml-1 font-bold'
                    {...({} as React.ComponentProps<typeof Typography>)}
                  >
                    Registrer deg her
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

export default Login
