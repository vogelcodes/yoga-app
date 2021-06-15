import {useRouter} from 'next/router'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login'
import { Box, Button, ButtonGroup, Flex, Img, Text, useColorModeValue } from "@chakra-ui/react"
import { FaGoogle, FaFacebook} from 'react-icons/fa'
import styles from '../styles/Home.module.scss'
import { Footer } from '../components/footer/footer'
import { useState } from 'react'
import { Login } from '../components/chakraui/Login'

export default function Home() {
  const [email, setEmail ] = useState('');
  const [name, setName ] = useState('');
  const [session] = useSession()
  const router = useRouter()
  const handleLogin = (e) => {
    e.preventDefault()

    signIn()
  }
  if(session){
    router.push("/dashboard")
  }
  
 

  

  return (


    <Flex bg="#F4CCCC" direction="column" minH="100vh "  justify="space-between" >
      
      <Head>
        <title>YogaApp | Home</title>
      

      </Head>
      <main className={styles.main}>
      <Box
    bg={useColorModeValue('white', 'gray.700')}
    py="8"
    px={{ base: '4', md: '10' }}
    shadow="base"
    rounded={{ sm: 'lg' }}>

        <Box mx="auto" maxW="32">
          <Img mx="auto" src="/lotus-yoga.svg" alt="lotus-flower" h="32" w="32"/>
        </Box>
      
          <Login />
          {/* <div>
             <form className={styles.form}> 
             <input 
             type="email" 
             placeholder="E-mail" 
             id="email"
             value={email}
             onChange={e => setEmail(e.target.value)}/>
             <input  placeholder="Nome" id="name" value={name} onChange={(e)=> setName(e.target.value)}/> 
             <input className={styles.button} type="button" value="Login" onClick={()=>{console.log(email, name); signIn('email', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard', email, name }, )}}  /> 
             <Button colorScheme="facebook" leftIcon={<FaFacebook />} onClick={()=>signIn('facebook', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })}>
             Entar com Facebook
             </Button>
             <Button colorScheme="blue" leftIcon={<FaGoogle />} onClick={()=>signIn('google', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })}>
             Entrar com Google
             </Button>
             </form> 
            </div> */}
            </Box>
      </main>

      {/* <Footer/> */}
    </Flex>
  )
}
