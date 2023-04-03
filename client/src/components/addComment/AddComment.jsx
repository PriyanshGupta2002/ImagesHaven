import React from 'react'
import './addComment.scss'
const AddComment = () => {
  return (
    <div className='add'>
        <input type="text" placeholder='Your comment here...'/>
        <buttton className="btn">
            Comment
        </buttton>
    </div>
  )
}

export default AddComment