import mongoose from "mongoose"
const userSchema=new mongoose.Schema({
    userId:{
        type: String,
        required:true,
        unique:true,
    },
    fullname:{
        type:String,
    },
    phone:{
        type:String,
    },
    aadhaarNumber:{
        type:String,
    },
    gender:{
        type:String,
    },
    dob:{
        type:String,
    },
    isUserVerified:{ 
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const User= mongoose.model("User",userSchema);
export  default User;