import {
    Center,
    FormControl,
    FormLabel,
    Input,
    Radio,
    RadioGroup,
    Stack,
    FormErrorMessage,
    FormHelperText,
    Button,
    useToast,  
    HStack
  } from "@chakra-ui/react"
  

export default function Admin() {
  const toast = useToast()
  
    return (
        <Center>
        <FormControl alignSelf="center"  maxWidth="800" id="title">
  <FormLabel>Cadastro de Aulas</FormLabel>
  <FormLabel>Título</FormLabel>
  <Input />
  <HStack>

  <FormLabel>Data</FormLabel>
  <Input type="date" />
  <FormLabel>Hora</FormLabel>
  <Input type="time" />
  </HStack>
  <FormLabel>Duração</FormLabel>
  <Input type="number" />
  <FormLabel>Instrutor</FormLabel>
  <RadioGroup defaultValue="2">
  <Stack spacing={5} direction="row">
    <Radio colorScheme="green" value="1">
      Nathi
    </Radio>
    <Radio colorScheme="green" value="2">
      Yasmin
    </Radio>
  </Stack>
  <Button mt="2" colorScheme="green"
    onClick={() =>
      toast({
        title: "Aula Cadastrada",
        description: "A aula foi agendada no Zoom",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    >Cadastrar Aula</Button>
 
</RadioGroup>

</FormControl>
      </Center>
    )
}