import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../lib/queryClient'
import { AuthProvider } from '../contexts/AuthContext'
import { ConfigProvider } from '../contexts/ConfigContext'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/global'

// Fix useLayoutEffect on SSR warning
if (typeof document === 'undefined') {
    React.useLayoutEffect = React.useEffect;
}

function MyApp({ Component, pageProps }) {
  return (
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <AuthProvider>
            <ConfigProvider>
                <ChakraProvider theme={theme}>
                    <Component {...pageProps} />
                </ChakraProvider>
            </ConfigProvider>
        </AuthProvider>
      </QueryClientProvider>
  )
}

export default MyApp
