import {Router} from 'express'
import { upload } from '../middleware/uploadfile.js'
import { uploadImage } from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/:id/upload', upload.single('image'), uploadImage)

export default userRouter