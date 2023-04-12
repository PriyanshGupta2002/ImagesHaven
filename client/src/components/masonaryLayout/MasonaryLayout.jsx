import React, { useEffect } from 'react'
import './masonaryLayout.scss'
import Masonry from 'react-masonry-css';
import ImageCard from '../imageCard/ImageCard';
import { useLocation } from 'react-router-dom';
const MasonaryLayout = ({images,isLoading,isError,refetch}) => {
  
    const myBreakpointsAndCols = {
        default: 4,
        // 3000:6,
        // 2600: 5,
        1200: 3,
        1000: 2,
        500:1
      };
      const location = useLocation()
      useEffect(() => {
          refetch()
      }, [images])
      
  return (
    <Masonry
  breakpointCols={myBreakpointsAndCols}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
  
>
  {isLoading?"Loading":isError?"Some Error Occured":images.length>0? images?.map(item => (
   <ImageCard item={item} key={item._id}/>
  )): <span className='no-cat-img'>No Images found for the selected category</span> }
</Masonry>
  )
}

export default MasonaryLayout