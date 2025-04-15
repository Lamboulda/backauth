import { Router } from 'express'
import { createUser, loginUser } from '../controllers/authController.js'
import { upload } from '../middleware/uploadfile.js'

const authRouter = Router()

authRouter.post(`/register`,upload.single('image'), createUser)
authRouter.post('/login', loginUser)

export default authRouter