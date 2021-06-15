import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  HTMLChakraProps,
  Input,
  Stack,
} from '@chakra-ui/react'
import * as React from 'react'
import { signIn }  from 'next-auth/client'
import { PasswordField } from './PasswordField'

export const LoginForm = (props: HTMLChakraProps<'form'>) => (
  <chakra.form
    onSubmit={(e) => {
      e.preventDefault()
      // signIn('email', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard'  })// your login logic here
    }}
    {...props}
  >
    <Stack spacing="6">
      <FormControl id="email">
        <FormLabel>E-mail</FormLabel>
        <Input name="email" type="email" autoComplete="email" required />
      </FormControl>
      <Button cursor="not-allowed" type="submit" variant="outline" bg="#DCC6EA" size="lg" fontSize="md" >
        Entrar
      </Button>
    </Stack>
  </chakra.form>
)
