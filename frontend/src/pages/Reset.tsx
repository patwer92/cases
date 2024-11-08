import React, { useState } from 'react'
import { Input, Button, Typography } from '@material-tailwind/react'

const Reset: React.FC = (): React.ReactElement => {
  const [email, setEmail] = useState('')

  return (
    <div className='grid grid-cols-1 justify-items-center items-center h-screen'>
      <div className='w-96'>
        <Typography
          variant='h6'
          color='blue-gray'
          className='pb-4'
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Vennligst fyll inn e-postadressen knyttet til din konto, så sender vi
          deg en lenke for å tilbakestille passord.
        </Typography>
        <Input
          label='E-postadresse'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...({} as React.ComponentProps<typeof Input>)}
        />
        <Button
          variant='gradient'
          className='mt-4'
          color='blue'
          fullWidth
          {...({} as React.ComponentProps<typeof Button>)}
        >
          Send lenke
        </Button>
      </div>
    </div>
  )
}

export default Reset
