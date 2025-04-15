import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    first_name : {
        type : String,
        required : true,
    },
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    image :{
        type : String,
        required : true,
        default : ''
    }
})

export default mongoose.model('User', userSchema)