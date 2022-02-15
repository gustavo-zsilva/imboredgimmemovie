import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../contexts/AuthContext'
import { theme } from '../styles/global'

// Fix useLayoutEffect on SSR warning
if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
  )
}

export default MyApp
