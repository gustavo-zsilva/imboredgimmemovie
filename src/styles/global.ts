import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    colors: {
        primary: {
            100: '#A6D9F7',
            200: '#84DCCF',
            300: '#F7F4F3',
            400: '#F24333',
            500: '#BA1B1D',
            600: '#DFDFDF',
            700: '#446DF6',
            800: '#4DAA57'
        },
        dark: {
            100: '#312F2F',
            200: '#312F2F',
        },
        secondary: {
            100: '#BF98A0',
            200: '#BCCCE0',
        }
    },
    styles: {
        global: {
            "body": {
                color: "primary.300",
                fontFamily: 'Poppins',
                height: '100vh',
                maxWidth: '80rem',
                margin: 'auto',
                background: '#312F2F',
            }
        }
    }
})