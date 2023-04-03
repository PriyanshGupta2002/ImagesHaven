import React from 'react'
import './masonaryLayout.scss'
import Masonry from 'react-masonry-css';
import ImageCard from '../imageCard/ImageCard';
import { useLocation } from 'react-router-dom';
const MasonaryLayout = ({images}) => {
  
    const myBreakpointsAndCols = {
        default: 4,
        // 3000:6,
        // 2600: 5,
        1200: 3,
        1000: 2,
        500:1
      };
      const location = useLocation()
      const pathName= location.pathname
  return (
    <Masonry
  breakpointCols={myBreakpointsAndCols}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
  
>
  {images?.map(item => (
   <ImageCard item={item} key={item.id}/>
  ))}
</Masonry>
  )
}

export default MasonaryLayout