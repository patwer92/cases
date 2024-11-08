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
  email: string
  password: string
}

const Login: React.FC = (): React.ReactElement => {
  const initialValues = { email: '', password: '' }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-zæøå])(?=.*[A-ZÆØÅ])(?=.*\d).{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
  })

  const handleLoginSubmit = (values: { email: string; password: string }) => {
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
    onSubmit: handleLoginSubmit,
  })

  return (
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
            Welcome back!
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
            <div className='mt-2 mb-4'>
              <Input
                type='password'
                label='Password'
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
              Login
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
            Sign in with Google
          </Button>
          <Link to='/reset'>
            <p className='font-medium font-roboto text-sm text-gray-900 text-center mt-6'>
              Reset your password
            </p>
          </Link>
          <Typography
            variant='small'
            className='mt-8 mb-2 flex justify-center'
            {...({} as React.ComponentProps<typeof Typography>)}
          >
            Don&apos;t have an account?
            <Link to='/register'>
              <Typography
                as='span'
                variant='small'
                color='blue-gray'
                className='ml-1 font-bold'
                {...({} as React.ComponentProps<typeof Typography>)}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
