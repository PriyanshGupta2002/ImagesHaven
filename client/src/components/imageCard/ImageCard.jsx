import React from 'react'
import './imageCard.scss'
import { Link } from 'react-router-dom'
const ImageCard = ({item}) => {

  return (
    <div className='card'>
        <a href={item.image} download={true}>
            <button className='downBtn'>
                Download
            </button>
        </a>
       <Link to={`/image-detail/${item._id}`}>
       <img src={item.image} alt="" />
       </Link> 
    </div>
  )
}

export default ImageCard