import React, { useRef, useState } from 'react'
import './addComment.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const AddComment = ({postImageId}) => {
    const commentMessageRef = useRef()
    const queryClient = useQueryClient()
    const [commenting, setCommenting] = useState(false)

    const mutation = useMutation({
      mutationFn: (comment) => {
        return newRequest.post(`comment/create-comment/${postImageId}`,{comment})
      },
      onSuccess:()=>{queryClient.invalidateQueries(['comments'])}
    })
  
    const handleCommentSubmit=(e)=>{
      setCommenting(true)
      e.preventDefault();
      mutation.mutate(commentMessageRef.current.value)
      commentMessageRef.current.value=""
      setCommenting(false)
    }

  return (
    <form className='add' onSubmit={handleCommentSubmit}>
        <input type="text" placeholder='Your comment here...'  ref={commentMessageRef} />
        <button className={`${commenting?"commenting btn":"btn"}`} type='submit' >
            {commenting?"Commenting...":"Comment"}
        </button>
    </form>
  )
}

export default AddComment