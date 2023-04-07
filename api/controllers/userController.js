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