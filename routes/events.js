import { Router } from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'

const eventsRouter = Router()

eventsRouter.get('/events', authMiddleware, (req,res) => {
    console.log(req.user)
    res.send('Welcome to my events')
})

export default eventsRouter