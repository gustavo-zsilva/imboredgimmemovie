import axios from "axios";

const apiKey = process.env.API_KEY

export const api = axios.create({
    baseURL: `https://api.themoviedb.org/3`
})

api.interceptors.request.use(config => {
    config.params = config.params || {}
    config.params['api_key'] = apiKey

    return config
})
