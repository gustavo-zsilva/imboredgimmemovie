import express from 'express'
import { router } from './routes'

const server = express()

server.use(express.json())
server.use(router)

server.listen(3030, () => console.log('Server open on port 3030.'))