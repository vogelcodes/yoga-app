import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { signIn } from 'next-auth/client'
import * as React from 'react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import { Card } from './Card'
import { DividerWithText } from './DividerWithText'
import { Link } from './Link'
import { LoginForm } from './LoginForm'
import { Logo } from './Logo'

export const Login = () => (
    <Box maxW="md" mx="auto">
      <Card>
        <LoginForm />
        <DividerWithText mt="6">ou  entre com</DividerWithText>
        <SimpleGrid mt="6" columns={2} spacing="3">
          <Button color="currentColor" variant="outline" onClick={()=>signIn('facebook', { callbackUrl: 'https://yoga.vogelcodes.com/dashboard' })}>
            <VisuallyHidden>Logar com Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button color="currentColor" variant="outline" onClick={()=>signIn('google', { callbackUrl: 'https://yoga.vogelcodes.com/dashboard' })}>
            <VisuallyHidden>Logar com Google</VisuallyHidden>
            <FaGoogle />
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
)
