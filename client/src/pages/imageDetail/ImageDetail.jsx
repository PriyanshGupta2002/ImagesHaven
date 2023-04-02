import React, { useEffect, useState } from 'react'
import './imageDetail.scss'
import { useParams } from 'react-router-dom'
import { imagesArray } from '../../constants/images'
import {AiFillTags} from 'react-icons/ai'
const ImageDetail = () => {
  const[detail,setDetail]=useState({})
  const{id}  = useParams()
  useEffect(() => {
    setDetail(imagesArray.find((wall)=>wall.id.toString()===id))
  }, [id])
  return (
    <div className='detail'>
      <div className="container">
          <div className="left">
            <img src={detail?.image} alt="" />
          </div>
          <div className="right">
            <div className="owner">
            <h1 >{detail?.title}</h1>
            <span >By-{detail?.owner}</span>
            </div>
            <div className="tags">
                  <span>Tags <AiFillTags/></span>
                  <div className="tagGrp">
                    {detail?.tags?.map((tag,idx)=>(
                      <span className="tag" key={idx}>
                        {tag}
                      </span>
                    ))}
                  </div>
            </div>
{/* 
            <span className='cat'>
              {detail.category}
            </span> */}

            <p>
              {detail?.description}
            </p>


          </div>
      </div>
    </div>
  )
}

export default ImageDetail