import mongoose from "mongoose";
const {Schema} = mongoose
const commentSchema = new Schema({
    userId:{
        type:"String",
        required:true
    },
    postImageId:{
        type:"String",
        required:true
    },
    comment:{
        type:"String",
        required:true
    },
    commentLikedBy:{
        type:[String],
        default:[]
    }
},{timestamps:true})
export default mongoose.model('comments',commentSchema)