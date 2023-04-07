import User from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { hashPass, verifyHashPassword } from "../utils/authUtils.js"
import { createError } from "../utils/createError.js"
dotenv.config()
export const register=async(req,res,next)=>{
    const {body}=req
    const hashP = hashPass(body.password)
    const user = new User({...body,password:hashP})
    try {
        const createdUser = await user.save()
        res.status(201).send(createdUser)
    } catch (error) {
        next(error)
    }
}
export const login=async(req,res,next)=>{
    const {body}=req
    try {
        const user = await User.findOne({username:body.username})
        if(!user){
            return next(createError("404","User Not Found"))
        }
        const isPassGenuine = verifyHashPassword(body.password,user.password)
        if(!isPassGenuine){
            return next(createError("402","Invalid Credentials"))
        }
        const token = jwt.sign({
            id:user._id,
            email:user.email
        },process.env.JWT_KEY)
        const{password,...info}=user._doc
        return res.cookie("accessToken",token,{httpOnly:true}).status(201).json(info)

    } catch (error) {
        next(error)
    }
}

export const logout=async(req,res)=>{
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true
    }).status(200).send("User has been logged out")
}