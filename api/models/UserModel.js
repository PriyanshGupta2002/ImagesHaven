import mongoose from "mongoose";
const {Schema} = mongoose
const userSchema = new Schema({
    username:{
        type:"String",
        required:true,
        unique:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    pp:{
        type:"String",
        required:false
    },
    desc:{
        type:"String",
        required:false
        
    },
    tags:[String],
    address:{
        type:"String",
        required:true
    }
},{timestamps:true})

export default mongoose.model('user',userSchema)