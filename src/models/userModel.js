import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {

        username:{
            type:String,
            required:[true,"provide a username"],
            unique:true,

        },
        email:{
            type:String,
            required:[true,"provide a email"],
            unique:true
        },
        password:{
            type:String,
            required:[true,"provide a password"],
            minlength:6
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        isAdmin:{   
            type:Boolean,
            default:false
        },

        forgotPasswordToken:String,
        forgotPasswordExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,
    }
)

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User
