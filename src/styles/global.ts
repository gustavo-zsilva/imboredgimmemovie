import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    styles: {
        global: {
            "body": {
                color: "#fff",
                height: '100vh',
                maxWidth: '80rem',
                margin: 'auto',
                background: 'purple.700',
            }
        }
    }
})