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
            50: '#f9f0f0',
            100: '#dad8d8',
            200: '#bfbfbf',
            300: '#a5a5a5',
            400: '#8b8b8b',
            500: '#717171',
            600: '#525050',
            700: '#3A3838',
            800: '#312F2F',
            900: '#130a0a',
        },
        secondary: {
            100: '#da5cd8',
            200: '#ff62a5',
            300: '#ff8e75',
            400: '#ffc55b',
            500: '#f9f871',
        },
    },
    styles: {
        global: {
            "body": {
                color: "primary.300",
                fontFamily: 'Poppins',
                height: '100vh',
                maxWidth: '80rem',
                margin: 'auto',
                background: 'dark.800',
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
                bg: 'dark.700',
                color: 'primary.200',
            }
        },
    },
    breakpoints,
})
