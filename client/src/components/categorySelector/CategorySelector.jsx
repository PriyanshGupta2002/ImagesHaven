import React, { useEffect, useState } from 'react'
import './categorySelector.scss'
import { wallpapers } from '../../constants/categories'
import { Link, useLocation } from 'react-router-dom'

const CategorySelector = () => {
    const [category, setCategory] = useState("")
    const {search} = useLocation()
    
    useEffect(() => {
     if (!search) {
        setCategory("")
     }
     setCategory(search.substring(5))
    }, [search])
    
  return (
    <div className='selector'>
        <div className="container hide-scrollbar">
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
  )
}

export default CategorySelector