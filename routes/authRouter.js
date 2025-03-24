import { Router } from "express"
import bcrypt from 'bcryptjs'
import User from "../models/user.js"
import jwt from 'jsonwebtoken'

const authRouter = Router()

authRouter.post('/register', async (req,res) => {
    const {first_name, last_name, email, password} = req.body

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({email})
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    try {

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt)
            const newUser = new User({
                first_name,
                last_name,
                email,
                password : hashedPassword
            })
            newUser.save()
            return res.status(201).json({message :'user added'})
    }
    catch(err){
        return res.status(400).json({message: 'Internal server error'})
    }
})

authRouter.post('/login', async (req,res) => {
    const {email, password} = req.body
    try {
            const user= await User.findOne({email})
            if (!user) {
              return res.status(409).json({ message: 'Email or password incorrect' });
            }
            const comparePassword= await bcrypt.compare(password, user.password)
            if (!comparePassword) {
              return res.status(409).json({ message: 'Email or password incorrect' });
            }
            const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET)
            return res.status(200).json({message: 'connected successfully', token})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({message: 'Internal server error'})
    }
})

export default authRouter