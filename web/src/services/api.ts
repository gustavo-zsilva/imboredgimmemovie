import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from 'nookies'

const apiKey = process.env.API_KEY
const isServerSide = typeof window === undefined

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})

if (!isServerSide) {
    api.defaults.params = {}
    api.defaults.params['api_key'] = apiKey
}

api.interceptors.request.use(config => {
    if (!isServerSide) {
        const { ['@ibgm_user_location']: rawLocation } = parseCookies()
        const { locale } = rawLocation
            ? JSON.parse(rawLocation)
            : { locale: 'us' }
        
        config.params = config.params || {}
        config.params['language'] = locale
    }

    return Promise.resolve(config)
})

