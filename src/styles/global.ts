import { extendTheme } from "@chakra-ui/react"

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