import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'

import styles from '../styles/Dashboard.module.scss'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Footer } from '../components/footer/footer';

export default function Dashboard() {
    const router = useRouter()
    const [value, setValue] = useState(new Date());
    const [session] = useSession()
    useEffect(()=> {
      if (!session) {
        router.push("/")
      }
    }, )
    
    function handleLogout() {
      router.push("/")
        signOut()
      
    }
    function onChange(nextValue) {
      setValue(nextValue);
    }

  
   
  const user = session?.user.name || ''
  console.log(session)

  return (
    <div className={styles.container}>
      <Head>
        <title>YogaApp | Dashboard</title>
        <link rel="icon" href="/lotus-yoga.svg" />
      </Head>
        <main className={styles.main}>
          <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="48" width="48"/>
          <span>YogaApp</span>
          </div>
            <div className={styles.greeting}>
              Olá, {user} <span onClick={handleLogout}>Sair</span>
            </div>

          <h1>Próximas Aulas</h1>
          <div className={styles.calendar}>
          <Calendar 
            onChange={onChange}
            value={value}
            />
          </div>

          <div className={styles.details}>
              <h3>{value.toLocaleDateString('pt-br')}</h3>
              <div className={styles.classList}>
                  <li>
                      <span>10:00</span>
                      <h4>Nathi</h4>
                      <div className={styles.actions}>
                      <button>Confirmar</button>
                      </div>
                  </li>
                  <li>
                      <span>14:00</span>
                      <h4>Yasmin</h4>
                      <div className={styles.actions}>

                      <button>Confirmar</button>
                      </div>

                  </li>
                  <li>
                      <span>16:00</span>
                      <h4>Nathi</h4>
                      <div className={styles.actions}>
                        <button className={styles.active}>Confirmado</button>
                        <button className={styles.cancel}>X</button>
                      </div>
                  </li>
                  
                
              </div>
          </div>
      </main>
    

      <Footer/>
    </div>
  )
}
