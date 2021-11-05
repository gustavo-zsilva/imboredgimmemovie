import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
    styles: {
        global: {
            "html, body": {
                color: "#fff",
                height: '100vh'
            }
        }
    }
})