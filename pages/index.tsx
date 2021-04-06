import {useRouter} from 'next/router'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login'
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
        <link rel="icon" href="/lotus-yoga.svg" />
        

      </Head>
      <div id="fb-root"></div>
      <main className={styles.main}>
        <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="96" width="96"/>
        </div>
          <span>YogaApp</span>
          <div>
            <form className={styles.form}> 
              <input 
                type="email" 
                placeholder="E-mail" 
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
              {/* <input  placeholder="Nome" id="name" value={name} onChange={(e)=> setName(e.target.value)}/> */}
              <input className={styles.button} type="button" value="Login" onClick={()=>{console.log(email, name); signIn('email', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard', email, name }, )}}  />
              <GoogleButton label="Entrar com Google" onClick={()=>signIn('google', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })} />
              <FacebookLogin onClick={()=>signIn('facebook', { callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })} />
            </form>
          </div>
      </main>

      <Footer/>
    </div>
  )
}
