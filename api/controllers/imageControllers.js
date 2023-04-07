import Image from "../models/ImagesModel.js"
import { createError } from "../utils/createError.js"
export const createPostImage=async(req,res,next)=>{
    const {body} = req
    const image = new Image({...body,userId:req.userId})
    try {
        const savedImage = await image.save()
        res.status(201).send(savedImage)
    } catch (error) {
        next(error)
    }
}

export const getAllPosts=async(req,res,next)=>{
    const q = req.query
    const filters={
        ...(q.cat && {cat:q.cat}),
        ...(q.search && {title:{$regex:q.search,$options:"i"}})
    }
    try {
        const imagePosts = await Image.find(filters).sort({updatedAt:-1})
        res.status(201).send(imagePosts)
    } catch (error) {
        next(error)
    }
}
export const getImageDetails=async(req,res,next)=>{
    const imgId = req.params.id
    try {
        const getImg = await Image.findById(imgId)
        if (!getImg) {
           return next(createError("404","No image found with the given id"))
        }
        res.status(201).send(getImg)
    } catch (error) {
        next(error)
    }
}

export const likeDislikePost=async(req,res,next)=>{
    const imgId = req.params.id
    try {
        const postImage = await Image.findById(imgId)
        if(!postImage.likedBy.includes(req.userId)){
            await Image.findByIdAndUpdate(imgId,{$push:{likedBy:req.userId}})
            res.status(201).send("Post Liked Successfully")
        }else{
            await Image.findByIdAndUpdate(imgId,{$pull:{likedBy:req.userId}})
            res.staus(201).send("Post Disliked Successfully")
        }
    } catch (error) {
        next(error)
    }
}
