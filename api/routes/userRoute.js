import express from 'express'
import { followUnfollowUser, getUser } from '../controllers/userController.js'
import { verifyToken } from '../middleware/jwt.js'
const router = express.Router()
router.get('/:id',verifyToken,getUser)
router.put('/follow/:id',verifyToken,followUnfollowUser)
export default router