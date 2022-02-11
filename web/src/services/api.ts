import axios from "axios";
import { parseCookies } from 'nookies'

const apiKey = process.env.API_KEY

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})

api.interceptors.request.use((config) => {
    return config
})

if (typeof window !== undefined) {

    const { ['@ibgm_user_location']: rawLocation } = parseCookies()
    const { locale } = rawLocation
    ? JSON.parse(rawLocation)
    : { locale: 'us' }


    api.defaults.params = {}
    api.defaults.params['api_key'] = apiKey
    api.defaults.params['language'] = locale
}
