import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import {authRoute,userRoute,imageRoute,commentRoute} from './routes/index.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello from backend")
})
mongoose.set('strictQuery',true)
const connect=async()=>{
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log("Successfully Connected")
  } catch (error) {
    console.log(error);
}
}
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/image',imageRoute)
app.use('/api/comment',commentRoute)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).send(errorMessage)
  })
app.listen(PORT,()=>{
    connect()
    console.log("Server started")
})