import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
    sm: '200px',
    md: '780px',
    lg: '1000px',
    xl: '1300px',
})

export const theme = extendTheme({
    colors: {
        primary: {
            100: '#446DF6',
            200: '#F7F4F3',
            300: '#DFDFDF',
            400: '#F44336',
        },
        dark: {
            100: '#312F2F',
            200: '#3a3838',
            300: '#606060',
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
                background: 'dark.100',
            },
            "::-webkit-scrollbar": {
                width: '8px'
            },
            "::-webkit-scrollbar-track": {
                width: '10px',
                background: '#282728'
            },
            "::-webkit-scrollbar-thumb": {
                background: '#696869',
                borderRadius: '24px',
            }
        }
    },
    components: {
        Tooltip: {
            baseStyle: {
                bg: 'dark.200',
                color: 'primary.200',
            }
        },
    },
    breakpoints,
})
