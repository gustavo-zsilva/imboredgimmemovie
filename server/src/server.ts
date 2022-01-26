import express from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(router)

app.listen(3001, () => console.log('Server open on port 3001.'))