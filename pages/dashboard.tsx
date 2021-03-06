import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';
import Head from 'next/head'
import { signOut, useSession } from 'next-auth/client'
import { Box, Img, HStack, Grid, GridItem, Flex, Spacer, Button, Badge, Text, Heading, VStack} from '@chakra-ui/react'
import Calendar from 'react-calendar';
import { query as q, Space } from 'faunadb'
import { fauna as faunaClient } from '../services/fauna'


// import styles from '../styles/Dashboard.module.scss'
import 'react-calendar/dist/Calendar.css';
import { Footer } from '../components/footer/footer';

import { api } from '../services/api';
import { AdminPanel } from '../components/admin/adminPanel';

interface Class {
  title: String;
}

export default  function Dashboard({aulas}){
  const router = useRouter()
  const [value, setValue] = useState(new Date());
  // const [classes, setClasses] = useState([]);
  const [session] = useSession()
  
  useEffect(()=> {
      if (!session) {
        router.push("/")
      }
    }, )
     
    // function handleLogout() {
    //   router.push("/")
    //     signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/dashboard' })
      
    //}
    function onChange(nextValue) {
      setValue(nextValue);
    }

  
    const user = session?.user.name || 'User'
  return (
    <Flex sx={{"-webkit-user-select": "none"}} bg="#F4CCCC" direction="column" minH="100vh "  justify="space-between" >
      <Head>
      <title>YogaApp | Dashboard</title>

      </Head>
          <Flex py="1" alignContent="center" bg="#DCC6EA" px={["0","4", "8", "16", "32"]} >
          <HStack px={["1","2"]} borderRadius="8" >
          <Img borderRadius="full" src="/lotus-yoga.svg" alt="lotus-flower" h="12" w="12"/>
          <Text display={["none", "block"]} >YogaApp</Text>
          </HStack>
          <Spacer />
          <Spacer />
            <HStack p="1" borderRadius="8" bg="gray.100">
              <VStack>

          <Badge h="2">{session?.user.role}</Badge>
               <Img borderRadius="full" h="9" w="9" src={session?.user.image || "/lotus-yoga.svg"}/>
              </VStack>
             <div>
               Ol??, {user} <Button size="xs" colorScheme="red" onClick={()=>{        signOut({ callbackUrl: 'https://yoga-app.vogelcodes.com/' })
}}>Sair</Button>
               </div>

            </HStack>
            </Flex>
        <Flex px={["4", "8", "16", "32"]} direction="column" mx="auto"  alignContent="start" flex="1">

          {
          !session ? <Badge>Loading</Badge>: 
          session?.user.role == "member" ?
            <Box>

          <Heading py="3" mx="auto" color="#58012C">Aulas Marcadas</Heading>
          <Text alignSelf="center">N??o h?? aulas marcadas</Text>
          <Heading py="3" mx="auto" color="#58012C">Aulas Dispon??veis</Heading>

          <div >
              <Grid templateColumns={["1fr","1fr","repeat(2, 1fr)","repeat(3, 1fr)"]} >
              {aulas ? (
                aulas.map((d) => (
                  
                  <GridItem
                  borderRadius="8"
                  m="1"
                  bg="#EEE"
                  p="3"
                  key={d.id}
                  id={d.id}
                  >
                <Flex direction="column" flex="1" justifyContent="space-between">
                <HStack pl="1">
                <Text fontWeight="700" textTransform="capitalize">
                  {/* {d.weekday} */}
                  {new Date(d.date).toLocaleDateString( 'pt-br', { weekday: 'long'})}
                </Text>
                <Text>
                  {new Date(d.date).toLocaleString( 'pt-br', {day: '2-digit'})}/{new Date(d.date).toLocaleString( 'pt-br', {month: '2-digit'})}
                </Text>
                <Text>
                  {new Date(d.date).toLocaleTimeString( 'pt-br', {hour: '2-digit'})}h
                </Text>
                
                </HStack>
                <HStack>
                  <Badge>Pr??tica:</Badge>
                <Text>
                  {d.title}
                </Text>
                  <Badge>Instrutor:</Badge>
                <Text>
                {d.instructor}
                </Text>
                </HStack>
                <Flex direction="column">
                <Text>
                  <Badge>Descri????o:</Badge>
                  {d.description}
                </Text>
                
                <Text>
                  <Badge>Dura????o:</Badge>
                {d.duration} minutos

                </Text>
                </Flex>
                

<Flex pt="2">
{/* <Badge color="gray.50" bg="green.400" >Confirmado</Badge> */}
<Spacer/>
<Button size="xs" colorScheme="green" >Confirmar</Button>
</Flex>          
</Flex>
                </GridItem>
                
                ))
                ) : (
                  <>
          </>
        )}
        
                  
                
              </Grid>
          </div>
    
        </Box> : session?.user.role == "admin" ? <AdminPanel /> : <Text>Ooops, parece que voc?? n??o ?? assinante. Assine j??!</Text>}
      </Flex>
    

    </Flex>
  )
}
export async function getServerSideProps() {
  const query: any = await faunaClient.query(q.Call(q.Function("get_week_classes")))
  const classes: [] = query.data;
  // console.log(JSON.stringify(classes));
   
  const aulas = classes.map((aula: any) => {
    return {
      description: aula.data.description,
      id: aula.ref.id,
      title: aula.data.title,
      instructor: aula.data.instructor,
      duration: aula.data.duration,
      date: new Date (aula.data.date).toISOString(),
      weekday: new Date(aula.data.date).toLocaleDateString( 'pt-BR', { weekday: 'long'})
    };
  }); 
  return {
    props: {
      aulas
    }
  }
}
