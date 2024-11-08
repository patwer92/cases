import React from 'react'
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

interface FormValues {
  name: string
  email: string
  password: string
}

const Register: React.FC = (): React.ReactElement => {
  const initialValues = { name: '', email: '', password: '' }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Required')
      .min(3, 'Name must be at least 3 characters')
      .matches(/^[a-zA-ZæøåÆØÅ]+$/, 'Name can only contain letters'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
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
            className='text-center text-2xl'
            variant='h3'
            color='white'
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Sign up with a new account
          </Typography>
        </CardHeader>
        <CardBody
          className='flex flex-col gap-4'
          {...({} as React.ComponentProps<typeof CardBody>)}
        >
          <form
          //   onSubmit=''
          >
            <div className='mb-2'>
              <Input
                type='text'
                label='Name'
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
                label='Email'
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
                label='Password'
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
              Sign up
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
            Already have an account?
            <Link to='/login'>
              <Typography
                as='span'
                href='#signup'
                variant='small'
                color='blue-gray'
                className='ml-1 font-bold'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
