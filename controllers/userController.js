import User from "../models/user.js"

export const getUserProfile = async(req,res) => {
    const {id}= req.user
    try {
        const userByID = await User.findById(id).select ('-password')
        if(!userByID){
            return res.status(404).json({message: 'User not found'})
        }
        return res.status(200).json(userByID)
    } catch (err) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

export const uploadImage = async (req, res) => {
    const {id}= req.user
    const profileImage = req.file.path
    try{
        const user = await User.findByIdAndUpdate(id, {image: profileImage}, {new : true}).select ('-password')

    if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({
        message: 'Image uploaded',
        user,
      })
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error })
    }
}