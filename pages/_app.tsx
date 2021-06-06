import { AppProps} from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { ChakraProvider } from "@chakra-ui/react"

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
  <NextAuthProvider session={pageProps.sessions}>
    <ChakraProvider >
    <Component {...pageProps} />
    </ChakraProvider>

  </NextAuthProvider>
  
  )
}

export default MyApp
