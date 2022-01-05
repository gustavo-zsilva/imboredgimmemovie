import { extendTheme } from 'native-base'

export const theme = extendTheme({
    colors: {
        base: {
            700: '#3A3838',
            800: '#272525',
        },
        primary: '#446DF6',
        secondary: {
            100: '#F44336',
            200: '#d43c31',
        },
        white: {
            100: '#F7F4F3',
            200: '#d3d2d2',
        },
    },
    fontConfig: {
        Poppins: {
            400: 'Poppins_400Regular',
            700: 'Poppins_700Bold',
        }
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins',
        mono: 'Poppins',
    },
    components: {
        Container: {
            defaultProps: {
                safeArea: true,
                p: '20px',
                maxW: '100%',
                flex: '1',
                bg: 'base.800',
            }
        },
        Text: {
            defaultProps: {
                color: 'white.100'
            },
        },
    }
})