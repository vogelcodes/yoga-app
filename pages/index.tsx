import {useRouter} from 'next/router'
import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import GoogleButton from 'react-google-button'
import styles from '../styles/Home.module.scss'
import { Footer } from '../components/footer/footer'

export default function Home() {
  const [session] = useSession()
  console.log(session)
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

      <main className={styles.main}>
        <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="96" width="96"/>
        </div>
          <span>YogaApp</span>
          <div>
            <form className={styles.form}> 
              <input type="email" placeholder="E-mail" name="" id="email"/>
              <input type="password" placeholder="Senha" name="" id=""/>
              <input type="button" value="Login" />
              <GoogleButton label="Entrar com Google" onClick={()=>signIn('google')} />
              
            </form>
          </div>
      </main>

      <Footer/>
    </div>
  )
}
