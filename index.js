import express from 'express'
import connectDB from './client/db.js'
import 'dotenv/config'
import authRouter from './routes/authRouter.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth', authRouter)

app.get('/', (req,res) => {
    res.end('Test')
})

connectDB();

app.listen(PORT, () => {
    console.log("server is running on port 3000")
})