import express from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(3030, () => console.log('Server open on port 3030.'))