import React, { useEffect, useState } from 'react'
import './home.scss'
import Masonry from 'react-masonry-css'
import { imagesArray } from '../../constants/images'
import ImageCard from '../../components/imageCard/ImageCard'
import { useLocation } from 'react-router-dom'
import CategorySelector from '../../components/categorySelector/CategorySelector'
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
  const myBreakpointsAndCols = {
    default: 4,
    3000:6,
    2000: 5,
    1200: 3,
    1000: 2,
    500:1
  };
  return (
    <div className='home'>
      <CategorySelector/>
      <div className="container">
      <Masonry
  breakpointCols={myBreakpointsAndCols}
  className="my-masonry-grid"
>
  {images?.map(item => (
   <ImageCard item={item} key={item.id}/>
  ))}
</Masonry>
      </div>
    </div>
  )
}

export default Home