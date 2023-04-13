import React from 'react'
import './comments.scss'
import Comment from '../comment/Comment'
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'
const Comments = ({postImageId}) => {
  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["comments",postImageId],
    queryFn: () => newRequest.get(`comment/${postImageId}`),
  });
  const commentData = data?.data
 
  return (
    <div className='comments'>
        {isLoading ?"Loading...":isError?"Something went wrong! Please try again":commentData?.length<=0?<span className='noComment'>No Comments Yet!</span>:commentData.map((comment)=>(
          <Comment key={comment._id} item={comment}/>
        ))}
        </div>
    
  )
}

export default Comments