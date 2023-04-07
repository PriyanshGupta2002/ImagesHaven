import { createError } from "../utils/createError.js"
import jwt from 'jsonwebtoken'
export const verifyToken=(req,res,next)=>{
    const token = req.cookies.accessToken
    if (!token) {
       return res.status(401).send("User not authenticated")
    }
    jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if (err) {
            return next(createError("402",err))
        }
        req.userId = payload.id
        req.email = payload.email
        next()
    })
    
}