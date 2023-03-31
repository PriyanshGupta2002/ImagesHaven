import React, {useState } from 'react'
import { wallpapers } from '../../constants/categories'
import './sidebar.scss'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  const [category, setCategory] = useState("")
  return (
    <div className='sidebar hide-scrollbar'>
      <div className="container">
        <h1>Categories</h1>
        <div className="catItems">
          {wallpapers.map((wall)=>(
            <Link key={wall.id}  to={`/?cat=${wall.category}`} className='link'>
            <div className={`item ${category===wall.category?'active':""}`} onClick={()=>setCategory(wall.category)}  >
              <img src={wall.image} alt=""/>
              <span >{wall.category}</span>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar