import {useRouter} from 'next/router'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login'
import { Button, ButtonGroup } from "@chakra-ui/react"
import { FaGoogle, FaFacebook} from 'react-icons/fa'
import styles from '../styles/Home.module.scss'
import { Footer } from '../components/footer/footer'
import { useState } from 'react'

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
    <div className={styles.container}>
      
      <Head>
        <title>YogaApp | Home</title>
      

      </Head>
      <div id="fb-root"></div>
      <main className={styles.main}>
        <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="96" width="96"/>
        </div>
          <span>YogaApp</span>
          <div>
            <form className={styles.form}> 
              {/* <input 
                type="email" 
                placeholder="E-mail" 
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
              {/* <input  placeholder="Nome" id="name" value={name} onChange={(e)=> setName(e.target.value)}/> */}
              {/* <input className={styles.button} type="button" value="Login" onClick={()=>{console.log(email, name); signIn('email', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard', email, name }, )}}  /> */}
              <Button colorScheme="facebook" leftIcon={<FaFacebook />} onClick={()=>signIn('facebook', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })}>
    Entar com Facebook
  </Button>
  <Button colorScheme="blue" leftIcon={<FaGoogle />} onClick={()=>signIn('google', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })}>
    Entrar com Google
  </Button>
            </form>
          </div>
      </main>

      <Footer/>
    </div>
  )
}
