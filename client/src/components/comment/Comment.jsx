import React,{useState,useEffect} from 'react'
import './comment.scss'
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { Link } from 'react-router-dom'
import { giveCurrentUser } from '../../utils/currentUser'
import {MdDelete} from 'react-icons/md'
import { AiOutlineHeart,AiTwotoneHeart } from 'react-icons/ai'
const Comment = ({item}) => {
  const [userHasLiked, setUserHasLiked] = useState(false)
  const currentUser = giveCurrentUser()
  const queryClient = useQueryClient()
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: [item?.userId],
    queryFn: () => newRequest.get(`user/${item?.userId}`),
  });


  useEffect(() => {
    if(item?.commentLikedBy?.includes(currentUser?._id)){
    
      setUserHasLiked(true)
    }else{
    
      setUserHasLiked(false)
    }
  }, [item?.commentLikedBy,currentUser._id])



  const timeAgo = moment(item?.updatedAt).fromNow()
  const user = userData?.data
  
  const mutation = useMutation({
    mutationFn: (commentId) => {
      return newRequest.delete(`comment/delete-comment/${commentId}`)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['comments'])}
  })

  const handleDelete=(commentId)=>{
    mutation.mutate(commentId)
  }


  const likeMutation = useMutation({
    mutationFn: (commentId) => {
      return newRequest.put(`comment/like-dislike/${commentId}`)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['comments'])}
  })


  const handleLike=(id)=>{
    likeMutation.mutate(id)
  }
 
  return (
    <div className='comment'>

     { userLoading?"Loading...":userError?"Something went wrong":<div className="user">
        <img src={user?.pp || '/img/noavatar.png'} alt={user?.username} />
        <div className="timeUser">
        <Link to={`/profile/${user?._id}`} className='link'><span className='name'>{user?.username}</span></Link> 
        <span className='time'>{timeAgo}</span>
        </div>
        {currentUser._id===item?.userId && <MdDelete className='delete' onClick={()=>handleDelete(item._id)} />}
       </div>}

       <p>{item?.comment}</p>
       <div className="likedBy">
            <span>{item?.commentLikedBy?.length}</span>
            {userHasLiked?<AiTwotoneHeart className="heart" color="red" onClick={()=>handleLike(item._id)}/>:<AiOutlineHeart className="heart" onClick={()=>handleLike(item._id)} />}
          </div>
    </div>
  )
}

export default Comment