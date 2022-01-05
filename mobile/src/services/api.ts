import axios from 'axios'
// console.log(API_KEY)

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

api.interceptors.request.use((config) => {
    config.params = config.params || {}
    config.params['api_key'] = 'ea9879b2a79093a6ce0ac0ed556d0c61'

    return config
})