import { AppProps} from 'next/app'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { ChakraProvider } from "@chakra-ui/react"
// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc
const styles = {
  global: {
    "html, body": {
      "-webkit-user-select": "none"
    }
  },
}

const theme = extendTheme({ styles })

// 3. Pass the `theme` prop to the `ChakraProvider`
  
function MyApp({ Component, pageProps }: AppProps) {
  
  return (
  <NextAuthProvider session={pageProps.sessions}>
    <ChakraProvider theme={theme} >
    <Component {...pageProps} />
    </ChakraProvider>

  </NextAuthProvider>
  
  )
}

export default MyApp
