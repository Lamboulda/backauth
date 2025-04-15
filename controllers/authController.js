import User from "../models/user.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {
    console.log(req.body)
    const {first_name, last_name, email, password} = req.body
    try{
        if (!req.file) {
            return res.status(400).json({ message: 'Aucune image uploadée' });
        }
        // We search in our DB where the email could match the req.body.email (the email given by the user)
        const emailVerification = await User.findOne({email})
        if(emailVerification){
            return res.status(409).json(`Email already taken`)
        }
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        console.log(req.file)

        const newUser = await new User({
            first_name,
            last_name,
            email,
            password : hashedPassword,
            image : '/images/' + req.file.filename
        })

        await newUser.save()
        return res.status(201).json(`Welcome to our event manager ${first_name}`)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const loginUser = async  (req, res) => {
    // We destructured the req.body form
    const {email, password} = req.body
    try{
        // We search in the DB where the user email match the email provided by req.body.email
        const user = await User.findOne({email})
        // console.log(req.body)
        if(!user){
            return res.status(404).json(`Email or password invalid`)
        }
        // We compare the password hash value given by the req.body.password with the user.password hashed value 
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json(`Email or password invalid`)
        }

        const token = await jwt.sign({id : user._id}, JWT_SECRET)
        return res.status(200).json({message: `Welcome ${user.first_name}`,token})
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}