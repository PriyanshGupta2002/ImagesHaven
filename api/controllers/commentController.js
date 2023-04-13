import Comment from "../models/commentModel.js"
import { createError } from "../utils/createError.js"

export const getCommentsForAPostImage=async(req,res,next)=>{
    const postImageId = req.params.id
    try {
        const comments = await Comment.find({postImageId}).sort({updatedAt:-1})
        res.status(201).send(comments)
    } catch (error) {
        next(error)
    }
}

export const createComment=async(req,res,next)=>{
    const postImageId = req.params.id
    const {body} = req
    const createComment = new Comment({...body,userId:req.userId,postImageId})
    try {
        await createComment.save()
        res.status(201).send("Comment posted successfully")
    } catch (error) {
        next(error)
    }
}

export const deleteComment=async(req,res,next)=>{
    const commentId = req.params.id
    const currentUserId = req.userId

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).send(`Comment with id ${commentId} not found `)
        }
        if (comment.userId !== currentUserId) {
            return res.status(409).send("You can only delete your comment")
        }
        await Comment.findByIdAndDelete(commentId)
        res.status(201).send("Comment deleted Successfully")
    } catch (error) {
        next(error)
    }
}

export const likeComment=async(req,res,next)=>{
    const commentId = req.params.id
    const currentUserId = req.userId
    try {
        const comment = await Comment.findById(commentId)
        const hasUserAlreadyLikedComment = comment.commentLikedBy.includes(currentUserId)
        if (!hasUserAlreadyLikedComment) {
            await Comment.findByIdAndUpdate(commentId,{$push:{commentLikedBy:currentUserId}})
            return res.status(201).send("Comment successfully liked")
        }
        await Comment.findByIdAndUpdate(commentId,{$pull:{commentLikedBy:currentUserId}})
        res.status(201).send("Comment successfully unliked")
    } catch (error) {
        next(error)
    }
}