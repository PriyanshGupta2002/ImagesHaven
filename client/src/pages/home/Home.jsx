import React, { useEffect, useState } from 'react'
import './home.scss'
import Masonry from 'react-masonry-css'
import { imagesArray } from '../../constants/images'
import ImageCard from '../../components/imageCard/ImageCard'
import { useLocation } from 'react-router-dom'
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
      <div className="container">
      <Masonry
  breakpointCols={3}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
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