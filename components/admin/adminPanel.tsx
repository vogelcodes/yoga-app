import { Box } from "@chakra-ui/layout";
import { useState, useEffect } from "react";
import {
    Img,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

import { api } from '../../services/api';


export function AdminPanel(){
    const [users, setUsers] = useState([])
    const [classes, setClasses] = useState([])
    useEffect(()=> {

      const fetchData = async ()=>{
          const getUsers = await api.get("/users")
          const getClasses = await api.get("/classes")
          setUsers(getUsers.data);
          setClasses(getClasses.data);
          console.log(users,classes)
        }
        fetchData();
    }, [])
        
    return (
        <Box>
            <Heading py="3" mx="auto" color="#58012C">Usuários</Heading>
        <Table>
            <Thead>
            <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Perfil</Th>
                </Tr>
            </Thead>
            <Tbody>

            {users.map(user=><Tr key={user.id}>
                <Td maxWidth={ ["16", "28", "36" ]}><Text isTruncated>{user.name}</Text></Td>
                <Td><Text maxWidth="20" isTruncated>{user.email}</Text></Td>
                <Td>{user.role}</Td>
                
                </Tr>)}
            </Tbody>

        </Table>
            <Heading py="3" mx="auto" color="#58012C">Aulas</Heading>
        <Table>
            <Thead>
            <Tr>
                <Th>Prática</Th>
                <Th>Instrutor</Th>
                <Th>Data</Th>
                <Th>Duração</Th>
                </Tr>
            </Thead>
            <Tbody>

            {classes.map(aula=><Tr key={aula.id}>
                <Td>{aula.title}</Td>
                <Td>{aula.instructor}</Td>
                <Td>{aula.date}</Td>
                <Td>{aula.duration}</Td>
                
                </Tr>)}
            </Tbody>

        </Table>
        </Box>
        
    )
}