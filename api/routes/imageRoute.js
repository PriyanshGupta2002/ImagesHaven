import express from 'express'
import { verifyToken } from '../middleware/jwt.js'
import { createPostImage, getAllPosts, getImageDetails, likeDislikePost } from '../controllers/imageControllers.js'
const router = express.Router()

// router.post()
router.post('/create-post-image',verifyToken,createPostImage)
router.get('/getImagePosts',verifyToken,getAllPosts)
router.get('/:id',verifyToken,getImageDetails)
router.put('/like-dislike/:id',verifyToken,likeDislikePost)
export default router