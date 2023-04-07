import express from 'express'
import { createComment, deleteComment, getCommentsForAPostImage, likeComment } from '../controllers/commentController.js'
import { verifyToken } from '../middleware/jwt.js'
const router = express.Router()
router.get('/:id',verifyToken,getCommentsForAPostImage)
router.post('/create-comment/:id',verifyToken,createComment)
router.delete('/delete-comment/:id',verifyToken,deleteComment)
router.put('/like-dislike/:id',verifyToken,likeComment)
export default router
