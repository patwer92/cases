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
  name: string
  email: string
  password: string
}

const Register: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(false)

  const initialValues = { name: '', email: '', password: '' }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Vennligst fyll ut et navn')
      .min(3, 'Navnet må bestå av minst 3 tegn')
      .matches(/^[a-zA-ZæøåÆØÅ\s]+$/, 'Navn kan bare inneholde bokstaver'),
    email: Yup.string()
      .email('Ugyldig e-postadresse')
      .required('Vennligst fyll ut en e-postadresse'),
    password: Yup.string()
      .required('Vennligst fyll ut et passord')
      .min(6, 'Passordet må bestå av minst 6 tegn')
      .matches(
        /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{6,}$/,
        'Passordet må inneholde minst én stor bokstav, én liten bokstav og ett tall'
      ),
  })

  const handleRegisterSubmit = (values: {
    name: string
    email: string
    password: string
  }) => {
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
    onSubmit: handleRegisterSubmit,
  })

  return (
    <>
      {loading ? (
        <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
          <ClipLoader
            color='#2399d3'
            size={150}
            speedMultiplier={0.5}
          />
        </div>
      ) : (
        <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
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
                className='text-center text-xl px-2'
                variant='h3'
                color='white'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Kom i gang - opprett en ny konto
              </Typography>
            </CardHeader>
            <CardBody
              className='flex flex-col gap-4'
              {...({} as React.ComponentProps<typeof CardBody>)}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                  <Input
                    type='text'
                    label='Navn'
                    size='lg'
                    {...formik.getFieldProps('name')}
                    {...({} as React.ComponentProps<typeof Input>)}
                  />
                  <div className='mt-2 mb-4'>
                    {formik.touched.name && formik.errors.name && (
                      <Typography
                        variant='small'
                        color='red'
                        {...({} as React.ComponentProps<typeof Typography>)}
                      >
                        {formik.errors.name}
                      </Typography>
                    )}
                  </div>
                </div>
                <div className='mt-4 mb-2'>
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
                <div className='mt-4 mb-2'>
                  <Input
                    type='password'
                    label='Passord'
                    size='lg'
                    {...formik.getFieldProps('password')}
                    {...({} as React.ComponentProps<typeof Input>)}
                  />
                  <div className='mt-2 mb-4'>
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
                  variant='gradient'
                  color='blue'
                  type='submit'
                  fullWidth
                  {...({} as React.ComponentProps<typeof Button>)}
                >
                  Registrer deg nå
                </Button>
              </form>
            </CardBody>
            <CardFooter
              className='pt-0'
              {...({} as React.ComponentProps<typeof CardFooter>)}
            >
              <Typography
                variant='small'
                className='mt-2 flex justify-center'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Har du allerede en konto?
                <Link to='/login'>
                  <Typography
                    as='span'
                    href='#signup'
                    variant='small'
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
