import React, { useState } from 'react'
import { Input, Button, Typography } from '@material-tailwind/react'

// Reset-komponent for å tilbakestille passord via e-post
const Reset: React.FC = () => {
  const [email, setEmail] = useState('')

  return (
    <div className='grid h-screen place-items-center'>
      <div className='w-96'>
        {/* Instruksjonstekst for passordtilbakestilling */}
        <Typography
          variant='h6'
          color='blue-gray'
          className='pb-4'
          {...({} as React.ComponentProps<typeof Typography>)}
        >
          Vennligst fyll inn e-postadressen knyttet til din konto, så sender vi
          deg en lenke for å tilbakestille passord.
        </Typography>

        {/* Input-felt for e-postadresse */}
        <Input
          label='E-postadresse'
          name='email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...({} as React.ComponentProps<typeof Input>)}
        />

        {/* Send-knapp for å motta tilbakestillingslenke */}
        <Button
          variant='gradient'
          color='blue'
          className='mt-4'
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
