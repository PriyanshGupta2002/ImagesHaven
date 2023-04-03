import React from 'react'
import './comments.scss'
import { commentData } from '../../constants/commentData'
import Comment from '../comment/Comment'
const Comments = () => {
  return (
    <div className='comments'>
        {commentData.map((comment)=>(
          <Comment key={comment.userId} item={comment}/>
        ))}
    </div>
  )
}

export default Comments