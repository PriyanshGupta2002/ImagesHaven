import mongoose from "mongoose";
const {Schema} = mongoose
const imageSchema=new Schema({
    title:{
        type:"String",
        required:true
    },
    desc:{
        type:"String",
        required:true
    },
    tags:[String],
    image:{
        type:"String",
        required:true
    },
    likedBy: {
        type: [String],
        default: [],
      },
    userId:{
        type:"String",
        required:true
    },
    cat:{
        type:"String",
        required:true
    }
},{timestamps:true})

export default mongoose.model('imageModel',imageSchema)