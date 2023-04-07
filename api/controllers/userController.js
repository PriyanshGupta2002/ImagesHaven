import User from "../models/UserModel.js"
import { createError } from "../utils/createError.js"

export const getUser=async(req,res,next)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return next(createError("404","User not found"))
        }
        const {password,...info}=user._doc
        return res.status(201).send(info)
    } catch (error) {
        next(error)
    }
}
export const followUnfollowUser=async(req,res,next)=>{
    const userId = req.params.id
    if (req.userId === userId) {
        return res.status(409).send("You cannot follow yourself")        
    }
    try {
        const toFollowUser = await User.findById(userId)
        const hasUserAlreadyFollowed = toFollowUser.followers.includes(req.userId)
        if (!hasUserAlreadyFollowed) {
            await User.findByIdAndUpdate(userId,{$push:{followers:req.userId}})
            await User.findByIdAndUpdate(req.userId,{$push:{following:userId}})
            return res.status(201).send("You have successfully followed")
        }
        await User.findByIdAndUpdate(userId,{$pull:{followers:req.userId}})
        await User.findByIdAndUpdate(req.userId,{$pull:{following:userId}})
         res.status(201).send("You have successfully unfollowed")
    } catch (error) {
        next(error)
    }
}