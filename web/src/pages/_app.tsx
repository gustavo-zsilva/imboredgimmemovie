import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '../contexts/AuthContext'
import { ConfigProvider } from '../contexts/ConfigContext'
import { theme } from '../styles/global'

// Fix useLayoutEffect on SSR warning
if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
        <ConfigProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </ConfigProvider>
      </AuthProvider>
  )
}

export default MyApp
