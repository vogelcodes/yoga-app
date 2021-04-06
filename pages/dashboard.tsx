import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'

import styles from '../styles/Dashboard.module.scss'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Footer } from '../components/footer/footer';
import { api } from '../services/api';

interface Class {
  title: String;
}

export default function Dashboard() {
    const router = useRouter()
    const [value, setValue] = useState(new Date());
    const [classes, setClasses] = useState([]);
    const [session] = useSession()
    // useEffect(()=> {
    //   if (!session) {
    //     router.push("/")
    //   }
    // }, )
     useEffect( ()=>{
      const res = api.get('/classes')
      console.log(res)
    },)
    function handleLogout() {
      router.push("/")
        signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })
      
    }
    function onChange(nextValue) {
      setValue(nextValue);
    }

  
   
  const user = session?.user.name || 'User'

  return (
    <div className={styles.container}>
      <Head>
        <title>YogaApp | Dashboard</title>
        <link rel="icon" href="/lotus-yoga.svg" />
      </Head>
          <div  className={styles.header}>
          <div className={styles.logo}>
          <img src="/lotus-yoga.svg" alt="lotus-flower" height="48" width="48"/>
          <span>YogaApp</span>
          </div>
            <div className={styles.greeting}>
             <div>
               Olá, {user} <span onClick={()=>{        signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/' })
}}>Sair</span>
               </div>
            <img className={styles.avatar} height="36px" width="36px" src={session?.user.image || "/lotus-yoga.svg"}></img>
            </div>
            </div>
        <main className={styles.main}>

          <h1>Próximas Aulas</h1>
          {/* <div className={styles.calendar}>
          <Calendar 
            onChange={onChange}
            value={value}
            />
          </div> */}

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
