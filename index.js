import express from 'express'
import connectDB from './client/db.js'
import 'dotenv/config'
import authRouter from './routes/authRouter.js'
import cors from 'cors'
import eventsRouter from './routes/events.js'
import servicesRouter from './routes/services.js'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth', authRouter, eventsRouter, servicesRouter)

app.get('/', (req,res) => {
    res.send('Welcome to my event API')
})

connectDB()

app.listen(PORT, () => {
    console.log('server is running on port 3000')
})