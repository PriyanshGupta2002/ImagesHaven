import React from 'react'
import './comment.scss'
import moment from 'moment'
const Comment = ({item}) => {
    const {username,timestamp,userId,userComment,pp} = item
    const timeAgo = moment(timestamp).fromNow()
  return (
    <div className='comment'>

       <div className="user">
        <img src={pp} alt={username} />
        <div className="timeUser">
        <span className='name'>{username}</span>
        <span className='time'>{timeAgo}</span>
        </div>
       </div>

       <p>{userComment}</p>
    </div>
  )
}

export default Comment