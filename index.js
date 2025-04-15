import express from 'express'
import connectDB from './database/db.js'
import 'dotenv/config'
import authRouter from './routes/authRouter.js'
import cors from 'cors'
import eventsRouter from './routes/events.js'
import servicesRouter from './routes/services.js'
import userRouter from './routes/users.js'
import path from 'path'
import fs from 'fs'

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/images', express.static('public/images'))

app.use('/api/auth', authRouter, eventsRouter, servicesRouter, userRouter)

app.get('/', (req,res) => {
    res.send('Welcome to my event API')
})

app.get('public/images/:filename', (req, res) => {
    const file = `public/images/${req.params.filename}`
    res.sendFile(path.resolve(file))
})

app.get('/images', (req, res) => {
    fs.readdir('public/images', (err, files) => {
    if (err) {
        return res.status(500).send({ error: err })
    }
    res.send({ images: files })
    })
})

connectDB()

app.listen(PORT, () => {
    console.log('server is running on port 3000')
})