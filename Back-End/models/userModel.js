import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:'string',
        required:true,
    },
    userName:{
        type:'string',
        required:true,
        unique:true
    },
    password:{
        type:'string',
        required:true,
        minlength:6
    },
    gender:{
        enum:['male','female'],
    },
    profilePicture:{
        type:'string'
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema);
export default User;