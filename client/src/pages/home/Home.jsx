import React, { useEffect, useState } from 'react'
import './home.scss'
import { imagesArray } from '../../constants/images'
import { useLocation } from 'react-router-dom'
import CategorySelector from '../../components/categorySelector/CategorySelector'
import MasonaryLayout from '../../components/masonaryLayout/MasonaryLayout'
const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat'); 
  const [images, setImages] = useState([])
  useEffect(() => {
    if (!cat) {
      setImages(imagesArray)
    }else{
      setImages(imagesArray.filter((img)=>img.category===cat))
    }
  }, [cat])

  if (!images) {
    return "Loading..."
  }
  
  return (
    <div className='home'>
      <CategorySelector/>
      <div className="container">
<MasonaryLayout images={images}/>
      </div>
    </div>
  )
}

export default Home