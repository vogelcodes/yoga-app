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
        signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })
      
    }
    function onChange(nextValue) {
      setValue(nextValue);
    }

  
   
  const user = session?.user.name || ''

  return (
    <div className={styles.container}>
      <Head>
        <title>YogaApp | Dashboard</title>
        <link rel="icon" href="/lotus-yoga.svg" />
      </Head>
        <main className={styles.main}>
          <div className={styles.header}>
          <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="48" width="48"/>
          <span>YogaApp</span>
          </div>
            <div className={styles.greeting}>
             <div>
               Olá, {user} <span onClick={()=>{        signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/' })
}}>Sair</span>
               </div>
            <img className={styles.avatar} height="36px" width="36px" src={session?.user.image}></img>
            </div>
            </div>

          <h1>Próximas Aulas</h1>
          <div className={styles.calendar}>
          <Calendar 
            onChange={onChange}
            value={value}
            />
          </div>

          <div className={styles.details}>
              <h3>{}{value.toLocaleString('pt-br', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
              <table className={styles.classList}>
                  <tr>
                      <td>10:00</td>
                      <td>Nathi</td>
                      <td>

                      <div>Confirmar</div>
                      </td>
                  </tr>
                  <tr>
                      <td>14:00</td>
                      <td>Yasmin</td>
                      <td>


                      <div>Confirmar</div>
                      </td>

                  </tr    >
                  <tr   >
                      <td>16:00</td>
                      <td>Nathi</td>
                      <td>

                        <div className={styles.active}>Confirmado</div>
                      </td>
                      <td>
                        <div className={styles.cancel}>X</div>
                      </td>
                  </tr    >
                  
                
              </table>
          </div>
      </main>
    

      <Footer/>
    </div>
  )
}
