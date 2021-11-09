import axios from "axios";

const apiKey = process.env.API_KEY

export const api = axios.create({
    baseURL: `http://www.omdbapi.com`
})

api.interceptors.request.use(config => {
    config.params['apikey'] = apiKey

    return Promise.resolve(config)
})