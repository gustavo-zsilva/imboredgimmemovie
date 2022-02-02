import axios from "axios";
import { parseCookies } from 'nookies'

const { '@ibgm_user_location': rawLocation } = parseCookies()
const { locale } = rawLocation ? JSON.parse(rawLocation) : { locale: 'pt' }


const apiKey = process.env.API_KEY

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})


api.interceptors.request.use(config => {

    

    config.params = config.params || {}
    config.params['api_key'] = apiKey
    config.params['language'] = 'pt'

    return config
})
